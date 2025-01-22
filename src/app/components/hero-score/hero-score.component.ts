import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-score',
  imports: [],
  templateUrl: './hero-score.component.html',
  styleUrl: './hero-score.component.scss'
})
export class HeroScoreComponent {

  @Input({ required: true }) hero?: Hero;

  @Input() afficherVotes = true;

  @Input() pointsParVote = 1;

  clickVote(valeur: number, event: MouseEvent) {
    if (this.hero && this.afficherVotes) {
      // On envoi un événement à chaque vote avec la valeur passée en paramètre (mais on retourne la valeur positivement ou négativement)
      this.hero.score += valeur;
    }

    // On stoppe la propagation de l'événement afin d'éviter qu'un vote puisse déclencher une autre action
    //  => ex : la redirection vers la page d'infos d'un héro car le bloc où est ce composant est un lien "a"
    event.stopPropagation();
    return false;
  }
}
