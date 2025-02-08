import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeroScoreComponent} from './hero-score.component';
import {HerosService} from '../../services/heros.service';

describe('HeroScoreComponent', () => {
    let component: HeroScoreComponent;
    let fixture: ComponentFixture<HeroScoreComponent>;
    let heroService: HerosService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeroScoreComponent],
            providers: [
                {
                    provide: HerosService,
                    useValue: {
                        changerScore: jasmine.createSpy()
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeroScoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // On récupère l'intance de HeroService initialisée par Angular (la fausse méthode ci-dessus)
        heroService = TestBed.inject(HerosService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should NOT allow voting without hero', () => {
        // On init un événement "click" nécessaire au la méthode
        const clickEvent = new MouseEvent('click');

        // Le composant n'a pas de héro de renseigné par défaut
        expect(component.hero).toBeUndefined();

        const tmp = component.clickVote(clickEvent);
        expect(tmp).toBeFalse(); // On vérifie que la méthode a renvoyé false (cf. code méthode)

        // On vérifie que sans héro, le composant n'a pas appelé le service
        expect(heroService.changerScore).not.toHaveBeenCalled();
    });

    it('should allow voting for hero', () => {
        // On renseigne les informations nécessaires au composant pour le vote
        component.hero = {
            id: 13,
            nom: 'test',
            enRepos: false,
            score: 10
        };
        component.pointsParVote = 5;

        // On init un événement "click" nécessaire au la méthode
        const clickEvent = new MouseEvent('click');

        // On test la méthode avec le paramètre obligatoire
        const tmp1 = component.clickVote(clickEvent);
        expect(tmp1).toBeFalse(); // On vérifie que la méthode a renvoyé false (cf. code méthode)

        // On vérifie que le composant a appelé le service avec l'id du héro et le montant de points à modifier
        expect(heroService.changerScore).toHaveBeenCalledWith(component.hero.id, component.pointsParVote);

        const tmp2 = component.clickVote(clickEvent, -10); // On test la méthode avec les 2 paramètres
        expect(tmp2).toBeFalse(); // On vérifie que la méthode a renvoyé false (cf. code méthode)

        // On vérifie que le composant a appalé le service avec l'id du héro et le montant de points à modifier
        expect(heroService.changerScore).toHaveBeenCalledWith(component.hero.id, -10);

        // On vérifie que la méthode a été appelée 1 fois par appel à clickVote
        expect(heroService.changerScore).toHaveBeenCalledTimes(2);
    });
});
