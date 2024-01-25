// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Url_api } from "../shared/constants/global";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Etat } from "../shared/types/Etat";

export const findAllEtat = (page: PaginationState) =>
  http.get(`${Url_api}/etats?page=${page.numero}&pageSize=${page.nbrParPage}`);

export const findEtatById = (id: number) => http.get(`${Url_api}/etats/${id}`);

export const updateEtat = async (form: Etat) =>
  http.put(`${Url_api}/etats/${form.id}`, form);
