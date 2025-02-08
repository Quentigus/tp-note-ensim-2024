import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HerosListeComponent} from './heros-liste.component';
import {HerosService} from '../../services/heros.service';
import {provideRouter} from '@angular/router';

describe('HerosListeComponent', () => {
    let component: HerosListeComponent;
    let fixture: ComponentFixture<HerosListeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HerosListeComponent],
            providers: [
                provideRouter([]),
                {
                    provide: HerosService,
                    useValue: {
                        supprimer: jasmine.createSpy()
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HerosListeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete hero', () => {
        component.supprimer({
            id: 13,
            nom: 'test',
            enRepos: true,
            score: 0
        });

        expect(TestBed.inject(HerosService).supprimer).toHaveBeenCalledOnceWith(13);
    });
});
