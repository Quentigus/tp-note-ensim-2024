import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Hero} from '../../models/hero';
import {HeroScoreComponent} from "../hero-score/hero-score.component";

@Component({
    selector: 'app-hero',
    imports: [
        RouterLink,
        HeroScoreComponent
    ],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {

    @Input({required: true}) hero?: Hero;

}
