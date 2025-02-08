import {Hero} from '../models/hero';
import {Top5HeroPipe} from './top5-hero.pipe';

// On initialise une liste de test
const DEFAULT_LIST: Hero[] = [
    {id: 1, nom: `Héro 1`, enRepos: true, score: 7},
    {id: 2, nom: `Héro 2`, enRepos: true, score: 3},
    {id: 3, nom: `Héro 3`, enRepos: true, score: 10},
    {id: 4, nom: `Héro 4`, enRepos: true, score: 4},
    {id: 5, nom: `Héro 5`, enRepos: true, score: 8},
    {id: 6, nom: `Héro 6`, enRepos: true, score: 1},
    {id: 8, nom: `Héro 8`, enRepos: true, score: 9},
    {id: 9, nom: `Héro 9`, enRepos: true, score: 6},
    {id: 10, nom: `Héro 10`, enRepos: true, score: 5},
    {id: 11, nom: `Héro 11`, enRepos: true, score: 0},
];

describe('Top5HeroPipe', () => {
    let pipe: Top5HeroPipe;

    beforeEach(() => {
        pipe = new Top5HeroPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return an EMPTY LIST as fallback', () => {
        expect(pipe.transform(null as any)).toEqual([]);
    });

    it('should filter list of heroes', () => {
        const result = pipe.transform(DEFAULT_LIST);
        expect(DEFAULT_LIST.length).toEqual(10); // On vérifie que la liste originale n'a pas été modifiée (par le sort)
        expect(result.length).toEqual(5); // On vérifie qu'on a bien que 5 héros dans la nouvelle liste

        // In vérifie que la liste filtrée a bien trié les 5 héros du score le plus élevé au plus base
        expect(result).toEqual([
            jasmine.objectContaining({score: 10}),
            jasmine.objectContaining({score: 9}),
            jasmine.objectContaining({score: 8}),
            jasmine.objectContaining({score: 7}),
            jasmine.objectContaining({score: 6})
        ])
    });
});
