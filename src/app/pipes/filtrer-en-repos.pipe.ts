import {Pipe, PipeTransform} from '@angular/core';
import {Hero} from '../models/hero';

/**
 * Permet de filtrer une liste de héros en fonction de s'ils sont `enRepos`.
 * En fonction du paramètre `afficherEnRepos` (boolean) les héros en repos sont inclus ou exclus du résultat
 *
 * Exemples :
 * * **Héros en repos masqués :** `item of list | filtrerEnRepos: true`
 * * **Héros en repos affichés :** `item of list | filtrerEnRepos: false`
 */
@Pipe({
    name: 'filtrerEnRepos'
})
export class FiltrerEnReposPipe implements PipeTransform {

    transform(heros: Hero[], afficherEnRepos: boolean = true): Hero[] {
        if (!heros) {
            // Sécurité : si on a pas de héro en entrée, on retourne une liste vide (pour éviter les erreurs de type NullPointer)
            return [];
        }
        else if (afficherEnRepos) {
            // On retourne tous les héros
            return heros;
        }
        // On retourne uniquement les héros qui NE SONT PAS en repos
        return [...heros].filter((h) => !h.enRepos);
    }

}
