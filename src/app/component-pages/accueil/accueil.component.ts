import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Top5HeroPipe } from '../../pipes/top5-hero.pipe';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-accueil',
  imports: [
    UpperCasePipe,
    DatePipe,
    AsyncPipe,
    Top5HeroPipe,
    RouterLink
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  private heroService = inject(HerosService);
  heros$ = this.heroService.heros$;

  date = new Date();
}
