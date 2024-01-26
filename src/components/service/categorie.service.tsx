// apiService.js
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Categorie } from "../shared/types/Categorie";

export const findAllCategorie = (page: PaginationState) =>
  http.get(`/categories?page=${page.numero}&pageSize=${page.nbrParPage}`);
export const findAllCategorieWithoutPage = () => http.get(`/categories`);
export const findCategorieById = (id: number) => http.get(`/categories/${id}`);

export const updateCategorie = async (form: Categorie) =>
  http.put(`/categories/${form.id}`, form);

export const insertCategorie = async (form: Categorie) =>
  http.post(`/categories`, form);

export const deleteCategorie = (id: number) => http.delete(`/categories/${id}`);
