import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRouteWrapperComponent } from './hero-route-wrapper.component';

describe('HeroRouteWrapperComponent', () => {
  let component: HeroRouteWrapperComponent;
  let fixture: ComponentFixture<HeroRouteWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroRouteWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroRouteWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
