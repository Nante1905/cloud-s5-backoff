import { Modele } from "../../../shared/types/Modele";
import { PaginationState } from "../../../../store/pagination/PaginationSlice";
import { http } from "../../../shared/service/interceptor/axios.interceptor"

export const findAllModele = (page: PaginationState) =>
  http.get(
    `/modeles?page=${page.numero}&pageSize=${page.nbrParPage}`
  );

export const findModeleById = (id: number) =>
  http.get(`/modeles/${id}`);

export const updateModele = (model: Modele) =>
  http.put(`/modeles/${model.id}`, model);

export const insertModele = (model: Modele) =>
  http.post(`/modeles`, model);

export const deleteModele = (id: number) =>
  http.delete(`/modeles/${id}`);