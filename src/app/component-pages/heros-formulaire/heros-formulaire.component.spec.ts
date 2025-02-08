import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HerosFormulaireComponent} from './heros-formulaire.component';
import {HerosService} from '../../services/heros.service';
import {Hero} from '../../models/hero';

describe('HerosFormulaireComponent', () => {
    let component: HerosFormulaireComponent;
    let fixture: ComponentFixture<HerosFormulaireComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HerosFormulaireComponent],
            providers: [
                {
                    provide: HerosService,
                    useValue: {
                        ajouter: jasmine.createSpy().and.callFake((nom, enRepos) => ({
                            id: Date.now(),
                            score: 0,
                            nom, enRepos
                        } as Hero))
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HerosFormulaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should NOT register hero on invalid form', () => {
        expect(component.form.invalid).toBeTrue();
        component.enregistrer();
        expect(TestBed.inject(HerosService).ajouter).not.toHaveBeenCalled();
    });

    it('should register hero on valid form', () => {
        component.form.setValue({
            nom: 'Test',
            repos: true
        });
        component.form.updateValueAndValidity();
        expect(component.form.invalid).toBeFalse();

        component.enregistrer();
        const {nom, repos} = component.form.value;
        expect(TestBed.inject(HerosService).ajouter).toHaveBeenCalledOnceWith(nom!, repos!);
    });
});
