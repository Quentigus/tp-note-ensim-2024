import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero-route-wrapper',
  imports: [
    RouterOutlet
  ],
  templateUrl: './hero-route-wrapper.component.html',
  styleUrl: './hero-route-wrapper.component.scss'
})
export class HeroRouteWrapperComponent {
}
