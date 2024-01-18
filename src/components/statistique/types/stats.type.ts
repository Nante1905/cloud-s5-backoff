import { Dayjs } from "dayjs";
import { Marque } from "../../shared/types/Marque";

export interface MarqueBenefice {
  logo: string;
  montant: number;
  marque: Marque;
}
export interface StatBenefice {
  benefice: number;
  beneficeMarque: MarqueBenefice[];
}
export interface TopUserRequest{
  toShow: number;
  annee:number;
  mois:number;
}
export interface TopUser {
  nom: string;
  prenom: string;
  annonce: number;
  valide: number;
  vendu: number;
  commission: number;
  pourcentage: number;
}
export interface StatTopUser{
  topUsers: TopUser[]
}
export interface StatRequestAnnee{
  annee:number
}
export interface StatRequest {
  mois: number;
  annee: number;
}
export interface Inscription {
  mois: number;
  nbInscrit: number;
}
export interface StatInscription {
  users: number;
  inscriptions: Inscription[];
}
export interface StatProps {
  monthYear: Dayjs;
}
