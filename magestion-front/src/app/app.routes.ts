import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { ProduitComponent } from './pages/produit.component';
import { ClientComponent } from './pages/client.component';
import { CommandeComponent } from './pages/commande.component';
import { UserComponent } from './pages/user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'commandes', component: CommandeComponent },
  { path: 'utilisateurs', component: UserComponent },
  { path: '**', redirectTo: '' } // redirection vers la home pour toute route inconnue
];
