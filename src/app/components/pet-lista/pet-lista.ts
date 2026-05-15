import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { PetCard } from '../pet-card/pet-card';
@Component({
  selector: 'app-pet-lista',
  imports: [PetCard],
  templateUrl: './pet-lista.html',
  styleUrl: './pet-lista.css',
})
export class PetLista  {
  pets: any[] = [];
  constructor(private supabase: SupabaseService) {}
  ngOnInit() {
    this.supabase.getPets().then(({ data }) => this.pets = data ?? []);
  }
  verDetalle(pet: any) {
    // Navegar a detalle o abrir modal
  }
}
