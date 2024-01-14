export interface StatFiltre {
    filtre: string,
    valeur: string
}

export interface StatsTopUtilisateur {
    utilisateur: {
        nom: string,
        prenom: string
    },
    annonce: number,
    vente: number,
    commission: number,
    pourcentage: number
}