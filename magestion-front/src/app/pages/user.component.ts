import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-bg">
      <div class="users-container">
        <div class="page-header modern-header">
          <div class="header-content">
            <h1 class="page-title modern-title">👤 Gestion des Utilisateurs</h1>
            <p class="page-subtitle modern-subtitle">Gérez les accès et permissions</p>
          </div>
          <button class="btn btn-primary add-btn modern-add-btn" (click)="showForm = true">
            <span class="add-icon">➕</span> Ajouter un utilisateur
          </button>
        </div>
        <div class="stats-section modern-stats">
          <div class="stats-grid modern-stats-grid">
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">👤</div>
              <div class="stat-value modern-stat-value">{{users.length}}</div>
              <div class="stat-label">Total utilisateurs</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-value modern-stat-value">{{getActifs()}}</div>
              <div class="stat-label">Utilisateurs actifs</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">🧑‍💼</div>
              <div class="stat-value modern-stat-value">{{getAdmins()}}</div>
              <div class="stat-label">Administrateurs</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">⏰</div>
              <div class="stat-value modern-stat-value">{{getRecentConnexions()}}</div>
              <div class="stat-label">Connexions récentes</div>
            </div>
          </div>
        </div>
        <div class="filters-section card modern-filters-section">
          <div class="filters-content modern-filters-content">
            <div class="search-box modern-search-box">
              <input type="text" class="form-input search-input modern-search-input" [(ngModel)]="searchTerm" placeholder="Rechercher un utilisateur...">
            </div>
            <div class="filter-select modern-filter-select">
              <select class="form-input" [(ngModel)]="filterRole">
                <option value="">Tous les rôles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <div class="filter-select modern-filter-select">
              <select class="form-input" [(ngModel)]="filterStatut">
                <option value="">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
        </div>
        <div class="users-section modern-users-section">
          <div *ngIf="getFilteredUsers().length === 0" class="empty-state modern-empty-state">
            <div class="empty-icon">👤</div>
            <h3>Aucun utilisateur trouvé</h3>
            <p>{{users.length === 0 ? 'Commencez par ajouter votre premier utilisateur.' : 'Essayez de modifier vos critères de recherche.'}}</p>
          </div>
          <div class="users-grid modern-users-grid" *ngIf="getFilteredUsers().length > 0">
            <div class="user-card card modern-user-card" *ngFor="let u of getFilteredUsers()">
              <div class="user-header modern-user-header">
                <div class="user-avatar">{{ getInitials(u.nom) }}</div>
                <div class="user-info">
                  <div class="user-name">{{u.nom}}</div>
                  <div class="user-email">{{u.email}}</div>
                  <div class="user-role">
                    <span class="badge badge-role" [ngClass]="getRoleClass(u.role)">{{u.role}}</span>
                  </div>
                  <div class="user-statut">
                    <span class="badge badge-statut" [ngClass]="getStatutClass(u.statut)">{{u.statut}}</span>
                  </div>
                </div>
              </div>
              <div class="user-meta">
                <div>Créé le : <span>{{u.dateCreation}}</span></div>
                <div>Dernière connexion : <span>{{u.derniereConnexion}}</span></div>
              </div>
              <div class="user-actions modern-user-actions">
                <button class="btn btn-warning btn-sm modern-btn-warning">✏️ Modifier</button>
                <button class="btn btn-info btn-sm modern-btn-info">🚫 Désactiver</button>
                <button class="btn btn-danger btn-sm modern-btn-danger">🗑️ Supprimer</button>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL AJOUT UTILISATEUR -->
        <div class="modal-backdrop" *ngIf="showForm" (click)="showForm = false"></div>
        <div class="modal-form" *ngIf="showForm">
          <div class="form-card card modern-form-card">
            <button class="modal-close" (click)="showForm = false">×</button>
            <h2 class="form-title modern-form-title">Ajouter un utilisateur</h2>
            <form class="user-form modern-user-form" (ngSubmit)="onSubmit()" #userForm="ngForm">
              <div class="form-row modern-form-row">
                <div class="form-group modern-form-group">
                  <label for="nom" class="form-label modern-form-label">Nom</label>
                  <input type="text" id="nom" name="nom" class="form-input modern-form-input" [(ngModel)]="nouvelUtilisateur.nom" required #nom="ngModel">
                </div>
                <div class="form-group modern-form-group">
                  <label for="email" class="form-label modern-form-label">Email</label>
                  <input type="email" id="email" name="email" class="form-input modern-form-input" [(ngModel)]="nouvelUtilisateur.email" required #email="ngModel">
                </div>
                <div class="form-group modern-form-group">
                  <label for="role" class="form-label modern-form-label">Rôle</label>
                  <select id="role" name="role" class="form-input modern-form-input" [(ngModel)]="nouvelUtilisateur.role" required #role="ngModel">
                    <option value="">Sélectionner</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div class="form-group modern-form-group">
                  <label for="statut" class="form-label modern-form-label">Statut</label>
                  <select id="statut" name="statut" class="form-input modern-form-input" [(ngModel)]="nouvelUtilisateur.statut" required #statut="ngModel">
                    <option value="">Sélectionner</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>
              <div class="form-actions modern-form-actions">
                <button type="submit" class="btn btn-primary modern-btn-primary" [disabled]="userForm.invalid">
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
    `.users-bg {
      min-height: 100vh;
      background: #f6f8fb;
      width: 100vw;
    }
    .users-container {
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
    .modern-users-section {
      margin-top: 2.5rem;
    }
    .modern-users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .modern-user-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .modern-user-card:hover {
      box-shadow: 0 8px 24px rgba(37,99,235,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .modern-user-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.2rem;
      gap: 1.2rem;
    }
    .user-avatar {
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
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .user-name {
      font-size: 1.13rem;
      font-weight: 700;
      color: #222;
    }
    .user-email {
      color: #2563eb;
      font-size: 0.98rem;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.7rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      font-weight: 700;
      margin-right: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .badge-role {
      background: #e0e7ef;
      color: #2563eb;
    }
    .badge-role.admin {
      background: #fca5a5;
      color: #b91c1c;
    }
    .badge-role.manager {
      background: #a5f3fc;
      color: #0e7490;
    }
    .badge-role.user {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-statut {
      background: #e0e7ef;
      color: #2563eb;
    }
    .badge-statut.actif {
      background: #bbf7d0;
      color: #166534;
    }
    .badge-statut.inactif {
      background: #fecaca;
      color: #b91c1c;
    }
    .user-meta {
      color: #6b7280;
      font-size: 0.95rem;
      margin-bottom: 0.7rem;
    }
    .modern-user-actions {
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
    @media (max-width: 900px) {
      .modern-stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .modern-users-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .modern-stats-grid {
        grid-template-columns: 1fr;
      }
      .modern-users-grid {
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
    .form-card.modern-form-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(37,99,235,0.13);
      padding: 2.5rem 2.2rem 2rem 2.2rem;
      min-width: 350px;
      max-width: 98vw;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form-title.modern-form-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      color: #1a237e;
      text-align: center;
      width: 100%;
    }
    .modern-user-form .form-row.modern-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.1rem;
      width: 100%;
    }
    .modern-user-form .form-group.modern-form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .modern-user-form .form-label.modern-form-label {
      font-weight: 700;
      margin-bottom: 0.4rem;
      color: #222;
      font-size: 1rem;
    }
    .modern-user-form .form-input.modern-form-input {
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 1.05rem;
      padding: 0.7rem 1.1rem;
      background: #f9fafb;
      transition: border-color 0.2s;
    }
    .modern-user-form .form-input.modern-form-input:focus {
      border-color: #2563eb;
      background: #fff;
    }
    .modern-user-form .form-input.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .modern-user-form .error-message.modern-error-message {
      color: #ef4444;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
    .modern-form-actions {
      display: flex;
      gap: 1.2rem;
      margin-top: 1.5rem;
      width: 100%;
      justify-content: center;
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
    @media (max-width: 900px) {
      .modern-user-form .form-row.modern-form-row {
        grid-template-columns: 1fr;
      }
      .form-card.modern-form-card {
        min-width: 98vw;
        padding: 1.2rem 0.5rem;
      }
    }
    @media (max-width: 600px) {
      .modal-form {
        min-width: 98vw;
        padding: 0;
      }
      .form-card.modern-form-card {
        min-width: 98vw;
        padding: 1.2rem 0.5rem;
      }
    }
  `],
})
export class UserComponent {
  users: User[] = [
    // Données mockées pour l'affichage
    {
      id: 1,
      nom: 'Alice Dubois',
      email: 'alice.dubois@entreprise.com',
      role: 'Admin',
      statut: 'actif',
      dateCreation: '05/01/2024',
      derniereConnexion: '25/02/2024 10:30'
    },
    {
      id: 2,
      nom: 'Bob Martin',
      email: 'bob.martin@entreprise.com',
      role: 'Manager',
      statut: 'actif',
      dateCreation: '12/01/2024',
      derniereConnexion: '24/02/2024 12:00'
    },
    {
      id: 3,
      nom: 'Claire Rousseau',
      email: 'claire.rousseau@entreprise.com',
      role: 'User',
      statut: 'actif',
      dateCreation: '20/01/2024',
      derniereConnexion: '20/02/2024 09:00'
    },
    {
      id: 4,
      nom: 'David Lefevre',
      email: 'david.lefevre@entreprise.com',
      role: 'User',
      statut: 'inactif',
      dateCreation: '22/01/2024',
      derniereConnexion: '10/02/2024 14:15'
    },
    {
      id: 5,
      nom: 'Emma Moreau',
      email: 'emma.moreau@entreprise.com',
      role: 'User',
      statut: 'actif',
      dateCreation: '25/01/2024',
      derniereConnexion: '26/02/2024 08:45'
    }
  ];
  searchTerm = '';
  filterRole = '';
  filterStatut = '';
  showForm = false;
  nouvelUtilisateur: Omit<User, 'id'> = { nom: '', email: '', role: '', statut: '', dateCreation: '', derniereConnexion: '' };

