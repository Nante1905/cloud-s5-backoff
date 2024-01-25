import { Url_api } from "../../shared/constants/global";
import { http } from "../../shared/service/interceptor/axios.interceptor";

export const validerAnnonce = (id: number) =>
  http.put(`${Url_api}/annonces/${id}/valider`);

export const refuserAnnonce = (id: number) =>
  http.put(`${Url_api}/annonces/${id}/refuser`);

export const findAnnonceById = (id: number) =>
  http.get(`${Url_api}/annonces/${id}`);
