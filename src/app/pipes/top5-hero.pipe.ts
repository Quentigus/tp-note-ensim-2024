import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from '../models/hero';

/** Filtre une liste de héros pour ne retourner que les 5 qui ont le plus de points */
@Pipe({
  name: 'top5Hero'
})
export class Top5HeroPipe implements PipeTransform {

  transform(heros: Hero[]): Hero[] {
    if (!heros) {
      // Sécurité : si on a pas de héro en entrée, on retourne une liste vide pour éviter les erreurs de type NullPointer
      return [];
    }

    // On initialise un nouveau tableau contenant les éléments du tableau originale (changemet de reference)
    return [...heros]

      // On tri la liste (attention : cette méthode modifie le tableau d'entrée en plus de retourner le tableau trié)
      .sort((a, b) => b.score - a.score)

      // On récupère uniquement les 5 premiers de la liste triée
      .filter((_, i) => i < 5);
  }

}
