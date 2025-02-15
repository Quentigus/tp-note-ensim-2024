import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageIntrouvableComponent} from './page-introuvable.component';

describe('PageIntrouvableComponent', () => {
    let component: PageIntrouvableComponent;
    let fixture: ComponentFixture<PageIntrouvableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageIntrouvableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PageIntrouvableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
