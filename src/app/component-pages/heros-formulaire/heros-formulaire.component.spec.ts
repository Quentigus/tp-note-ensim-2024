import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosFormulaireComponent } from './heros-formulaire.component';

describe('HerosFormulaireComponent', () => {
  let component: HerosFormulaireComponent;
  let fixture: ComponentFixture<HerosFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerosFormulaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerosFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
