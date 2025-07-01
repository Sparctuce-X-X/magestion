import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule],
  template: `
    <div class="user-container">
      <h2>👤 Liste des utilisateurs</h2>
      <div class="user-list">
        <div class="user-card" *ngFor="let u of users">
          <span class="user-nom">{{ u.nom }}</span>
        </div>
        <div *ngIf="users.length === 0" class="empty">Aucun utilisateur trouvé.</div>
      </div>
    </div>
  `,
  styles: [`
    .user-container {
      max-width: 500px;
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
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .user-card {
      background: #f7fbff;
      border-radius: 10px;
      box-shadow: 0 1px 6px rgba(79,140,255,0.07);
      padding: 14px 20px;
      font-size: 1.08rem;
      font-weight: 500;
      color: #222;
      display: flex;
      align-items: center;
      transition: box-shadow 0.2s;
    }
    .user-card:hover {
      box-shadow: 0 4px 16px rgba(79,140,255,0.13);
    }
    .user-nom {
      color: #4f8cff;
      font-weight: 600;
      font-size: 1.08rem;
    }
    .empty {
      text-align: center;
      color: #aaa;
      font-style: italic;
      margin: 18px 0;
    }
    @media (max-width: 700px) {
      .user-container {
        padding: 10px 2vw;
      }
      .user-card {
        padding: 10px 6px;
        font-size: 1rem;
      }
    }
  `]
})
export class UserComponent {
  users: User[] = [];
  private userService = inject(UserService);

  constructor() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }
}
