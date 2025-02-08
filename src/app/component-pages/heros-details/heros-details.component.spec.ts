import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HerosDetailsComponent} from './heros-details.component';
import {ActivatedRoute, provideRouter} from '@angular/router';
import {HerosService} from '../../services/heros.service';
import {of} from 'rxjs';
import {Hero} from '../../models/hero';

describe('HerosDetailsComponent', () => {
    let component: HerosDetailsComponent;
    let fixture: ComponentFixture<HerosDetailsComponent>;

    const FAKE_ID = 55;
    const FAKE_HERO: Hero = {
        id: -1,
        nom: 'test',
        enRepos: false,
        score: 5
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HerosDetailsComponent],
            providers: [
                provideRouter([]),
                {
                    provide: HerosService,
                    useValue: {
                        // On créé un "espion" qui contiendra une logique qui va renvoyer un Hero qui reprend les informations du FAKE_HERO, mais avec comme id celui reçu dans la fonction
                        recupererParId: jasmine.createSpy()
                            .and.callFake((id: number): Hero => ({...FAKE_HERO, id}))
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({
                            id: FAKE_ID
                        })
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HerosDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve hero from route id', () => {
        // Dans ce test, on cherche à tester la récupération des informations du Héro
        // en fonction de l'identifiant dans la route au chargement du composant

        // => On test pas le code du service, ni la réupération de l'id depuis la route
        // => On cherche a tester la mécanique autour

        // On commence par vérifier que l'espion positionné sur la fausse méthode "recupererParId" a été appelé 1 seule fois avec l'id en dur de la fausse route
        expect(TestBed.inject(HerosService).recupererParId).toHaveBeenCalledOnceWith(55);

        // On vérifie ensuite que le bon héro a été stocké par le composant
        // Avec la fausse méthode "recupererParId", on connait le résultat à l'avance
        expect(component.hero).toEqual({
            ...FAKE_HERO,
            id: FAKE_ID
        });
    });
});
