// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iwyyhzusutddloojqjyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eXloenVzdXRkZGxvb2pxanljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODgzMjk5OSwiZXhwIjoyMDk0NDA4OTk5fQ.rgv5YXw9PzkIvl9bKSYE9EZD8sOz_zh1kY1LnBhNE8k';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getPets() {
    return this.supabase.from('pets').select('*').eq('published', true);
  }

  requestAdoption(pet_id: string, user_id: string, message: string) {
    return this.supabase.from('adoptions').insert([{ pet_id, user_id, message }]);
  }

  // Usuario simulado (o luego puedes vincular la sesión)
  getCurrentUser() {
    return { id: 'usuario-demo', name: 'Demo User' };
  }

  // src/app/services/supabase.service.ts
async createPet(pet: any) {
  const { data, error } = await this.supabase
    .from('pets')
    .insert([
      {
        name: pet.name,
        description: pet.description,
        age: parseInt(pet.age),
        type: pet.type,
        gender: pet.gender,
        photo_url: pet.photo_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', // Imagen por defecto
        published: true
      }
    ])
    .select();

  return { data, error };
}
async getAdoptions() {
  return await this.supabase
    .from('adoptions')
    .select(`
      *,
      pets ( name, photo_url ) 
    `); // Esto hace un "join" automático para traer los datos del perro
}
}