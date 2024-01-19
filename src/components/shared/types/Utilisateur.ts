export interface Utilisateur {
    id?: number,
    nom: string,
    prenom: string,
    email: string,
    dateInscription: string,
    adresse: string,
    password: string
}

export interface Auth {
    email: string,
    password: string
}