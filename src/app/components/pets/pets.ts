import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { PetCard } from '../pet-card/pet-card';
import { AdoptionRequestModal } from '../adoption-request-modal/adoption-request-modal';

@Component({
  selector: 'app-pets',
  standalone: true, // Asegúrate de que tenga standalone: true si usas Angular 18/19
  imports: [PetCard, AdoptionRequestModal],
  templateUrl: './pets.html',
  styleUrl: './pets.css',
})
export class Pets implements OnInit {
  pets: any[] = [];
  selectedPet: any = null;
  showModal = false;
  loading = true;

  constructor(private supabase: SupabaseService,private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.loadPets();
  }

  seleccionar(pet: any) {
    this.selectedPet = pet;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.selectedPet = null;
  }

  async loadPets() {
    this.loading = true;
    try {
      const { data, error } = await this.supabase.getPets();
      
      if (error) throw error;

      if (data) {
        this.pets = data;
        // Forzamos a Angular a que sepa que los datos ya llegaron
        this.cdr.detectChanges(); 
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}