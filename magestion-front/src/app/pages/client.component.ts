import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  standalone: true,
  selector: 'app-client',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="clients-bg">
      <div class="clients-container">
        <div class="page-header modern-header">
          <div class="header-content">
            <h1 class="page-title modern-title">👥 Gestion des Clients</h1>
            <p class="page-subtitle modern-subtitle">Gérez votre base de clients</p>
          </div>
          <button class="btn btn-primary add-btn modern-add-btn" (click)="showForm = true">
            <span class="add-icon">➕</span> Ajouter un client
          </button>
        </div>
        <div class="stats-section modern-stats">
          <div class="stats-grid modern-stats-grid">
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-value modern-stat-value">{{clients.length}}</div>
              <div class="stat-label">Total clients</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-value modern-stat-value">0</div>
              <div class="stat-label">Nouveaux ce mois</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">✉️</div>
              <div class="stat-value modern-stat-value">{{getValidEmails()}}</div>
              <div class="stat-label">Emails valides</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">📞</div>
              <div class="stat-value modern-stat-value">{{getValidPhones()}}</div>
              <div class="stat-label">Téléphones valides</div>
            </div>
          </div>
        </div>
        <div class="filters-section card modern-filters-section">
          <div class="filters-content modern-filters-content">
            <div class="search-box modern-search-box">
              <input type="text" class="form-input search-input modern-search-input" [(ngModel)]="searchTerm" placeholder="🔍 Rechercher un client (nom, email, téléphone)...">
            </div>
          </div>
        </div>
        <div class="clients-section modern-clients-section">
          <div *ngIf="getFilteredClients().length === 0" class="empty-state modern-empty-state">
            <div class="empty-icon">👥</div>
            <h3>Aucun client trouvé</h3>
            <p>{{clients.length === 0 ? 'Commencez par ajouter votre premier client.' : 'Essayez de modifier vos critères de recherche.'}}</p>
          </div>
          <div class="clients-grid modern-clients-grid" *ngIf="getFilteredClients().length > 0">
            <div class="client-card card modern-client-card" *ngFor="let c of getFilteredClients()">
              <div class="client-header modern-client-header">
                <div class="client-avatar">{{ getInitials(c.nom) }}</div>
                <div class="client-info">
                  <div class="client-name">{{c.nom}}</div>
                  <div class="client-email">{{c.email}}</div>
                  <div class="client-phone">{{c.telephone}}</div>
                </div>
              </div>
              <div class="client-actions modern-client-actions">
                <button class="btn btn-warning btn-sm modern-btn-warning" (click)="editClient(c)">✏️ Modifier</button>
                <button class="btn btn-info btn-sm modern-btn-info" (click)="contactClient(c.email)">📧 Contacter</button>
                <button class="btn btn-danger btn-sm modern-btn-danger" (click)="supprimerClient(c.id)">🗑️ Supprimer</button>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL AJOUT CLIENT -->
        <div class="modal-backdrop" *ngIf="showForm" (click)="showForm = false"></div>
        <div class="modal-form" *ngIf="showForm">
          <div class="form-card card modern-form-card">
            <button class="modal-close" (click)="showForm = false">×</button>
            <h2 class="form-title modern-form-title">Ajouter un client</h2>
            <form class="client-form modern-client-form" (ngSubmit)="onSubmit()" #clientForm="ngForm">
              <div class="form-row modern-form-row">
                <div class="form-group modern-form-group">
                  <label for="nom" class="form-label modern-form-label">Nom</label>
                  <input type="text" id="nom" name="nom" class="form-input modern-form-input" [(ngModel)]="nouveauClient.nom" required #nom="ngModel" [class.error]="nom.invalid && nom.touched">
                  <div *ngIf="nom.invalid && nom.touched" class="error-message modern-error-message">Le nom est requis</div>
                </div>
                <div class="form-group modern-form-group">
                  <label for="email" class="form-label modern-form-label">Email</label>
                  <input type="email" id="email" name="email" class="form-input modern-form-input" [(ngModel)]="nouveauClient.email" required #email="ngModel" [class.error]="email.invalid && email.touched">
                  <div *ngIf="email.invalid && email.touched" class="error-message modern-error-message">L'email est requis</div>
                </div>
                <div class="form-group modern-form-group">
                  <label for="telephone" class="form-label modern-form-label">Téléphone</label>
                  <input type="text" id="telephone" name="telephone" class="form-input modern-form-input" [(ngModel)]="nouveauClient.telephone" required #telephone="ngModel" [class.error]="telephone.invalid && telephone.touched">
                  <div *ngIf="telephone.invalid && telephone.touched" class="error-message modern-error-message">Le téléphone est requis</div>
                </div>
              </div>
              <div class="form-actions modern-form-actions">
                <button type="submit" class="btn btn-primary modern-btn-primary" [disabled]="clientForm.invalid">
                  ➕ Ajouter
                </button>
                <button type="button" class="btn btn-secondary modern-btn-secondary" (click)="showForm = false">Annuler</button>
              </div>
            </form>
          </div>
        </div>
        <!-- FIN MODAL -->
      </div>
    </div>
  `,
  styles: [
    `.clients-bg {
      min-height: 100vh;
      background: #f6f8fb;
      width: 100vw;
    }
    .clients-container {
      padding: 2.5rem 1rem 3rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .modern-header {
      background: none;
      box-shadow: none;
      border-bottom: none;
      margin-bottom: 2.5rem;
    }
    .modern-title {
      font-size: 2.3rem;
      font-weight: 900;
      color: #1a237e;
      margin-bottom: 0.3rem;
      letter-spacing: -1px;
    }
    .modern-subtitle {
      color: #6b7280;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .modern-add-btn {
      background: #2563eb;
      color: #fff;
      font-weight: 700;
      font-size: 1.08rem;
      border-radius: 8px;
      padding: 0.7rem 1.5rem;
      border: none;
      box-shadow: 0 2px 8px rgba(37,99,235,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .modern-add-btn:hover {
      background: #1d4ed8;
      color: #fff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(37,99,235,0.18);
    }
    .modern-stats {
      margin-bottom: 2.5rem;
    }
    .modern-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .modern-stat-card {
      background: #f8fafc;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      padding: 2rem 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow 0.2s, transform 0.2s;
      font-size: 1.12rem;
    }
    .modern-stat-card:hover {
      box-shadow: 0 8px 24px rgba(37,99,235,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .modern-stat-value {
      font-size: 2.1rem;
      font-weight: 900;
      color: #2563eb;
      margin-bottom: 0.25rem;
    }
    .modern-filters-section {
      margin-bottom: 2.2rem;
      background: #f8fafc;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      padding: 1.2rem 1rem;
    }
    .modern-filters-content {
      display: flex;
      gap: 1.2rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .modern-search-box {
      flex: 1;
    }
    .modern-search-input {
      width: 100%;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 1.08rem;
      background: #f1f5f9;
      transition: border-color 0.2s;
    }
    .modern-search-input:focus {
      border-color: #2563eb;
      background: #fff;
    }
    .modern-clients-section {
      margin-top: 2.5rem;
    }
    .modern-clients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .modern-client-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 160px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .modern-client-card:hover {
      box-shadow: 0 8px 24px rgba(37,99,235,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .modern-client-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.2rem;
      gap: 1.2rem;
    }
    .client-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #2563eb;
      color: #fff;
      font-weight: 800;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(37,99,235,0.10);
    }
    .client-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .client-name {
      font-size: 1.13rem;
      font-weight: 700;
      color: #222;
    }
    .client-email {
      color: #2563eb;
      font-size: 0.98rem;
      font-weight: 500;
    }
    .client-phone {
      color: #6b7280;
      font-size: 0.95rem;
    }
    .modern-client-actions {
      display: flex;
      gap: 0.7rem;
      margin-top: auto;
    }
    .modern-btn-warning {
      background: #ffe066;
      color: #b68900;
      border: none;
      font-weight: 700;
      border-radius: 7px;
      font-size: 0.95rem;
      box-shadow: 0 1px 4px rgba(255,224,102,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .modern-btn-warning:hover {
      background: #ffd43b;
      color: #7c5c00;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(255,224,102,0.18);
    }
    .modern-btn-info {
      background: #38bdf8;
      color: #fff;
      border: none;
      font-weight: 700;
      border-radius: 7px;
      font-size: 0.95rem;
      box-shadow: 0 1px 4px rgba(56,189,248,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .modern-btn-info:hover {
      background: #0ea5e9;
      color: #fff;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(56,189,248,0.18);
    }
    .modern-btn-danger {
      background: #ef4444;
      color: #fff;
      border: none;
      font-weight: 700;
      border-radius: 7px;
      font-size: 0.95rem;
      box-shadow: 0 1px 4px rgba(239,68,68,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .modern-btn-danger:hover {
      background: #dc2626;
      color: #fff;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(239,68,68,0.18);
    }
    .modern-empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .modern-empty-state h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #222;
    }
    .modern-form-section {
      margin-bottom: 2.2rem;
    }
    .modern-form-card {
      padding: 2.2rem 2rem;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      background: #fff;
    }
    .modern-form-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      color: #1a237e;
    }
    .modern-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.1rem;
    }
    .modern-form-group {
      display: flex;
      flex-direction: column;
    }
    .modern-form-label {
      font-weight: 700;
      margin-bottom: 0.4rem;
      color: #222;
    }
    .modern-form-input.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .modern-error-message {
      color: #ef4444;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
    .modern-form-actions {
      display: flex;
      gap: 1.2rem;
      margin-top: 1.5rem;
    }
    .modern-btn-primary {
      background: #2563eb;
      color: #fff;
      font-weight: 700;
      border-radius: 8px;
      font-size: 1.08rem;
      padding: 0.7rem 1.5rem;
      border: none;
      box-shadow: 0 2px 8px rgba(37,99,235,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .modern-btn-primary:hover {
      background: #1d4ed8;
      color: #fff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(37,99,235,0.18);
    }
    .modern-btn-secondary {
      background: #f1f5f9;
      color: #222;
      border: 1px solid #e5e7eb;
      font-weight: 700;
      border-radius: 8px;
      font-size: 1.08rem;
      padding: 0.7rem 1.5rem;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .modern-btn-secondary:hover {
      background: #e0e7ef;
      color: #1a237e;
      border-color: #2563eb;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 4px 12px rgba(37,99,235,0.10);
    }
    @media (max-width: 900px) {
      .modern-stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .modern-clients-grid {
        grid-template-columns: 1fr 1fr;
      }
      .modern-form-row {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 600px) {
      .modern-stats-grid {
        grid-template-columns: 1fr;
      }
      .modern-clients-grid {
        grid-template-columns: 1fr;
      }
      .modern-form-row {
        grid-template-columns: 1fr;
      }
      .modern-filters-content {
        flex-direction: column;
        gap: 0.7rem;
      }
    }
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(30, 41, 59, 0.35);
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .modal-form {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1010;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 340px;
      max-width: 98vw;
      min-height: 200px;
      animation: fadeIn 0.2s;
    }
    .modal-close {
      position: absolute;
      top: 18px;
      right: 22px;
      background: none;
      border: none;
      font-size: 2rem;
      color: #888;
      cursor: pointer;
      z-index: 1020;
      transition: color 0.18s;
    }
    .modal-close:hover {
      color: #ef4444;
    }
    @media (max-width: 600px) {
      .modal-form {
        min-width: 98vw;
        padding: 0;
      }
    }
  `],
})
export class ClientComponent {
  clients: Client[] = [];
  nouveauClient: Omit<Client, 'id'> = { nom: '', email: '', telephone: '' };
  showForm = false;
  searchTerm = '';

  constructor(private clientService: ClientService) {
    this.chargerClients();
  }

  chargerClients() {
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  ajouterClient() {
    this.clientService.ajouterClient(this.nouveauClient).subscribe(() => {
      this.chargerClients();
      this.nouveauClient = { nom: '', email: '', telephone: '' };
    });
  }

  supprimerClient(id: number) {
    this.clientService.supprimerClient(id).subscribe(() => {
      this.chargerClients();
    });
  }

  getFilteredClients() {
    if (!this.searchTerm) {
      return this.clients;
    }
    return this.clients.filter(c =>
      c.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.telephone.includes(this.searchTerm)
    );
  }

  getInitials(nom: string) {
    return nom.split(' ').map(word => word[0]).join('');
  }

  getValidEmails() {
    return this.clients.filter(c => c.email.includes('@')).length;
  }

  getValidPhones() {
    return this.clients.filter(c => c.telephone.length >= 10).length;
  }

  onSubmit() {
    this.ajouterClient();
    this.showForm = false;
  }

  editClient(client: Client) {
    // Implementation of editClient method
  }

  contactClient(email: string) {
    // Implementation of contactClient method
  }
}
