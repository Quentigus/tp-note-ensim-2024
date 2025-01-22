import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from '../models/hero';

/** Retourne le TOP 5 des héros */
@Pipe({
  name: 'top5Hero'
})
export class Top5HeroPipe implements PipeTransform {

  transform(heros: Hero[]): Hero[] {
    if (!heros) {
      // Sécurité : si on a pas de héro en entrée, on retourne une liste vide (pour éviter les erreurs de type NullPointer)
      return [];
    }

    // On retourne le TOP 5
    return [...heros]

      // Attention : cette méthode modifie la liste en entrée (c'est historique)
      //  => pour éviter cela, on lui passe toujours une copie (cf. début du return)
      .sort((a, b) => b.score - a.score)

      // On récupère uniquement les 5 premiers
      .filter((_, i) => i < 5);
  }

}
