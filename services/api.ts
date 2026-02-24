import { Participant } from '../types';
import { supabase } from './supabase';

export const api = {
  getParticipants: async (): Promise<Participant[]> => {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase get error:', error);
      return [];
    }
    return data as Participant[];
  },

  addParticipant: async (participant: Omit<Participant, 'id'>): Promise<Participant> => {
    const { data, error } = await supabase
      .from('participants')
      .insert([participant])
      .select()
      .single();

    if (error) throw error;
    return data as Participant;
  },

  upsertParticipant: async (participant: Omit<Participant, 'id'>): Promise<Participant> => {
    const { data, error } = await supabase
      .from('participants')
      .upsert(participant, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return data as Participant;
  },

  bulkUpsertParticipants: async (participants: Omit<Participant, 'id'>[]): Promise<void> => {
    const { error } = await supabase
      .from('participants')
      .upsert(participants, { onConflict: 'email' });

    if (error) throw error;
  },

  updateParticipant: async (id: string, updates: Partial<Participant>): Promise<Participant> => {
    const { data, error } = await supabase
      .from('participants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Participant;
  },

  deleteParticipant: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getSettings: async (): Promise<Record<string, string>> => {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) return {};
    const settings: Record<string, string> = {};
    data.forEach(s => settings[s.id] = s.value);
    return settings;
  },

  uploadImage: async (file: File, path: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('picture')
      .upload(`${Date.now()}-${path}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('picture')
      .getPublicUrl(data.path);

    return publicUrl;
  }
};
