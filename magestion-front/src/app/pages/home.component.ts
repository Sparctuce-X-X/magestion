import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="accueil-bg">
      <div class="halo-bg"></div>
      <div class="accueil-container">
        <div class="hero-section">
          <div class="hero-card animate-fade-in">
            <div class="hero-icon">📊</div>
            <h1 class="hero-title">Bienvenue dans GestionApp</h1>
            <p class="hero-subtitle">
              Gérez efficacement vos produits, clients et utilisateurs avec notre interface moderne et intuitive.
            </p>
            <div class="stats-grid" *ngIf="!isLoading">
              <div class="stat-card animate-pop" *ngFor="let stat of statList">
                <div class="stat-icon">{{stat.icon}}</div>
                <div class="stat-number">{{stat.value}}</div>
                <div class="stat-label">{{stat.label}}</div>
              </div>
            </div>
            <div *ngIf="isLoading" class="loading-stats">
              <div class="spinner-large"></div>
              <p>Chargement des statistiques...</p>
            </div>
            <div *ngIf="errorMessage" class="error-alert">
              ⚠️ {{errorMessage}}
            </div>
            <div class="action-buttons">
              <a routerLink="/produits" class="btn btn-primary">
                📦 Gérer les produits
              </a>
              <a routerLink="/clients" class="btn btn-secondary">
                👥 Gérer les clients
              </a>
            </div>
          </div>
        </div>
        <div class="features-section">
          <h2 class="section-title">Fonctionnalités principales</h2>
          <div class="features-grid">
            <div class="feature-card animate-fade-in" *ngFor="let feature of features">
              <div class="feature-icon">{{feature.icon}}</div>
              <h3>{{feature.title}}</h3>
              <p>{{feature.desc}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .accueil-bg {
      min-height: 100vh;
      background: linear-gradient(135deg, #f6f8fb 0%, #eaf1ff 100%);
      width: 100vw;
      position: relative;
      overflow-x: hidden;
    }
    .halo-bg {
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 400px;
      background: radial-gradient(ellipse at center, #4f8cff22 0%, #f6f8fb00 80%);
      z-index: 0;
      pointer-events: none;
      filter: blur(2px);
    }
    .accueil-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2.5rem 1rem 3rem 1rem;
      position: relative;
      z-index: 1;
    }
    .hero-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      margin-bottom: 3.5rem;
    }
    .hero-card {
      background: #fff;
      border-radius: 32px;
      box-shadow: 0 8px 40px rgba(79,140,255,0.13);
      padding: 3.2rem 2.7rem 2.7rem 2.7rem;
      max-width: 700px;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      position: relative;
      animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
    }
    .hero-icon {
      font-size: 3.5rem;
      margin-bottom: 1.2rem;
    }
    .hero-title {
      font-size: 2.7rem;
      font-weight: 900;
      margin-bottom: 1.1rem;
      background: linear-gradient(90deg, #4f8cff 0%, #7fbcff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
      letter-spacing: -1px;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: #6b7280;
      margin-bottom: 2.2rem;
      line-height: 1.6;
      font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    }
    .stats-grid {
      display: flex;
      justify-content: center;
      gap: 2.2rem;
      margin-bottom: 2.2rem;
      flex-wrap: wrap;
      animation: fadeIn 1.2s 0.2s backwards;
    }
    .stat-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 18px rgba(79,140,255,0.13);
      padding: 1.5rem 2.5rem;
      min-width: 140px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow 0.2s, transform 0.2s;
      cursor: pointer;
      will-change: transform;
    }
    .stat-card:hover {
      box-shadow: 0 12px 32px rgba(79,140,255,0.18);
      transform: translateY(-6px) scale(1.04);
    }
    .stat-icon {
      font-size: 2.2rem;
      margin-bottom: 0.4rem;
    }
    .stat-number {
      font-size: 2.2rem;
      font-weight: 800;
      color: #4f8cff;
      margin-bottom: 0.2rem;
    }
    .stat-label {
      font-size: 1.05rem;
      color: #6b7280;
      font-weight: 500;
    }
    .loading-stats {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }
    .spinner-large {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #4f8cff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: none; }
    }
    .animate-fade-in {
      animation: fadeIn 1s cubic-bezier(.4,0,.2,1);
    }
    .animate-pop {
      animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1);
    }
    .error-alert {
      background: #FEF2F2;
      border: 1px solid #FECACA;
      border-radius: 12px;
      padding: 1rem;
      color: #DC2626;
      font-size: 1.05rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1.13rem;
      padding: 0.9rem 1.7rem;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
      box-shadow: 0 2px 8px rgba(79,140,255,0.07);
      will-change: transform;
    }
    .btn-primary {
      background: #4f8cff;
      color: #fff;
      box-shadow: 0 4px 16px rgba(79,140,255,0.13);
    }
    .btn-primary:hover {
      background: #247cff;
      color: #fff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(79,140,255,0.18);
    }
    .btn-secondary {
      background: #e3f0ff;
      color: #247cff;
    }
    .btn-secondary:hover {
      background: #4f8cff;
      color: #fff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(79,140,255,0.18);
    }
    .features-section {
      max-width: 1200px;
      margin: 0 auto;
      margin-top: 2.5rem;
    }
    .section-title {
      text-align: center;
      font-size: 2.1rem;
      font-weight: 900;
      margin-bottom: 2.5rem;
      color: #222;
      letter-spacing: -1px;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
    }
    .feature-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(79,140,255,0.08);
      padding: 2.2rem 1.5rem 1.7rem 1.5rem;
      text-align: center;
      transition: box-shadow 0.2s, transform 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1);
    }
    .feature-card:hover {
      box-shadow: 0 12px 32px rgba(79,140,255,0.18);
      transform: translateY(-6px) scale(1.04);
    }
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.18rem;
      font-weight: 700;
      margin-bottom: 0.7rem;
      color: #222;
    }
    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
      font-size: 1rem;
    }
    @media (max-width: 900px) {
      .hero-card {
        padding: 2rem 1rem;
      }
      .features-section {
        margin-top: 1.5rem;
      }
    }
    @media (max-width: 600px) {
      .hero-title {
        font-size: 1.5rem;
      }
      .hero-card {
        padding: 1.2rem 0.5rem;
      }
      .features-grid {
        gap: 1rem;
      }
    }
  `]
})
export class HomeComponent {
  stats = {
    produits: 0,
    clients: 0,
    utilisateurs: 0
  };
  isLoading = true;
  errorMessage = '';
  statList = [
    { icon: '📦', value: 0, label: 'Produits' },
    { icon: '👥', value: 0, label: 'Clients' },
    { icon: '👤', value: 0, label: 'Utilisateurs' }
  ];
  features = [
    { icon: '📦', title: 'Gestion des produits', desc: 'Ajoutez, modifiez et suivez vos produits avec un système de stock intégré.' },
    { icon: '👥', title: 'Gestion des clients', desc: 'Maintenez une base de données complète de vos clients et contacts.' },
    { icon: '👤', title: 'Gestion des utilisateurs', desc: 'Contrôlez l\'accès et les permissions de votre équipe facilement.' },
    { icon: '📊', title: 'Rapports et analyses', desc: 'Visualisez vos données avec des graphiques et statistiques détaillées.' }
  ];

  constructor(
    private produitService: ProduitService,
    private clientService: ClientService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    Promise.all([
      this.produitService.getProduits().toPromise(),
      this.clientService.getClients().toPromise(),
      this.userService.getUsers().toPromise()
    ]).then(([produits, clients, users]) => {
      this.stats.produits = Array.isArray(produits) ? produits.length : 0;
      this.stats.clients = Array.isArray(clients) ? clients.length : 0;
      this.stats.utilisateurs = Array.isArray(users) ? users.length : 0;
      this.statList[0].value = this.stats.produits;
      this.statList[1].value = this.stats.clients;
      this.statList[2].value = this.stats.utilisateurs;
      this.isLoading = false;
    }).catch(err => {
      this.errorMessage = 'Erreur lors du chargement des statistiques.';
      this.isLoading = false;
    });
  }
}
