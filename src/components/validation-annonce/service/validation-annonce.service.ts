
import { http } from "../../shared/service/interceptor/axios.interceptor";

export const validerAnnonce = (id: number) =>
  http.put(`/annonces/${id}/valider`);

export const refuserAnnonce = (id: number) =>
  http.put(`/annonces/${id}/refuser`);

export const findAnnonceById = (id: number) =>
  http.get(`/annonces/${id}`);
