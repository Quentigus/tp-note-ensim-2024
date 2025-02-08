/** Réprésentation d'un héro */
export interface Hero {

    /** Identifiant unique du héro */
    id: number;

    /** Nom du héro */
    nom: string;

    /** Indique si le héro est en repos */
    enRepos: boolean;

    /** Score du héro */
    score: number;

}
