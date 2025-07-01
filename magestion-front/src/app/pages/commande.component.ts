import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Commande } from '../models/commande.model';
import { CommandeService } from '../services/commande.service';

@Component({
  standalone: true,
  selector: 'app-commande',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Liste des commandes</h2>

    <ul>
      <li *ngFor="let cmd of commandes">
        ID: {{ cmd.id }} - Montant: {{ cmd.montant }}€ - Client ID: {{ cmd.clientId }}
        <button (click)="supprimerCommande(cmd.id)">❌ Supprimer</button>
      </li>
    </ul>

    <h3>Ajouter une commande</h3>
    <form (ngSubmit)="ajouterCommande()">
      <input type="number" [(ngModel)]="nouvelleCommande.montant" name="montant" placeholder="Montant" required>
      <input type="number" [(ngModel)]="nouvelleCommande.clientId" name="clientId" placeholder="Client ID" required>
      <button type="submit">Ajouter</button>
    </form>
  `
})
export class CommandeComponent {
  commandes: Commande[] = [];
  nouvelleCommande: Omit<Commande, 'id'> = { montant: 0, clientId: 0, date: '' };

  constructor(private commandeService: CommandeService) {
    this.chargerCommandes();
  }

  chargerCommandes() {
    this.commandeService.getCommandes().subscribe(data => this.commandes = data);
  }

  ajouterCommande() {
    // Génère une date actuelle ISO
    this.nouvelleCommande.date = new Date().toISOString();
    this.commandeService.ajouterCommande(this.nouvelleCommande).subscribe(() => {
      this.chargerCommandes();
      this.nouvelleCommande = { montant: 0, clientId: 0, date: '' };
    });
  }

  supprimerCommande(id: number) {
    this.commandeService.supprimerCommande(id).subscribe(() => {
      this.chargerCommandes();
    });
  }
}
