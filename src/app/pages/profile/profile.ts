import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.html'
})
export class Profile {
  showModalCrear = false;
  isSaving = false;

  // Objeto para el formulario
  nuevaMascota = {
    name: '',
    type: 'perro',
    gender: 'macho',
    age: 0,
    description: '',
    photo_url: ''
  };

  constructor(private supabase: SupabaseService)  {}
  tabActiva: 'solicitudes' | 'publicaciones' = 'publicaciones';
  misPublicaciones: any[] = [];
  misSolicitudes: any[] = []; // Nueva lista
  loading = false;

  abrirModalCrear() { this.showModalCrear = true; }
  
  ngOnInit() {
    this.cargarDatos();
  }
  
  async cargarDatos() {
    this.loading = true;
    // Cargamos ambas cosas
    const [petsRes, adoptionsRes] = await Promise.all([
      this.supabase.getPets(),
      this.supabase.getAdoptions() // Asegúrate de crear este método en el servicio
    ]);

    this.misPublicaciones = petsRes.data || [];
    this.misSolicitudes = adoptionsRes.data || [];
    this.loading = false;
  }

  cambiarTab(tab: 'solicitudes' | 'publicaciones') {
    this.tabActiva = tab;
  }

  cerrarModalCrear() {
    this.showModalCrear = false;
    this.resetForm();
  }

  resetForm() {
    this.nuevaMascota = { name: '', type: 'perro', gender: 'macho', age: 0, description: '', photo_url: '' };
  }

  async guardarMascota() {
  // 1. Validación básica
  if (!this.nuevaMascota.name || !this.nuevaMascota.description) {
    alert('Por favor, llena los campos básicos.');
    return;
  }

  this.isSaving = true;

  try {
    const { data, error } = await this.supabase.createPet(this.nuevaMascota);

    if (error) {
      console.error('Error al guardar:', error.message);
      alert('Hubo un error al guardar la mascota.');
    } else {
      console.log('✅ Mascota guardada:', data);
      
      // --- EL CAMBIO ESTÁ AQUÍ ---
      this.cerrarModalCrear(); // Esto cierra el modal y limpia el formulario
      // ----------------------------

      alert('¡Mascota publicada con éxito! 🐾');
      
      // Opcional: Si tienes una lista de "Mis Publicaciones", 
      // podrías llamar a un método para recargarla aquí.
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  } finally {
    this.isSaving = false;
  }
}
}