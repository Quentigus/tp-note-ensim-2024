import {TestBed} from '@angular/core/testing';
import {HerosService} from './heros.service';

describe('HerosService', () => {
    let service: HerosService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HerosService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should init a list of generated heroes', () => {
        const spyHeros = jasmine.createSpy();
        service.heros$.subscribe(spyHeros);

        // On vérifie qu'on a reçu la liste des héros générés par défaut (et donc on test aussi la génération)
        expect(spyHeros).toHaveBeenCalledWith([
            // "jasmine.objectContaining({...})" permet de tester une portion d'un objet possédant au minimum ce qui est renseigné dans le paramètre
            jasmine.objectContaining({id: 1}),
            jasmine.objectContaining({id: 2}),
            jasmine.objectContaining({id: 3}),
            jasmine.objectContaining({id: 4}),
            jasmine.objectContaining({id: 5}),
            jasmine.objectContaining({id: 6}),
            jasmine.objectContaining({id: 7}),
            jasmine.objectContaining({id: 8}),
            jasmine.objectContaining({id: 9}),
            jasmine.objectContaining({id: 10}),
            jasmine.objectContaining({id: 11}),
            jasmine.objectContaining({id: 12})
        ]);
    });

    it('should retrieve an hero from his id', () => {
        const hero = service.recupererParId(5);

        // On vérifie que l'on récupère le bon héro (tester son nom est suffisant, cela évite d'avoir trop de subtilités en cas d'évolutions/changements)
        expect(hero).toEqual(jasmine.objectContaining({nom: 'Black Widow'}));
    });

    it('should create an hero', () => {
        const spyHeros = jasmine.createSpy();
        service.heros$.subscribe(spyHeros);

        const tmp = service.ajouter('test', true);

        expect(spyHeros).toHaveBeenCalledTimes(2); // Réception de base + post création

        // On doit recevoirune nouvelle liste contenant le nouveau héro (nouvelle valeur dans l'observable)
        expect(spyHeros).toHaveBeenCalledWith(
            // "jasmine.arrayContaining([...])" permet de tester partiellement un tableau (il doit contenir au minimum les objets, peut importe l'ordre)
            //   => Il est possible d'utiliser "objectContaining" pour ses éléments
            jasmine.arrayContaining([tmp])
        );
    });

    it('should delete an hero', () => {
        const spyHeros = jasmine.createSpy();
        service.heros$.subscribe(spyHeros);

        // On supprime le héro avec l'id "3"
        service.supprimer(3);

        // On vérifie qu'on a reçu la liste des héros par défaut
        expect(spyHeros).toHaveBeenCalledWith([
            jasmine.objectContaining({id: 1}),
            jasmine.objectContaining({id: 2}),
            // Pas d'objet avec "id: 3"
            jasmine.objectContaining({id: 4}),
            jasmine.objectContaining({id: 5}),
            jasmine.objectContaining({id: 6}),
            jasmine.objectContaining({id: 7}),
            jasmine.objectContaining({id: 8}),
            jasmine.objectContaining({id: 9}),
            jasmine.objectContaining({id: 10}),
            jasmine.objectContaining({id: 11}),
            jasmine.objectContaining({id: 12})
        ]);
    });

    it('should change hero score (multiple use cases)', () => {
        // On va récupérer les héros pour tester l'envoi de valeur dans l'Observable
        const spyHeros = jasmine.createSpy();
        service.heros$.subscribe(spyHeros);

        // On récupère un héro de test
        //  => avec le "!" en fin de ligne, on force la vérification que quelque chose est retourné (sinon, on aura une exception JS)
        const hero = service.recupererParId(5)!;

        // On stocke sans score de base (car les héros générés de base ont des score aléatoires)
        const defaultScore = hero!.score;

        // #1 - On vérifie que le héro peut gagner un montant fixe de points
        service.changerScore(hero!.id, 10); // On lance la méthode à tester
        expect(hero!.score).toEqual(defaultScore + 10); // On vérifie que le héro a gagné 10 points

        // #2 - On vérifie que le héro peut perdre un montant fixe de points
        service.changerScore(hero!.id, -10); // On lance la méthode à tester
        expect(hero!.score).toEqual(defaultScore); // On vérifie que le héro a gagné 10 points

        // #3 - On test que le score ne peut pas aller dans le négatif
        service.changerScore(hero.id, -(defaultScore + 100)); // On relance un autre test sur la méthode (on veut absolument tester de descendre dans le négatif)
        expect(hero.score).toEqual(0); // On vérifie que le score est pas descendu dans le négatif

        // Il est possible de tester de cette manière, c'est à dire un seul "it" qui tests plusieurs possibilités mais sur une même méthode)
        //   ou faire X "it", un par cas de test (c'est un choix personnel et/ou à respecter dans le cadre d'une bonne pratique imposée)
    });
});
