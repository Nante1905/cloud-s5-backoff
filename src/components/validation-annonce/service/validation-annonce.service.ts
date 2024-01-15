import axios from "axios";
import { Url_api } from "../../shared/constants/global";

export const validerAnnonce = (id: number) =>
  axios.put(`${Url_api}/annonces/${id}/valider`);

export const refuserAnnonce = (id: number) =>
  axios.put(`${Url_api}/annonces/${id}/refuser`);

export const findAnnonceById = (id: number) =>
  axios.get(`${Url_api}/annonces/${id}`);
