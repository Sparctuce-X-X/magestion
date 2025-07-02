import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { ProduitComponent } from './pages/produit.component';
import { ClientComponent } from './pages/client.component';
import { CommandeComponent } from './pages/commande.component';
import { UserComponent } from './pages/user.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'produits', component: ProduitComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'utilisateurs', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // redirection vers la home pour toute route inconnue
];
