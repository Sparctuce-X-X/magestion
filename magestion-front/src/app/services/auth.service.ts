import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/auth'; // À adapter selon ton backend

  login(credentials: { nom: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;

    return { username: 'Utilisateur connecté' };
  }
}
