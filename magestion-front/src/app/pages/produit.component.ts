import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="produits-bg">
      <div class="produits-container">
        <div class="page-header modern-header">
          <div class="header-content">
            <h1 class="page-title modern-title">📦 Gestion des Produits</h1>
            <p class="page-subtitle modern-subtitle">Gérez votre inventaire de produits</p>
          </div>
          <button class="btn btn-primary add-btn modern-add-btn" (click)="toggleForm()" [disabled]="isLoading">
            <span class="add-icon">➕</span> Ajouter un produit
          </button>
        </div>
        <div *ngIf="errorMessage" class="error-alert modern-alert">
          ⚠️ {{errorMessage}}
          <button class="btn-close" (click)="clearError()">×</button>
        </div>
        <div *ngIf="successMessage" class="success-alert modern-alert">
          ✅ {{successMessage}}
          <button class="btn-close" (click)="clearSuccess()">×</button>
        </div>
        <div class="modal-backdrop" *ngIf="showForm" (click)="resetForm()"></div>
        <div class="modal-form" *ngIf="showForm">
          <div class="form-card card modern-form-card">
            <button class="modal-close" (click)="resetForm()">×</button>
            <h2 class="form-title modern-form-title">{{editMode ? 'Modifier' : 'Ajouter'}} un produit</h2>
            <form class="product-form modern-product-form" (ngSubmit)="onSubmit()" #productForm="ngForm">
              <div class="form-row modern-form-row">
                <div class="form-group modern-form-group">
                  <label for="nom" class="form-label modern-form-label">Nom du produit</label>
                  <input type="text" id="nom" name="nom" class="form-input modern-form-input" [(ngModel)]="formData.nom" placeholder="Ex: Ordinateur portable" required #nom="ngModel" [class.error]="nom.invalid && nom.touched">
                  <div *ngIf="nom.invalid && nom.touched" class="error-message modern-error-message">Le nom est requis</div>
                </div>
                <div class="form-group modern-form-group">
                  <label for="categorie" class="form-label modern-form-label">Catégorie</label>
                  <select id="categorie" name="categorie" class="form-input modern-form-input" [(ngModel)]="formData.categorie" required #categorie="ngModel" [class.error]="categorie.invalid && categorie.touched">
                    <option value="">Sélectionner</option>
                    <option value="Électronique">Électronique</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Alimentation">Alimentation</option>
                    <option value="Maison">Maison</option>
                  </select>
                  <div *ngIf="categorie.invalid && categorie.touched" class="error-message modern-error-message">La catégorie est requise</div>
                </div>
              </div>
              <div class="form-row modern-form-row">
                <div class="form-group modern-form-group">
                  <label for="prix" class="form-label modern-form-label">Prix (€)</label>
                  <input type="number" id="prix" name="prix" class="form-input modern-form-input" [(ngModel)]="formData.prix" placeholder="0.00" step="0.01" min="0" required #prix="ngModel" [class.error]="prix.invalid && prix.touched">
                  <div *ngIf="prix.invalid && prix.touched" class="error-message modern-error-message">Le prix est requis et doit être positif</div>
                </div>
                <div class="form-group modern-form-group">
                  <label for="stock" class="form-label modern-form-label">Stock</label>
                  <input type="number" id="stock" name="stock" class="form-input modern-form-input" [(ngModel)]="formData.stock" placeholder="0" min="0" required #stock="ngModel" [class.error]="stock.invalid && stock.touched">
                  <div *ngIf="stock.invalid && stock.touched" class="error-message modern-error-message">Le stock est requis et doit être positif</div>
                </div>
              </div>
              <div class="form-actions modern-form-actions">
                <button type="submit" class="btn btn-primary modern-btn-primary" [disabled]="productForm.invalid || isSubmitting">
                  <span *ngIf="isSubmitting" class="spinner"></span>
                  {{isSubmitting ? 'Traitement...' : (editMode ? '✏️ Modifier' : '➕ Ajouter')}}
                </button>
                <button type="button" class="btn btn-secondary modern-btn-secondary" (click)="resetForm()">Annuler</button>
              </div>
            </form>
          </div>
        </div>
        <div class="stats-section modern-stats">
          <div class="stats-grid modern-stats-grid">
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">📦</div>
              <div class="stat-value modern-stat-value">{{produits.length}}</div>
              <div class="stat-label">Total produits</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-value value-euro modern-stat-value">{{ getTotalValue() | number:'1.2-2' }}€</div>
              <div class="stat-label">Valeur totale</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-value modern-stat-value">{{getTotalStock()}}</div>
              <div class="stat-label">Stock total</div>
            </div>
            <div class="stat-card card modern-stat-card">
              <div class="stat-icon">⚠️</div>
              <div class="stat-value value-warning modern-stat-value">{{getLowStock()}}</div>
              <div class="stat-label">Stock faible</div>
            </div>
          </div>
        </div>
        <div class="filters-section card modern-filters-section">
          <div class="filters-content modern-filters-content">
            <div class="search-box modern-search-box">
              <input type="text" class="form-input search-input modern-search-input" [(ngModel)]="searchTerm" placeholder="🔍 Rechercher un produit...">
            </div>
            <div class="filter-select modern-filter-select">
              <select class="form-input" [(ngModel)]="filterCategorie">
                <option value="">Toutes les catégories</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Maison">Maison</option>
              </select>
            </div>
          </div>
        </div>
        <div *ngIf="isLoading" class="loading-state modern-loading-state">
          <div class="spinner-large"></div>
          <p>Chargement des produits...</p>
        </div>
        <div class="products-section modern-products-section" *ngIf="!isLoading">
          <div *ngIf="getFilteredProducts().length === 0" class="empty-state modern-empty-state">
            <div class="empty-icon">📦</div>
            <h3>Aucun produit trouvé</h3>
            <p>{{produits.length === 0 ? 'Commencez par ajouter votre premier produit.' : 'Essayez de modifier vos critères de recherche.'}}</p>
          </div>
          <div class="products-grid modern-products-grid" *ngIf="getFilteredProducts().length > 0">
            <div class="product-card card modern-product-card" *ngFor="let produit of getFilteredProducts()">
              <div class="product-header modern-product-header">
                <h3 class="product-name modern-product-name">{{produit.nom}}</h3>
                <span class="product-category modern-product-category" [ngClass]="getCategoryClass(produit.categorie)">{{ produit.categorie }}</span>
              </div>
              <div class="product-details modern-product-details">
                <div class="product-price modern-product-price">
                  <span class="price-label">Prix:</span>
                  <span class="price-value modern-price-value">{{produit.prix}}€</span>
                </div>
                <div class="product-stock modern-product-stock" [class.low-stock]="produit.stock < 10">
                  <span class="stock-label">Stock:</span>
                  <span class="stock-value modern-stock-value">{{produit.stock}}</span>
                  <span *ngIf="produit.stock < 10" class="stock-warning">⚠️</span>
                </div>
              </div>
              <div class="product-actions modern-product-actions">
                <button class="btn btn-warning btn-sm modern-btn-warning" (click)="editProduit(produit)" [disabled]="isSubmitting">✏️ Modifier</button>
                <button class="btn btn-danger btn-sm modern-btn-danger" (click)="deleteProduit(produit.id)" [disabled]="isSubmitting">🗑️ Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.produits-bg {
      min-height: 100vh;
      background: #f6f8fb;
      width: 100vw;
    }
    .produits-container {
      padding: 2.5rem 1rem 3rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .header-content h1 {
      font-size: 2.1rem;
      font-weight: 800;
      color: #222;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }
    .page-title {
      font-size: 2.1rem;
      font-weight: 800;
      color: #222;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }
    .page-subtitle {
      color: #6b7280;
      font-size: 1.08rem;
    }
    .add-btn {
      background: #4f8cff;
      color: #fff;
      font-weight: 700;
      font-size: 1.08rem;
      border-radius: 8px;
      padding: 0.7rem 1.5rem;
      border: none;
      box-shadow: 0 2px 8px rgba(79,140,255,0.10);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .add-btn:hover {
      background: #247cff;
      color: #fff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(79,140,255,0.18);
    }
    .add-icon {
      font-size: 1.2rem;
    }
    .error-alert, .success-alert {
      position: relative;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.05rem;
    }
    .error-alert {
      background: #FEF2F2;
      border: 1px solid #FECACA;
      color: #DC2626;
    }
    .success-alert {
      background: #F0FDF4;
      border: 1px solid #BBF7D0;
      color: #166534;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0;
      margin-left: 1rem;
    }
    .form-section {
      margin-bottom: 2rem;
    }
    .form-card {
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(79,140,255,0.08);
      background: #fff;
    }
    .form-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #222;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .form-input.error {
      border-color: #EF4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .error-message {
      color: #EF4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }
    .loading-state {
      text-align: center;
      padding: 3rem;
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
    .stats-section {
      margin-bottom: 2rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.2rem;
    }
    .stat-card {
      padding: 1.5rem 1.2rem;
      text-align: center;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(79,140,255,0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow 0.2s, transform 0.2s;
      font-size: 1.08rem;
    }
    .stat-card:hover {
      box-shadow: 0 8px 24px rgba(79,140,255,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #4f8cff;
      margin-bottom: 0.25rem;
    }
    .value-euro {
      color: #1db954;
    }
    .value-warning {
      color: #EF4444;
    }
    .stat-label {
      color: #6b7280;
      font-size: 0.95rem;
    }
    .filters-section {
      padding: 1.2rem 1rem;
      margin-bottom: 2rem;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(79,140,255,0.08);
    }
    .filters-content {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .search-box {
      flex: 1;
    }
    .search-input {
      width: 100%;
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 1.05rem;
      background: #f9fafb;
      transition: border-color 0.2s;
    }
    .search-input:focus {
      border-color: #4f8cff;
      background: #fff;
    }
    .filter-select select {
      min-width: 180px;
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 1.05rem;
      background: #f9fafb;
      transition: border-color 0.2s;
    }
    .products-section {
      margin-top: 2rem;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      padding: 1.5rem 1.2rem;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(79,140,255,0.08);
      transition: box-shadow 0.2s, transform 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
    }
    .product-card:hover {
      box-shadow: 0 8px 24px rgba(79,140,255,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .product-name {
      font-size: 1.13rem;
      font-weight: 700;
      color: #222;
      flex: 1;
    }
    .product-category {
      padding: 0.25rem 0.9rem;
      border-radius: 1rem;
      font-size: 0.82rem;
      font-weight: 600;
      color: #fff;
      background: #4f8cff;
      margin-left: 0.5rem;
      display: inline-block;
      box-shadow: 0 1px 4px rgba(79,140,255,0.10);
    }
    .cat-electronique { background: #4f8cff; }
    .cat-vetements { background: #3b82f6; }
    .cat-alimentation { background: #1db954; }
    .cat-maison { background: #f59e42; }
    .product-details {
      margin-bottom: 1.2rem;
    }
    .product-price, .product-stock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .price-value {
      font-size: 1.18rem;
      font-weight: 800;
      color: #1db954;
    }
    .stock-value {
      font-weight: 700;
      color: #222;
    }
    .low-stock .stock-value {
      color: #EF4444;
    }
    .stock-warning {
      margin-left: 0.5rem;
      color: #EF4444;
      font-size: 1.1rem;
    }
    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }
    .btn-sm {
      padding: 0.5rem 1.1rem;
      font-size: 0.85rem;
      border-radius: 7px;
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(79,140,255,0.07);
      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
    }
    .btn-warning {
      background: #ffe066;
      color: #b68900;
      border: none;
    }
    .btn-warning:hover {
      background: #ffd43b;
      color: #7c5c00;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(255,224,102,0.18);
    }
    .btn-danger {
      background: #ef4444;
      color: #fff;
      border: none;
    }
    .btn-danger:hover {
      background: #dc2626;
      color: #fff;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 4px 12px rgba(239,68,68,0.18);
    }
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .empty-state h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #222;
    }
    @media (max-width: 900px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .products-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .products-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
      .filters-content {
        flex-direction: column;
        gap: 0.7rem;
      }
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
    .modern-alert {
      font-size: 1.08rem;
      border-radius: 10px;
      margin-bottom: 1.2rem;
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
    .modern-filter-select select {
      min-width: 180px;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 1.08rem;
      background: #f1f5f9;
      transition: border-color 0.2s;
    }
    .modern-products-section {
      margin-top: 2.5rem;
    }
    .modern-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .modern-product-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 200px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .modern-product-card:hover {
      box-shadow: 0 8px 24px rgba(37,99,235,0.13);
      transform: translateY(-4px) scale(1.03);
    }
    .modern-product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.2rem;
    }
    .modern-product-name {
      font-size: 1.18rem;
      font-weight: 800;
      color: #222;
      flex: 1;
    }
    .modern-product-category {
      padding: 0.3rem 1.1rem;
      border-radius: 1rem;
      font-size: 0.92rem;
      font-weight: 700;
      color: #fff;
      margin-left: 0.5rem;
      display: inline-block;
      box-shadow: 0 1px 4px rgba(37,99,235,0.10);
      text-transform: capitalize;
    }
    .cat-electronique { background: #2563eb; }
    .cat-vetements { background: #0ea5e9; }
    .cat-alimentation { background: #22c55e; }
    .cat-maison { background: #f59e42; }
    .modern-product-details {
      margin-bottom: 1.3rem;
    }
    .modern-product-price, .modern-product-stock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .modern-price-value {
      font-size: 1.22rem;
      font-weight: 900;
      color: #22c55e;
    }
    .modern-stock-value {
      font-weight: 800;
      color: #222;
    }
    .low-stock .modern-stock-value {
      color: #ef4444;
    }
    .stock-warning {
      margin-left: 0.5rem;
      color: #ef4444;
      font-size: 1.1rem;
    }
    .modern-product-actions {
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
      grid-template-columns: 1fr 1fr;
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
      .modern-products-grid {
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
      .modern-products-grid {
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
export class ProduitComponent {
  produits: Produit[] = [];
  nouveauProduit: Omit<Produit, 'id'> = { nom: '', prix: 0, stock: 0, categorie: '' };
  showForm = false;
  editMode = false;
  formData: Partial<Produit> = {};
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';
  filterCategorie = '';
  isSubmitting = false;

  constructor(private produitService: ProduitService) {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.getProduits().subscribe(data => this.produits = data);
  }

  ajouterProduit() {
    this.produitService.ajouterProduit(this.nouveauProduit).subscribe(() => {
      this.chargerProduits();
      this.nouveauProduit = { nom: '', prix: 0, stock: 0, categorie: '' };
    });
  }

  supprimerProduit(id: number) {
    this.produitService.supprimerProduit(id).subscribe(() => {
      this.chargerProduits();
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.editMode = false;
    this.formData = {};
  }

  onSubmit() {
    if (this.editMode) {
      this.modifierProduit();
    } else {
      this.ajouterProduit();
    }
  }

  modifierProduit() {
    this.produitService.updateProduit((this.formData as Produit).id!, this.formData as Produit).subscribe(() => {
      this.chargerProduits();
      this.showForm = false;
      this.formData = {};
      this.successMessage = 'Produit modifié avec succès';
    }, (error: any) => {
      this.errorMessage = 'Erreur lors de la modification du produit';
    });
  }

  resetForm() {
    this.showForm = false;
    this.formData = { categorie: '' };
    this.errorMessage = '';
    this.successMessage = '';
  }

  getCategoryClass(cat: string) {
    switch (cat) {
      case 'Électronique': return 'cat-electronique';
      case 'Vêtements': return 'cat-vetements';
      case 'Alimentation': return 'cat-alimentation';
      case 'Maison': return 'cat-maison';
      default: return '';
    }
  }

  getFilteredProducts() {
    return this.produits.filter(p =>
      p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterCategorie === '' || p.categorie === this.filterCategorie)
    );
  }

  getTotalValue() {
    return this.produits.reduce((total, p) => total + p.prix, 0);
  }

  getTotalStock() {
    return this.produits.reduce((total, p) => total + p.stock, 0);
  }

  getLowStock() {
    return this.produits.filter(p => p.stock < 10).length;
  }

  clearError() {
    this.errorMessage = '';
  }

  clearSuccess() {
    this.successMessage = '';
  }

  editProduit(produit: Produit) {
    this.editMode = true;
    this.showForm = true;
    this.formData = { ...produit };
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteProduit(id: number) {
    this.supprimerProduit(id);
  }
}
