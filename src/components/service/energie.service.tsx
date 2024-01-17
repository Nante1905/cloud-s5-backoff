// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Energie } from "../shared/types/Energie";
import { PaginationState } from "../../store/pagination/PaginationSlice";

export const findAllEnergie = (page: PaginationState) =>
  axios.get(
    `${Url_api}/energies?page=${page.numero}&pageSize=${page.nbrParPage}`
  );

export const findEnergieById = (id: number) =>
  axios.get(`${Url_api}/energies/${id}`);

export const updateEnergie = (form: Energie) =>
  axios.put(`${Url_api}/energies/${form.id}`, form);

export const insertEnergie = (form: Energie) =>
  axios.post(`${Url_api}/energies`, form);

export const deleteEnergie = (id: number) =>
  axios.delete(`${Url_api}/energies/${id}`);