  constructor(private userService: UserService) {}

  getInitials(nom: string) {
    return nom.split(' ').map(word => word[0]).join('');
  }

  getRoleClass(role: string) {
    switch (role.toLowerCase()) {
      case 'admin': return 'admin';
      case 'manager': return 'manager';
      case 'user': return 'user';
      default: return '';
    }
  }

  getStatutClass(statut: string) {
    switch (statut.toLowerCase()) {
      case 'actif': return 'actif';
      case 'inactif': return 'inactif';
      default: return '';
    }
  }

  getFilteredUsers() {
    return this.users.filter(u =>
      (this.searchTerm === '' ||
        u.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.filterRole === '' || u.role.toLowerCase() === this.filterRole.toLowerCase()) &&
      (this.filterStatut === '' || u.statut.toLowerCase() === this.filterStatut.toLowerCase())
    );
  }

  getActifs() {
    return this.users.filter(u => u.statut === 'actif').length;
  }

  getAdmins() {
    return this.users.filter(u => u.role.toLowerCase() === 'admin').length;
  }

  getRecentConnexions() {
    // Pour l'exemple, retourne 0 (à adapter selon la logique souhaitée)
    return 0;
  }

  onSubmit() {
    if (!this.nouvelUtilisateur.nom || !this.nouvelUtilisateur.email || !this.nouvelUtilisateur.role || !this.nouvelUtilisateur.statut) return;
    this.nouvelUtilisateur.dateCreation = new Date().toLocaleDateString();
    this.nouvelUtilisateur.derniereConnexion = '';
    this.userService.ajouterUser(this.nouvelUtilisateur).subscribe(user => {
      this.users.push(user);
      this.nouvelUtilisateur = { nom: '', email: '', role: '', statut: '', dateCreation: '', derniereConnexion: '' };
      this.showForm = false;
    });
  }
}
