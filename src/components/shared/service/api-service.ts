import { errorMessage } from "../constants/global"

export const getErrorMessage = (status: string): string => {
    const errors = errorMessage;
    for (const error of errors) {
        if (error.code === status) {
            return error.message;
        }

    }
    return 'Erreur interne du serveur.';
}