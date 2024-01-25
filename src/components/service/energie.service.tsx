// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Url_api } from "../shared/constants/global";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Energie } from "../shared/types/Energie";

export const findAllEnergie = (page: PaginationState) =>
  http.get(
    `${Url_api}/energies?page=${page.numero}&pageSize=${page.nbrParPage}`
  );

export const findEnergieById = (id: number) =>
  http.get(`${Url_api}/energies/${id}`);

export const updateEnergie = (form: Energie) =>
  http.put(`${Url_api}/energies/${form.id}`, form);

export const insertEnergie = (form: Energie) =>
  http.post(`${Url_api}/energies`, form);

export const deleteEnergie = (id: number) =>
  http.delete(`${Url_api}/energies/${id}`);
