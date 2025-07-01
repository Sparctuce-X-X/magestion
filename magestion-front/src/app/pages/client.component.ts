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
    <h2>Liste des clients</h2>

    <ul>
      <li *ngFor="let c of clients">
        {{ c.nom }} - {{ c.email }} - {{ c.telephone }}
        <button (click)="supprimerClient(c.id)">❌ Supprimer</button>
      </li>
    </ul>

    <h3>Ajouter un client</h3>
    <form (ngSubmit)="ajouterClient()">
      <input type="text" [(ngModel)]="nouveauClient.nom" name="nom" placeholder="Nom" required>
      <input type="email" [(ngModel)]="nouveauClient.email" name="email" placeholder="Email" required>
      <input type="text" [(ngModel)]="nouveauClient.telephone" name="telephone" placeholder="Téléphone" required>
      <button type="submit">Ajouter</button>
    </form>
  `
})
export class ClientComponent {
  clients: Client[] = [];
  nouveauClient: Omit<Client, 'id'> = { nom: '', email: '', telephone: '' };

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
}
