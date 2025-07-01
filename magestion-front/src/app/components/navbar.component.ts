import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <h2>📊 GestionApp</h2>
        </div>
        <div class="navbar-menu" [class.active]="isMenuOpen">
          <a routerLink="/" class="navbar-link" routerLinkActive="active" (click)="closeMenu()">
            🏠 Accueil
          </a>
          <a routerLink="/produits" class="navbar-link" routerLinkActive="active" (click)="closeMenu()">
            📦 Produits
          </a>
          <a routerLink="/clients" class="navbar-link" routerLinkActive="active" (click)="closeMenu()">
            👥 Clients
          </a>
          <a routerLink="/utilisateurs" class="navbar-link" routerLinkActive="active" (click)="closeMenu()">
            👤 Utilisateurs
          </a>
          <a routerLink="/login" class="navbar-link login-link" (click)="closeMenu()">
            🔐 Connexion
          </a>
        </div>
        <button class="navbar-toggle" (click)="toggleMenu()" aria-label="Ouvrir le menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    /* Ajoute ces variables dans styles.css global :
    :root {
      --primary-color: #4f8cff;
      --primary-light: #6dd5ed;
      --border-radius: 12px;
      --shadow-medium: 0 2px 8px rgba(79,140,255,0.10);
      --transition: all 0.2s cubic-bezier(.4,0,.2,1);
    }
    */
    .navbar {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
      box-shadow: var(--shadow-medium);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      height: 4rem;
    }
    .navbar-brand h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .navbar-menu {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    .navbar-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      transition: var(--transition);
      font-weight: 500;
    }
    .navbar-link:hover,
    .navbar-link.active {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
    .login-link {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .login-link:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .navbar-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    .navbar-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      margin: 2px 0;
      transition: var(--transition);
      border-radius: 2px;
    }
    @media (max-width: 768px) {
      .navbar-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--primary-color);
        flex-direction: column;
        gap: 0;
        padding: 1rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
      }
      .navbar-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      .navbar-link {
        width: 100%;
        padding: 1rem;
        text-align: center;
      }
      .navbar-toggle {
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}