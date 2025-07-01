import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../models/commande.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private apiUrl = 'http://localhost:8080/commandes'; // adapte si besoin

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

  ajouterCommande(cmd: Omit<Commande, 'id'>): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, cmd);
  }

  supprimerCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
