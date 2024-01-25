// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Url_api } from "../shared/constants/global";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Categorie } from "../shared/types/Categorie";

export const findAllCategorie = (page: PaginationState) =>
  http.get(
    `${Url_api}/categories?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findAllCategorieWithoutPage = () =>
  http.get(`${Url_api}/categories`);
export const findCategorieById = (id: number) =>
  http.get(`${Url_api}/categories/${id}`);

export const updateCategorie = async (form: Categorie) =>
  http.put(`${Url_api}/categories/${form.id}`, form);

export const insertCategorie = async (form: Categorie) =>
  http.post(`${Url_api}/categories`, form);

export const deleteCategorie = (id: number) =>
  http.delete(`${Url_api}/categories/${id}`);
