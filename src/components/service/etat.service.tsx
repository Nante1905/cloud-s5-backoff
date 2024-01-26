// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Etat } from "../shared/types/Etat";

export const findAllEtat = (page: PaginationState) =>
  http.get(`/etats?page=${page.numero}&pageSize=${page.nbrParPage}`);

export const findEtatById = (id: number) => http.get(`/etats/${id}`);

export const updateEtat = async (form: Etat) =>
  http.put(`/etats/${form.id}`, form);
