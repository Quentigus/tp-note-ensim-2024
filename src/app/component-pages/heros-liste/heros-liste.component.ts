import {AsyncPipe, NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HeroComponent} from "../../components/hero/hero.component";
import {Hero} from '../../models/hero';
import {FiltrerEnReposPipe} from "../../pipes/filtrer-en-repos.pipe";
import {HerosService} from '../../services/heros.service';

@Component({
    selector: 'app-heros-liste',
    imports: [
        AsyncPipe,
        HeroComponent,
        FormsModule,
        FiltrerEnReposPipe,
        NgClass
    ],
    templateUrl: './heros-liste.component.html',
    styleUrl: './heros-liste.component.scss'
})
export class HerosListeComponent {

    private herosService = inject(HerosService);

    // On récupère l'Observable du service dans une variable utilisable dans le template
    //  => pour faire un exemple du pipe "async", on souscrit pas
    heros$ = this.herosService.heros$;

    afficherEnRepos = true;

    supprimer(hero: Hero): void {
        this.herosService.supprimer(hero.id);
    }
}
