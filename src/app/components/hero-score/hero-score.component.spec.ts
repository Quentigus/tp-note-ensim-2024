import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroScoreComponent } from './hero-score.component';

describe('HeroScoreComponent', () => {
  let component: HeroScoreComponent;
  let fixture: ComponentFixture<HeroScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
