import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/auth'; // À adapter selon ton backend

  public authChanged = new BehaviorSubject<boolean>(this.isAuthenticated());

  login(credentials: { nom: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    if (this.isBrowser()) localStorage.setItem('jwt', token);
    this.authChanged.next(true);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('jwt');
  }

  logout() {
    if (this.isBrowser()) localStorage.removeItem('jwt');
    this.authChanged.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return {
        username: decoded.sub,
        role: decoded.role
      };
    } catch (e) {
      return null;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}
