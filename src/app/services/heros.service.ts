import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Hero} from '../models/hero';

// Ce fichier contient de la documentation, pour exemple (équivalente à la Javadoc) et va plus loin qu'un simple commentaire // ou /* */
//  - Elle peut être ajoutée sur les classes, les attributs et les méthode, avec la syntaxe (slash + 2 étoiles) : /** texte et/ou annotation @ */
//  - Elle est affichée lors de l'autocomplétion et au survol du nom avec une mise en forme pratique

/**
 * Ce service gère les manipulation des héros.
 */
@Injectable({
  providedIn: 'root'
})
export class HerosService {

  /** Identifiant du prochain héro à ajouter (pour éviter les doublons) */
  private nextHeroId = 1;

  /** Sujet stockant les héros pour pouvoir créer un Observable */
  private heros = new BehaviorSubject<Hero[]>([
    this.genererHero('Captain America', false), // jamais en repos
    this.genererHero('Iron Man', true), // toujours en repos
    this.genererHero('Hulk', undefined, 0), // toujours à 0 points (on garde le repos en automatique en mettant undefined ou null en 2ème paramètre)
    this.genererHero('Thor'),
    this.genererHero('Black Widow'),
    this.genererHero('Hawkeye'),
    this.genererHero('Black Panther'),
    this.genererHero('Spiderman'),
    this.genererHero('Ant-man'),
    this.genererHero('La Guêpe'),
    this.genererHero('Scarlet Witch'),
    this.genererHero('Vision'),
    // ...
  ]);

  /** Liste des héros mis à disposition des autres éléments par abonnement */
  heros$ = this.heros.asObservable();

  /**
   * Récupération, **à l'instant T**, d'un héro par son identifiant
   * @param id identifiant du héro à récupérer
   */
  recupererParId(id: number): Hero | undefined {
    return this.heros.value.find((h) => h.id === id);
  }

  /**
   * Enregistre un nouveau héro
   * @param nom nom du héro à ajouter
   * @param enRepos indique si le héro est en repos
   */
  ajouter(nom: string, enRepos: boolean): Hero {
    //  Il aurait été possible de recevoir directement un objet Hero, mais avec cette méthode :
    //   - on profite de la utilitaire utilisée pour créer les héros par défaut (sans l'exposer)
    //   - on s'assure que le héro est toujours créé avec un "score" à "0"
    const nouveauHero = this.genererHero(nom, enRepos, 0);

    // On pousse une nouvelle valeur dans BehaviorSubject, ce qui déclenche une nouvelle valeur dans l'Observable pour les abonnés
    this.heros.next([
      ...this.heros.value, // Reprise des héros déjà présents dans la liste (avec le spread operator)
      nouveauHero // Avec en plus le nouveau héro
    ]);

    // On retourne le héro créé au cas où l'appelant désire le manipuler (pour éviter d'avoir à le récupérer avant)
    return nouveauHero;
  }

  /**
   * Supprime un héro par son identifiant
   * @param id identifiant du héro à supprimer
   */
  supprimer(id: number) {
    // On pousse une nouvelle valeur contenant les héros existants SAUF celui ayant l'identifant reçu en paramètre
    this.heros.next([
      ...this.heros.value.filter((h) => h.id !== id)
    ]);
  }

  /**
   * Utilitaire pour générer des {@link Hero} facilement (valeurs par défaut, mais aussi ).
   *
   * * Si {@link score} n'est pas renseigné, il sera aléatoire entre 0 et 10 inclus
   * * Si {@link enRepos} n'est pas renseigné, il aura un taux de chance d'environ 5% d'être en repos
   *
   * @param nom nom du héro
   * @param score score par défaut du héro (facultatif)
   * @param enRepos indique si le héro est en repos (facultatif)
   */
  private genererHero(nom: string, enRepos?: boolean, score?: number): Hero {
    return {
      id: this.nextHeroId++, // Utilisation de l'attribut contenant le prochaine ID avec icrémentation juste après

      nom, // Equivalent à "nom: nom"

      // Pour les attributs ci-dessous, pour gérer la présence ou non des paramètres facultatifs, il est possible d'utiliser
      // l'opérateur "Nullish Coalecing Operator" (??) => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
      //  => Si la valeur avant est "null" ou "undefined", la valeur suivante sera utilisée
      score: score ?? Math.round(Math.random() * 10),
      enRepos: enRepos ?? Math.round(Math.random() * 100) < 10
    };
  }
}
