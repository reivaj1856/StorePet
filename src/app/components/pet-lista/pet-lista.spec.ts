import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetLista } from './pet-lista';

describe('PetLista', () => {
  let component: PetLista;
  let fixture: ComponentFixture<PetLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetLista],
    }).compileComponents();

    fixture = TestBed.createComponent(PetLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
