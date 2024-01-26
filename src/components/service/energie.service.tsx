// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Energie } from "../shared/types/Energie";

export const findAllEnergie = (page: PaginationState) =>
  http.get(`/energies?page=${page.numero}&pageSize=${page.nbrParPage}`);

export const findEnergieById = (id: number) => http.get(`/energies/${id}`);

export const updateEnergie = (form: Energie) =>
  http.put(`/energies/${form.id}`, form);

export const insertEnergie = (form: Energie) => http.post(`/energies`, form);

export const deleteEnergie = (id: number) => http.delete(`/energies/${id}`);
