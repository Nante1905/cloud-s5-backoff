// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Url_api } from "../shared/constants/global";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Marque } from "../shared/types/Marque";

export const findAllMarque = (page: PaginationState) =>
  http.get(
    `${Url_api}/marques?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findAllMarqueWithoutPage = () => http.get(`${Url_api}/marques`);
export const findMarqueById = (id: number) =>
  http.get(`${Url_api}/marques/${id}`);

export const updateMarque = async (form: Marque) =>
  http.put(`${Url_api}/marques/${form.id}`, form);

export const insertMarque = async (form: Marque) =>
  http.post(`${Url_api}/marques`, form);

export const deleteMarque = (id: number) =>
  http.delete(`${Url_api}/marques/${id}`);
