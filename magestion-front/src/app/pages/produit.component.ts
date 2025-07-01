import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  standalone: true,
  selector: 'app-produit',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>📦 Liste des produits</h2>
      <div class="produit-list">
        <div class="produit-card" *ngFor="let p of produits">
          <div class="produit-info">
            <span class="produit-nom">{{ p.nom }}</span>
            <span class="produit-prix">{{ p.prix }} €</span>
            <span class="produit-stock">Stock : {{ p.stock }}</span>
          </div>
          <button class="btn-supprimer" (click)="supprimerProduit(p.id)">Supprimer</button>
        </div>
        <div *ngIf="produits.length === 0" class="empty">Aucun produit pour le moment.</div>
      </div>

      <div class="ajout-section">
        <h3>Ajouter un produit</h3>
        <form class="ajout-form" (ngSubmit)="ajouterProduit()">
          <input type="text" [(ngModel)]="nouveauProduit.nom" name="nom" placeholder="Nom" required>
          <input type="number" [(ngModel)]="nouveauProduit.prix" name="prix" placeholder="Prix" required>
          <input type="number" [(ngModel)]="nouveauProduit.stock" name="stock" placeholder="Stock" required>
          <button type="submit" class="btn-ajouter">Ajouter</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 32px auto;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(79,140,255,0.08);
      padding: 32px 24px 24px 24px;
    }
    h2 {
      text-align: center;
      color: #4f8cff;
      margin-bottom: 28px;
    }
    .produit-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }
    .produit-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f7fbff;
      border-radius: 10px;
      box-shadow: 0 1px 6px rgba(79,140,255,0.07);
      padding: 16px 20px;
      transition: box-shadow 0.2s;
    }
    .produit-card:hover {
      box-shadow: 0 4px 16px rgba(79,140,255,0.13);
    }
    .produit-info {
      display: flex;
      gap: 18px;
      align-items: center;
      font-size: 1.08rem;
    }
    .produit-nom {
      font-weight: 600;
      color: #222;
    }
    .produit-prix {
      color: #4f8cff;
      font-weight: 500;
    }
    .produit-stock {
      color: #888;
      font-size: 0.98rem;
    }
    .btn-supprimer {
      background: #ff4f4f;
      color: #fff;
      border: none;
      border-radius: 16px;
      padding: 6px 18px;
      font-size: 0.98rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-supprimer:hover {
      background: #d32f2f;
    }
    .empty {
      text-align: center;
      color: #aaa;
      font-style: italic;
      margin: 18px 0;
    }
    .ajout-section {
      margin-top: 32px;
      background: #f7fbff;
      border-radius: 12px;
      padding: 20px 18px 18px 18px;
      box-shadow: 0 1px 6px rgba(79,140,255,0.07);
    }
    .ajout-section h3 {
      color: #4f8cff;
      margin-bottom: 16px;
      text-align: center;
    }
    .ajout-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .ajout-form input {
      border: 1px solid #cbe1ff;
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 1rem;
      outline: none;
      transition: border 0.2s;
    }
    .ajout-form input:focus {
      border: 1.5px solid #4f8cff;
    }
    .btn-ajouter {
      background: #4f8cff;
      color: #fff;
      border: none;
      border-radius: 16px;
      padding: 7px 22px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-ajouter:hover {
      background: #2566d6;
    }
    @media (max-width: 700px) {
      .container {
        padding: 10px 2vw;
      }
      .produit-card, .ajout-section {
        padding: 12px 6px;
      }
      .ajout-form {
        flex-direction: column;
        gap: 8px;
      }
    }
  `]
})
export class ProduitComponent {
  produits: Produit[] = [];
  nouveauProduit: Omit<Produit, 'id'> = { nom: '', prix: 0, stock: 0 };

  constructor(private produitService: ProduitService) {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.getProduits().subscribe(data => this.produits = data);
  }

  ajouterProduit() {
    this.produitService.ajouterProduit(this.nouveauProduit).subscribe(() => {
      this.chargerProduits();
      this.nouveauProduit = { nom: '', prix: 0, stock: 0 };
    });
  }

  supprimerProduit(id: number) {
    this.produitService.supprimerProduit(id).subscribe(() => {
      this.chargerProduits();
    });
  }
}
