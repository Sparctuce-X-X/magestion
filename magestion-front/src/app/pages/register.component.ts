import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-bg">
      <div class="register-container">
        <div class="register-card">
          <div class="register-icon">🔐</div>
          <h2 class="register-title">Créer un compte</h2>
          <p class="register-subtitle">Rejoignez la plateforme de gestion</p>
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="register-form">
            <div class="form-group">
              <label for="username">Nom d'utilisateur</label>
              <input type="text" id="username" name="username" [(ngModel)]="formData.username" required placeholder="Votre nom d'utilisateur" #username="ngModel">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" [(ngModel)]="formData.email" required placeholder="Votre email" #email="ngModel">
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input type="password" id="password" name="password" [(ngModel)]="formData.password" required placeholder="Mot de passe" #password="ngModel">
            </div>
            <button type="submit" class="register-btn" [disabled]="registerForm.invalid">S'inscrire</button>
          </form>
          <div class="register-footer">
            <span>Déjà un compte ? <a routerLink="/login">Se connecter</a></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.register-bg { min-height: 100vh; background: #f6f8fb; display: flex; align-items: center; justify-content: center; }
     .register-container { width: 100%; max-width: 420px; margin: 0 auto; }
     .register-card { background: #fff; border-radius: 18px; box-shadow: 0 2px 12px rgba(37,99,235,0.08); padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; }
     .register-icon { font-size: 2.5rem; margin-bottom: 1rem; }
     .register-title { font-size: 1.6rem; font-weight: 800; color: #1a237e; margin-bottom: 0.3rem; }
     .register-subtitle { color: #6b7280; font-size: 1.08rem; margin-bottom: 1.5rem; }
     .register-form { width: 100%; display: flex; flex-direction: column; gap: 1.1rem; }
     .form-group { display: flex; flex-direction: column; }
     .form-group label { font-weight: 700; margin-bottom: 0.3rem; color: #222; }
     .form-group input { padding: 0.8rem 1.1rem; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 1.05rem; background: #f9fafb; transition: border-color 0.2s; }
     .form-group input:focus { border-color: #2563eb; background: #fff; }
     .register-btn { background: #2563eb; color: #fff; font-weight: 700; border-radius: 8px; font-size: 1.08rem; padding: 0.7rem 1.5rem; border: none; margin-top: 1.2rem; transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s; }
     .register-btn:disabled { background: #bcd0f7; color: #fff; }
     .register-btn:hover:not(:disabled) { background: #1d4ed8; color: #fff; transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 24px rgba(37,99,235,0.18); }
     .register-footer { margin-top: 1.5rem; color: #6b7280; font-size: 0.98rem; }
     .register-footer a { color: #2563eb; text-decoration: underline; font-weight: 600; }
    `
  ]
})
export class RegisterComponent {
  formData = { username: '', email: '', password: '' };

  onSubmit() {
    // À brancher sur l'API d'inscription
    alert('Inscription envoyée !');
  }
} 