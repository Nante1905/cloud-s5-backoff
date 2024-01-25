// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Url_api } from "../shared/constants/global";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Couleur } from "../shared/types/Couleur";

export const findAllCouleur = (page: PaginationState) =>
  http.get(
    `${Url_api}/couleurs?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findCouleurById = (id: number) =>
  http.get(`${Url_api}/couleurs/${id}`);

export const updateCouleur = async (form: Couleur) =>
  http.put(`${Url_api}/couleurs/${form.id}`, form);

export const insertCouleur = async (form: Couleur) =>
  http.post(`${Url_api}/couleurs`, form);

export const deleteCouleur = (id: number) =>
  http.delete(`${Url_api}/couleurs/${id}`);
