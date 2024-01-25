// apiService.js
import { Vitesse } from "../shared/types/Vitesse";
import { Url_api } from "../shared/constants/global";
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";


export const findAllVitesse = (page: PaginationState) =>
  http.get(
    `${Url_api}/vitesses?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findVitesseById = (id: number) =>
  http.get(`${Url_api}/vitesses/${id}`);

export const updateVitesse = async (form: Vitesse) =>
  http.put(`${Url_api}/vitesses/${form.id}`, form);

export const insertVitesse = async (form: Vitesse) =>
  http.post(`${Url_api}/vitesses`, form);

export const deleteVitesse = (id: number) =>
  http.delete(`${Url_api}/vitesses/${id}`);
