import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRequestModal } from './adoption-request-modal';

describe('AdoptionRequestModal', () => {
  let component: AdoptionRequestModal;
  let fixture: ComponentFixture<AdoptionRequestModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionRequestModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptionRequestModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
