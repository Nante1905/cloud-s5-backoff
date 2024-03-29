// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Couleur } from "../shared/types/Couleur";
import { PaginationState } from "../../store/pagination/PaginationSlice";

export const findAllCouleur = (page: PaginationState) =>
  axios.get(
    `${Url_api}/couleurs?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findCouleurById = (id: number) =>
  axios.get(`${Url_api}/couleurs/${id}`);

export const updateCouleur = async (form: Couleur) =>
  axios.put(`${Url_api}/couleurs/${form.id}`, form);

export const insertCouleur = async (form: Couleur) =>
  axios.post(`${Url_api}/couleurs`, form);
