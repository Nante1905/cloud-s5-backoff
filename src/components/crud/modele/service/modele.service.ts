import axios from "axios";
import { Modele } from "../../../shared/types/Modele";
import { Url_api } from "../../../shared/constants/global";
import { PaginationState } from "../../../../store/pagination/PaginationSlice";

export const findAllModele = (page: PaginationState) =>
  axios.get(
    `${Url_api}/modeles?page=${page.numero}&pageSize=${page.nbrParPage}`
  );

export const findModeleById = (id: number) =>
  axios.get(`${Url_api}/modeles/${id}`);

export const updateModele = (model: Modele) =>
  axios.put(`${Url_api}/modeles/${model.id}`, model);

export const insertModele = (model: Modele) =>
  axios.post(`${Url_api}/modeles`, model);

export const deleteModele = (id: number) =>
  axios.delete(`${Url_api}/modeles/${id}`);