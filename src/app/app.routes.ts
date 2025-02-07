import {Routes} from '@angular/router';
import {AccueilComponent} from './component-pages/accueil/accueil.component';
import {HerosDetailsComponent} from './component-pages/heros-details/heros-details.component';
import {HerosFormulaireComponent} from './component-pages/heros-formulaire/heros-formulaire.component';
import {HerosListeComponent} from './component-pages/heros-liste/heros-liste.component';
import {PageIntrouvableComponent} from './component-pages/page-introuvable/page-introuvable.component';

// Il faut essayer d'avoir des routes logiques, souvent, on utilise les mêmes règles que pour les urls des API "RESTful" (comme ici)

export const routes: Routes = [
  {
    // La route vide peut être un composant, pas forcément une redirection comme vu en cours
    path: '',
    component: AccueilComponent,
    // pathMatch: 'full'
  },
  {
    path: 'heros',
    component: HerosListeComponent
  },
  {
    path: 'heros/ajout',
    component: HerosFormulaireComponent
  },
  {
    // Il faut mettre cette route après la précénte éviter que cette route soit prise par Angular à tord
    //   et que le paramètre "id" soit égal à "ajout"
    path: 'heros/:id',
    component: HerosDetailsComponent
  },
  {
    path: '**',
    component: PageIntrouvableComponent
  }
];
