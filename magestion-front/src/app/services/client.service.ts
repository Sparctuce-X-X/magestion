function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'http://localhost:8080/clients'; // adapte si besoin

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<Client[]>(this.apiUrl, { headers });
  }

  ajouterClient(client: Omit<Client, 'id'>): Observable<Client> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<Client>(this.apiUrl, client, { headers });
  }

  supprimerClient(id: number): Observable<void> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
