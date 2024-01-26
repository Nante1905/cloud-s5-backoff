// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Marque } from "../shared/types/Marque";

export const findAllMarque = (page: PaginationState) =>
  http.get(`/marques?page=${page.numero}&pageSize=${page.nbrParPage}`);
export const findAllMarqueWithoutPage = () => http.get(`/marques`);
export const findMarqueById = (id: number) => http.get(`/marques/${id}`);

export const updateMarque = async (form: Marque) =>
  http.put(`/marques/${form.id}`, form);

export const insertMarque = async (form: Marque) => http.post(`/marques`, form);

export const deleteMarque = (id: number) => http.delete(`/marques/${id}`);
