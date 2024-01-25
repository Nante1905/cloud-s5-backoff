import { Modele } from "../../../shared/types/Modele";
import { Url_api } from "../../../shared/constants/global";
import { PaginationState } from "../../../../store/pagination/PaginationSlice";
import { http } from "../../../shared/service/interceptor/axios.interceptor"

export const findAllModele = (page: PaginationState) =>
  http.get(
    `${Url_api}/modeles?page=${page.numero}&pageSize=${page.nbrParPage}`
  );

export const findModeleById = (id: number) =>
  http.get(`${Url_api}/modeles/${id}`);

export const updateModele = (model: Modele) =>
  http.put(`${Url_api}/modeles/${model.id}`, model);

export const insertModele = (model: Modele) =>
  http.post(`${Url_api}/modeles`, model);

export const deleteModele = (id: number) =>
  http.delete(`${Url_api}/modeles/${id}`);