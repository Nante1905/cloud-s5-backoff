// apiService.js
import axios from "axios";
import { Vitesse } from "../shared/types/Vitesse";
import { Url_api } from "../shared/constants/global";
import { PaginationState } from "../../store/pagination/PaginationSlice";

export const findAllVitesse = (page: PaginationState) =>
  axios.get(
    `${Url_api}/vitesses?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findVitesseById = (id: number) =>
  axios.get(`${Url_api}/vitesses/${id}`);

export const updateVitesse = async (form: Vitesse) =>
  axios.put(`${Url_api}/vitesses/${form.id}`, form);

export const insertVitesse = async (form: Vitesse) =>
  axios.post(`${Url_api}/vitesses`, form);

export const deleteVitesse = (id: number) =>
  axios.delete(`${Url_api}/vitesses/${id}`);
