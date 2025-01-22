import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-heros-formulaire',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './heros-formulaire.component.html',
  styleUrl: './heros-formulaire.component.scss'
})
export class HerosFormulaireComponent {

  private heroService = inject(HerosService);
    private router = inject(Router);

    form = new FormGroup({
      nom: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      repos: new FormControl<boolean>(false)
    });

    enregistrer() {
      if (this.form.valid) {
        const {nom, repos} = this.form.value;
        const hero = this.heroService.ajouter(nom!, repos === true);
        this.router.navigate(['/heros', hero.id]);
      }
    }
}
