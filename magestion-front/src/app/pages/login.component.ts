import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Connexion</h2>
    <form [formGroup]="form" (ngSubmit)="handleLogin()">
      <input type="text" formControlName="nom" placeholder="Nom d'utilisateur" />
      <input type="password" formControlName="password" placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
    </form>
  `,
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nom: '',
      password: '',
    });
  }

  handleLogin() {
    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigateByUrl('/produits'); // ou redirection selon ton app
      },
      error: () => alert('Identifiants incorrects'),
    });
  }
}
