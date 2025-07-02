import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="login-bg">
      <div class="login-card">
        <div class="login-header">
          <div class="login-icon">🔐</div>
          <h1 class="login-title">Connexion</h1>
          <p class="login-subtitle">Accédez à votre espace de gestion</p>
        </div>
        <form class="login-form" [formGroup]="form" (ngSubmit)="handleLogin()">
          <div class="form-group">
            <label for="nom" class="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="nom"
              name="nom"
              class="form-input"
              formControlName="nom"
              placeholder="Votre nom d'utilisateur"
              required
              [class.error]="form.get('nom')?.invalid && form.get('nom')?.touched"
            >
            <div *ngIf="form.get('nom')?.invalid && form.get('nom')?.touched" class="error-message">
              Nom d'utilisateur requis
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="password-input-container">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                class="form-input"
                formControlName="password"
                placeholder="••••••••"
                required
                [class.error]="form.get('password')?.invalid && form.get('password')?.touched"
              >
              <button
                type="button"
                class="password-toggle"
                (click)="togglePassword()"
                tabindex="-1"
              >
                {{showPassword ? '🙈' : '👁️'}}
              </button>
            </div>
            <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="error-message">
              Mot de passe requis
            </div>
          </div>
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="rememberMe">
              <span class="checkmark"></span>
              Se souvenir de moi
            </label>
            <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          </div>
          <button
            type="submit"
            class="btn btn-primary login-btn"
            [disabled]="form.invalid || isLoading"
          >
            <span *ngIf="isLoading" class="spinner"></span>
            {{isLoading ? 'Connexion...' : 'Se connecter'}}
          </button>
          <div *ngIf="errorMessage" class="error-alert">
            ⚠️ {{errorMessage}}
          </div>
        </form>
        <div class="login-footer">
          <span>Pas encore de compte ? <a routerLink="/register">S'inscrire</a></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-bg {
      min-height: 100vh;
      background: #f6f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(79,140,255,0.08);
      padding: 40px 32px 32px 32px;
      max-width: 400px;
      width: 100%;
      margin: 40px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .login-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #222;
    }
    .login-subtitle {
      color: #6b7280;
      font-size: 0.95rem;
    }
    .login-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .form-label {
      font-weight: 500;
      color: #222;
      margin-bottom: 0.2rem;
    }
    .form-input {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.7rem 1rem;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
      background: #f9fafb;
    }
    .form-input:focus {
      border-color: #4f8cff;
      background: #fff;
    }
    .form-input.error {
      border-color: #EF4444;
      background: #fff0f0;
    }
    .error-message {
      color: #EF4444;
      font-size: 0.85rem;
      margin-top: 0.1rem;
    }
    .password-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    .password-toggle {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      padding: 0.25rem;
      color: #6b7280;
    }
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #6b7280;
      font-size: 0.95rem;
    }
    .checkbox-container input {
      margin-right: 0.5rem;
    }
    .forgot-password {
      color: #4f8cff;
      text-decoration: none;
      font-size: 0.95rem;
    }
    .forgot-password:hover {
      text-decoration: underline;
    }
    .login-btn {
      width: 100%;
      background: #4f8cff;
      color: #fff;
      font-weight: 600;
      font-size: 1.08rem;
      border: none;
      border-radius: 8px;
      padding: 0.9rem 0;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-btn:disabled {
      background: #bcd7ff;
      cursor: not-allowed;
    }
    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid transparent;
      border-top: 2px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .error-alert {
      background: #FEF2F2;
      border: 1px solid #FECACA;
      border-radius: 8px;
      padding: 0.75rem;
      color: #DC2626;
      font-size: 0.95rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    .login-footer {
      text-align: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }
    .login-footer p {
      color: #6b7280;
      font-size: 0.95rem;
    }
    .login-footer a {
      color: #4f8cff;
      text-decoration: none;
      font-weight: 500;
    }
    .login-footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 480px) {
      .login-card {
        padding: 2rem 1.5rem;
      }
      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigateByUrl('/produits');
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
