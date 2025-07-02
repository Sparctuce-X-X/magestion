function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  ajouterUser(user: Omit<User, 'id'>): Observable<User> {
    const token = isBrowser() ? localStorage.getItem('jwt') : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<User>(this.apiUrl, user, { headers });
  }
} 