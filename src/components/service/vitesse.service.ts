// apiService.js
import { Vitesse } from "../shared/types/Vitesse";
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";

export const findAllVitesse = (page: PaginationState) =>
  http.get(`/vitesses?page=${page.numero}&pageSize=${page.nbrParPage}`);
export const findVitesseById = (id: number) => http.get(`/vitesses/${id}`);

export const updateVitesse = async (form: Vitesse) =>
  http.put(`/vitesses/${form.id}`, form);

export const insertVitesse = async (form: Vitesse) =>
  http.post(`/vitesses`, form);

export const deleteVitesse = (id: number) => http.delete(`/vitesses/${id}`);
