export interface Utilisateur {
    id?: number,
    nom: string,
    prenom: string,
    email?: string,
    inscription: string,
    adresse: string
}

export interface Auth {
    email: string,
    password: string
}