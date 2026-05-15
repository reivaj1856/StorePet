import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pet-card',
  imports: [],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.css',
})
export class PetCard {
   @Input() pet: any;
  @Output() select = new EventEmitter();
  onSelectPet() { this.select.emit(this.pet); }
}
