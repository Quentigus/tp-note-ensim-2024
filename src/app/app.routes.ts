import {Routes} from '@angular/router';
import {AccueilComponent} from './component-pages/accueil/accueil.component';
import {HeroRouteWrapperComponent} from './component-pages/hero-route-wrapper/hero-route-wrapper.component';
import {HerosDetailsComponent} from './component-pages/heros-details/heros-details.component';
import {HerosFormulaireComponent} from './component-pages/heros-formulaire/heros-formulaire.component';
import {HerosListeComponent} from './component-pages/heros-liste/heros-liste.component';
import {PageIntrouvableComponent} from './component-pages/page-introuvable/page-introuvable.component';

// Il faut essayer d'avoir des routes logiques, souvent, on utilise les mêmes règles que pour les urls des API "RESTful" (comme ici)

export const routes: Routes = [
  // La route vide peut être un composant, pas forcément une redirection
  {path: '', component: AccueilComponent, pathMatch: 'full'},

  // Il n'est pas nécessaire de passer par une sous-route comme ici
  //  => mais cela permet de donner un exemple de la "notion avancée" présente dans les slides de cours
  {
    path: 'heros',
    component: HeroRouteWrapperComponent,
    children: [
      {path: 'liste', component: HerosListeComponent},
      {path: 'ajout', component: HerosFormulaireComponent},

      // Mettre la route ":id" après les 2 autres permet de les garder fonctionnelles et non pas
      //  arriver sur cette route avec "liste" ou "ajout" en valeur du PathParam "id"
      {path: ':id', component: HerosDetailsComponent}
    ]
  },

  {path: '**', component: PageIntrouvableComponent}
];
