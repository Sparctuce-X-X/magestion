export interface Commande {
  id: number;
  date: string;        // ou Date, selon comment c'est envoyé
  montant: number;
  clientId: number;
}
