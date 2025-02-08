import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {provideRouter} from '@angular/router';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationComponent],
            providers: [
                provideRouter([]) // Nécessaire pour les RouterLink & RouterLinkActive
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
