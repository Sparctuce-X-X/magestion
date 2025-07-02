import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

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
          <a routerLink="/accueil" class="navbar-link" routerLinkActive="active">🏠 Accueil</a>
          <a routerLink="/produits" class="navbar-link" routerLinkActive="active">📦 Produits</a>
          <a routerLink="/clients" class="navbar-link" routerLinkActive="active">👥 Clients</a>
          <a routerLink="/utilisateurs" class="navbar-link" routerLinkActive="active">👤 Utilisateurs</a>
        </div>
        <div class="navbar-actions">
          <ng-container *ngIf="isLoggedIn; else loginBtn">
            <span class="navbar-user">
              👋 Bonjour, <b>{{ authService.getUser()?.username }}</b>
            </span>
            <button class="navbar-btn" (click)="logout()">Déconnexion</button>
          </ng-container>
          <ng-template #loginBtn>
            <a routerLink="/login" class="navbar-btn">Connexion</a>
          </ng-template>
        </div>
        <button class="navbar-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #4f8cff 0%, #7fbcff 100%);
      box-shadow: 0 2px 12px rgba(79,140,255,0.10);
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
      position: relative;
    }
    .navbar-brand h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    .navbar-menu {
      display: flex;
      gap: 2rem;
      align-items: center;
      flex: 1;
      justify-content: center;
    }
    .navbar-link {
      color: rgba(255, 255, 255, 0.92);
      text-decoration: none;
      padding: 0.5rem 1.2rem;
      border-radius: 8px;
      transition: background 0.2s, color 0.2s;
      font-weight: 500;
      font-size: 1.08rem;
    }
    .navbar-link:hover,
    .navbar-link.active {
      background: rgba(255, 255, 255, 0.13);
      color: #fff;
    }
    .navbar-actions {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }
    .navbar-btn {
      background: #e3f0ff;
      color: #247cff;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1.3rem;
      font-weight: 600;
      font-size: 1.05rem;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(79,140,255,0.07);
      transition: background 0.2s, color 0.2s;
      margin-left: 0.5rem;
      cursor: pointer;
      outline: none;
      display: inline-block;
    }
    .navbar-btn:hover {
      background: #4f8cff;
      color: #fff;
    }
    .navbar-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      margin-left: 1rem;
    }
    .navbar-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      margin: 2px 0;
      transition: all 0.2s;
      border-radius: 2px;
    }
    @media (max-width: 900px) {
      .navbar-menu {
        gap: 1rem;
      }
    }
    @media (max-width: 768px) {
      .navbar-container {
        flex-wrap: wrap;
        height: auto;
      }
      .navbar-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #4f8cff;
        flex-direction: column;
        gap: 0;
        padding: 1rem 0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s;
        z-index: 10;
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
      .navbar-actions {
        margin-left: 0;
      }
      .navbar-toggle {
        display: flex;
      }
    }
    .navbar-user {
      color: #fff;
      margin-right: 0.7rem;
      font-weight: 500;
      font-size: 1.05rem;
      display: inline-block;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  private sub?: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.sub = this.authService.authChanged.subscribe(val => {
      this.isLoggedIn = val;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}