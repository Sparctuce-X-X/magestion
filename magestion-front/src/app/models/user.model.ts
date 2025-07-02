export interface User {
  id: number;
  nom: string;
  email: string;
  role: string; // 'Admin', 'Manager', etc.
  statut: string; // 'actif', 'inactif'
  dateCreation: string; // ou Date
  derniereConnexion: string; // ou Date
  // Ajoute ici d'autres champs si besoin
} 