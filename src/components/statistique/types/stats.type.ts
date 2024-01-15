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

export interface StatsTopUtilisateur {
  utilisateur: {
    nom: string;
    prenom: string;
  };
  annonce: number;
  vente: number;
  commission: number;
  pourcentage: number;
}
export interface StatRequest {
  mois: number;
  annee: number;
}
export interface StatProps {
  monthYear: Dayjs;
}
