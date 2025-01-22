import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosListeComponent } from './heros-liste.component';

describe('HerosListeComponent', () => {
  let component: HerosListeComponent;
  let fixture: ComponentFixture<HerosListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerosListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerosListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
