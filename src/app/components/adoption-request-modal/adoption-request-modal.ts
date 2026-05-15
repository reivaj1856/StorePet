import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { SupabaseService } from '../../services/supabase';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-adoption-request-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './adoption-request-modal.html',
  styleUrl: './adoption-request-modal.css',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: "scale(0.7)" }),
        animate('250ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(':leave', [
        animate('120ms cubic-bezier(.4,0,.2,1)', style({ opacity: 0, transform: "scale(0.7)" }))
      ])
    ])
  ]
})
export class AdoptionRequestModal {

  @Input() pet: any;
  @Output() close = new EventEmitter();
  message = '';
  success = false;

  constructor(private supabase: SupabaseService) {}

  async solicitar() {
    const user = this.supabase.getCurrentUser();
    await this.supabase.requestAdoption(this.pet.id, user.id, this.message);
    this.success = true;
  }
}
