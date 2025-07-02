function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProduitService {
  private apiUrl = 'http://localhost:8080/produits'; // adapte si besoin

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<Produit[]>(this.apiUrl, { headers });
  }

  ajouterProduit(produit: Omit<Produit, 'id'>): Observable<Produit> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<Produit>(this.apiUrl, produit, { headers });
  }

  supprimerProduit(id: number): Observable<void> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit, { headers });
  }
}
