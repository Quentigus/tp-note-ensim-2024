import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroScoreComponent } from "../../components/hero-score/hero-score.component";
import { Hero } from '../../models/hero';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-heros-details',
  imports: [
    ReactiveFormsModule,
    HeroScoreComponent
  ],
  templateUrl: './heros-details.component.html',
  styleUrl: './heros-details.component.scss'
})
export class HerosDetailsComponent {

  private heroService = inject(HerosService);
  private activatedRoute = inject(ActivatedRoute);

  hero?: Hero;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params) => {
        const id = parseInt(params['id']);
        this.hero = this.heroService.recupererParId(id);
      });
  }
}
