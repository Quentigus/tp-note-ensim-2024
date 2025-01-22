import {JsonPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../../models/hero';
import {HerosService} from '../../services/heros.service';
import { HeroScoreComponent } from "../../components/hero-score/hero-score.component";

@Component({
  selector: 'app-heros-details',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
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
