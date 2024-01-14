import { Couleur } from "./Couleur";
import { Energie } from "./Energie";
import { Modele } from "./Modele";
import { Vitesse } from "./Vitesse";



export interface Voiture {
    id?: number,
    consommation: number,
    kilometrage: number,
    etat: number,
    couleur: Couleur,
    modele: Modele,
    vitesse: Vitesse,
    energie: Energie
}