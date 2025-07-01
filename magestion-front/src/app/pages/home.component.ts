import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-bg">
      <div class="home-card">
        <div class="home-icon">📊</div>
        <h1>Bienvenue sur <span class="brand">MaGestion</span></h1>
        <p class="desc">Votre application moderne de gestion des produits et des clients.</p>
      </div>
    </div>
  `,
  styles: [`
    .home-bg {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(120deg, #e0eaff 0%, #f7fbff 100%);
    }
    .home-card {
      background: #fff;
      border-radius: 22px;
      box-shadow: 0 6px 32px rgba(79,140,255,0.10);
      padding: 48px 36px 36px 36px;
      text-align: center;
      max-width: 420px;
      margin: 32px 8px;
    }
    .home-icon {
      font-size: 3.2rem;
      margin-bottom: 18px;
      color: #4f8cff;
    }
    h1 {
      font-size: 2.1rem;
      color: #222;
      margin-bottom: 12px;
    }
    .brand {
      color: #4f8cff;
      font-weight: 700;
    }
    .desc {
      color: #555;
      font-size: 1.13rem;
      margin-bottom: 0;
    }
    @media (max-width: 600px) {
      .home-card {
        padding: 28px 8px 24px 8px;
      }
      h1 {
        font-size: 1.3rem;
      }
      .home-icon {
        font-size: 2.1rem;
      }
    }
  `]
})
export class HomeComponent {}
