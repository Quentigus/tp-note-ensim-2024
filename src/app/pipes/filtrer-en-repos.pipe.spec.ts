import {Hero} from '../models/hero';
import {FiltrerEnReposPipe} from './filtrer-en-repos.pipe';

// On initialise une liste de test
const DEFAULT_LIST: Hero[] = [
    {id: 1, nom: `Héro 1`, enRepos: false, score: 7},
    {id: 2, nom: `Héro 2`, enRepos: true, score: 3},
    {id: 3, nom: `Héro 3`, enRepos: false, score: 10},
    {id: 4, nom: `Héro 4`, enRepos: false, score: 4},
    {id: 5, nom: `Héro 5`, enRepos: true, score: 8},
    {id: 6, nom: `Héro 6`, enRepos: true, score: 1},
    {id: 8, nom: `Héro 8`, enRepos: false, score: 9},
    {id: 9, nom: `Héro 9`, enRepos: true, score: 6},
    {id: 10, nom: `Héro 10`, enRepos: true, score: 5},
    {id: 11, nom: `Héro 11`, enRepos: false, score: 0},
];

describe('FiltrerEnReposPipe', () => {
    let pipe: FiltrerEnReposPipe;

    beforeEach(() => {
        pipe = new FiltrerEnReposPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return an EMPTY LIST as fallback', () => {
        expect(pipe.transform(null as any)).toEqual([]);
    });


    it('should return entry list when no filtering', () => {
        expect(pipe.transform(DEFAULT_LIST)).toEqual(DEFAULT_LIST);
    });

    it('should filter Hero list', () => {
        const result = pipe.transform(DEFAULT_LIST, false);

        // On vérifie que la taille de la nouvelle liste contient moins d'éléments que la liste de base
        expect(result.length).toBeLessThan(DEFAULT_LIST.length);

        // On récupère la liste des héros qui ne sont pas en repos dans la liste de base
        const workingHeroes = DEFAULT_LIST.filter((h) => !h.enRepos).length;

        // On vérifie que la liste retournée contient uniquement les héros qui ne sont pas en repos
        expect(result.length).toEqual(workingHeroes);
    });
});
