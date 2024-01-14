// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Categorie } from "../shared/types/Categorie";
import { PaginationState } from "../../store/pagination/PaginationSlice";

export const findAllCategorie = (page: PaginationState) =>
  axios.get(
    `${Url_api}/categories?page=${page.numero}&pageSize=${page.nbrParPage}`
  );
export const findCategorieById = (id: number) =>
  axios.get(`${Url_api}/categories/${id}`);

export const updateCategorie = async (form: Categorie) =>
  axios.put(`${Url_api}/categories/${form.id}`, form);

export const insertCategorie = async (form: Categorie) =>
  axios.post(`${Url_api}/categories`, form);
