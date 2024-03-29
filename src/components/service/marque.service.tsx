// apiService.js
import axios from "axios";
import { Marque } from "../shared/types/Marque";
import { Url_api } from "../shared/constants/global";
import { PaginationState } from "../../store/pagination/PaginationSlice";

export const findAllMarque = (page: PaginationState) =>
  axios.get(
    `${Url_api}/marques?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findMarqueById = (id: number) =>
  axios.get(`${Url_api}/marques/${id}`);

export const updateMarque = async (form: Marque) =>
  axios.put(`${Url_api}/marques/${form.id}`, form);

export const insertMarque = async (form: Marque) =>
  axios.post(`${Url_api}/marques`, form);
