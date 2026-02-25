import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Participant } from '../types';
import { getIdentityPlaceholder } from '../constants';
import { City } from 'country-state-city';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Fix for default Leaflet icon paths in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a custom dynamic marker with the participant's photo
const createParticipantIcon = (participant: Participant, count: number) => {
    const defaultImg = getIdentityPlaceholder(participant.name);
    const imgSrc = participant.photoUrl || defaultImg;

    let html = `
        <div style="
            position: relative;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #BB9446;
            box-shadow: 0 0 12px 2px rgba(187, 148, 70, 0.6);
            background-color: #111;
            overflow: visible;
        ">
            <img src="${imgSrc}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; opacity: 0.9;" onerror="this.src='${defaultImg}'" />
    `;

    if (count > 1) {
        html += `
            <div style="
                position: absolute;
                bottom: -6px;
                right: -6px;
                background: #BB9446;
                color: white;
                font-size: 10px;
                font-weight: bold;
                border-radius: 10px;
                padding: 1px 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.5);
                font-family: Arial, sans-serif;
                z-index: 10;
            ">
                +${count - 1}
            </div>
        `;
    }

    html += `</div>`;

    return new L.DivIcon({
        className: 'custom-participant-icon',
        html: html,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
};

interface MapViewProps {
    participants: Participant[];
    onSelectCity: (city: string) => void;
}

// Forces Leaflet to recalculate the map container size.
// Necessary because the map is conditionally rendered/hidden in the DOM.
const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
        const timeout = setTimeout(() => {
            map.invalidateSize();
        }, 200);
        return () => clearTimeout(timeout);
    }, [map]);
    return null;
};

const MapView: React.FC<MapViewProps> = ({ participants, onSelectCity }) => {
    const { t } = useTranslation();

    // Group participants by city coordinates
    const markers = useMemo(() => {
        const cityGroups: Record<string, { coords: [number, number], participants: Participant[] }> = {};

        participants.forEach(p => {
            if (!p.city || !p.country?.code) return;

            let coords: [number, number] | null = null;

            // Look up dynamic coordinates based on participant's country code and city
            const citiesInCountry = City.getCitiesOfCountry(p.country.code) || [];
            const cityData = citiesInCountry.find(c => c.name.toLowerCase() === p.city!.toLowerCase());

            if (cityData && cityData.latitude && cityData.longitude) {
                coords = [parseFloat(cityData.latitude), parseFloat(cityData.longitude)];
            }

            if (coords) {
                // Group by exact city name (case-insensitive key)
                const cityKey = p.city.toLowerCase().trim();
                if (!cityGroups[cityKey]) {
                    cityGroups[cityKey] = { coords, participants: [] };
                }
                cityGroups[cityKey].participants.push(p);
            }
        });

        return Object.entries(cityGroups).map(([city, data]) => ({
            city: data.participants[0].city || city, // Original casing
            coords: data.coords,
            participants: data.participants
        }));
    }, [participants]);

    // Center on Germany
    const center: [number, number] = [51.1657, 10.4515];

    return (
        <div className="w-full h-[60vh] md:h-[75vh] min-h-[500px] rounded-[2rem] overflow-hidden relative z-0 border border-white/5 shadow-2xl group">

            {/* Minimalist Map Overlay Gradient (Vignette) */}
            <div className="absolute inset-0 z-[400] pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

            <MapContainer
                center={center}
                zoom={5}
                scrollWheelZoom={true}
                zoomControl={false}
                attributionControl={false}
                style={{ height: '100%', width: '100%', backgroundColor: '#050505' }}
            >
                <MapUpdater />

                {/* CartoDB Dark Matter Base Map */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {markers.map((marker, idx) => (
                    <Marker
                        key={idx}
                        position={marker.coords}
                        icon={createParticipantIcon(marker.participants[0], marker.participants.length)}
                        eventHandlers={{
                            click: () => onSelectCity(marker.city) // Optional: Keep this to auto-filter, or let user click button in popup
                        }}
                    >
                        <Popup className="custom-popup" autoPanPadding={[50, 50]}>
                            <div className="bg-black/90 backdrop-blur-2xl p-5 min-w-[240px] rounded-[1.5rem] flex flex-col gap-4 border border-white/5 shadow-2xl">

                                {/* Header */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="text-white font-avenir-bold text-[10px] tracking-[0.2em] uppercase">{marker.city}</span>
                                    <span className="text-brand-heaven-gold font-avenir-medium text-[9px] uppercase tracking-widest bg-brand-heaven-gold/10 px-2.5 py-1 rounded-full">
                                        {marker.participants.length} {marker.participants.length === 1 ? t('app.leader') : t('app.leaders')}
                                    </span>
                                </div>

                                {/* List */}
                                <div className="space-y-4 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                                    {marker.participants.map(p => (
                                        <div key={p.id} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/5 shrink-0 bg-[#111]">
                                                <img
                                                    src={p.photoUrl || getIdentityPlaceholder(p.name)}
                                                    alt={p.name}
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-white text-[11px] font-avenir-medium truncate w-[130px]">{p.name}</p>
                                                <p className="text-white/40 text-[9px] uppercase tracking-widest truncate w-[130px] mt-0.5">{p.organization}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Action */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onSelectCity(marker.city); }}
                                    className="group/btn w-full flex items-center justify-between mt-2 pt-4 border-t border-white/5 text-[9px] text-white/40 hover:text-brand-heaven-gold uppercase tracking-[0.25em] transition-colors font-avenir-bold"
                                >
                                    <span>{t('map.exploreCity')}</span>
                                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-50 group-hover/btn:opacity-100" />
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
