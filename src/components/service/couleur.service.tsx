// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Couleur } from "../shared/types/Couleur";

export const findAllCouleur = (page: PaginationState) =>
  http.get(`/couleurs?page=${page.numero}&pageSize=${page.nbrParPage}`);
export const findCouleurById = (id: number) => http.get(`/couleurs/${id}`);

export const updateCouleur = async (form: Couleur) =>
  http.put(`/couleurs/${form.id}`, form);

export const insertCouleur = async (form: Couleur) =>
  http.post(`/couleurs`, form);

export const deleteCouleur = (id: number) => http.delete(`/couleurs/${id}`);
