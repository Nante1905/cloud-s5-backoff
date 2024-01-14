import { Categorie } from "./Categorie";
import { Marque } from "./Marque";

export interface Modele {
    id?: number,
    nom: string,
    nbPlace: number,
    nbPorte: number,
    anneeSortie: number,
    categorie: Categorie,
    marque: Marque
}