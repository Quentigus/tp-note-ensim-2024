import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccueilComponent} from './accueil.component';
import {provideRouter} from '@angular/router';
import {HerosService} from '../../services/heros.service';
import {of} from 'rxjs';

describe('AccueilComponent', () => {
    let component: AccueilComponent;
    let fixture: ComponentFixture<AccueilComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccueilComponent],
            providers: [
                provideRouter([]),
                {
                    // Cette déclaration vient dire à Angular de remplacer le vrai code du "HeroService" par l'object position sur le "useValue"
                    // Sans cela, les tests de ce composant ne seront pas unitaires car ils exécuteront le code de ce composant, mais aussi celui du service injecté en "providedIn: 'root'"
                    provide: HerosService,
                    useValue: {
                        // ici, on déclare les propriétés et les méthodes du service que l'on utilise dans le composant (pas besoin de déclarer le reste)
                        heros$: of([])
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccueilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
