import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Hero} from '../models/hero';

/** Ce service manipulation les héros */
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
     * Modifie le nombre de point de vie d'un héro (il est impossible de descendre dans le négatif)
     * @param id identifiant du héro à modifier
     * @param delta nombre de points de vie à changer (positif ou négatif)
     */
    changerScore(id: number, delta: number): void {
        const hero = this.recupererParId(id);
        if (hero) {
            // On modifie le héro si on le trouve
            hero.score = Math.max(hero.score + delta, 0);
            // Si on a changé le score d'un héro, on envoi une liste mise à jour
            // => on pourrait s'en passer car on modifie un héro existant, mais renvoyer une donnée dans l'observable
            //   va permettre de forcer les mises à jour des éléments qui on souscrit
            this.heros.next(this.heros.value);
        }
    }

    /**
     * Utilitaire pour générer des {@link Hero} facilement (avec valeurs par défaut en cas de paramètres non renseignés).
     *
     * * Si {@link score} n'est pas renseigné, il sera aléatoirement généré entre 0 et 10 inclus
     * * Si {@link enRepos} n'est pas renseigné, il y aura un taux de chance d'environ 20% d'être en repos
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
            enRepos: enRepos ?? Math.round(Math.random() * 100) < 20
        };
    }
}
