// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Categorie } from "../shared/types/Categorie";

export const findAllCategorie = () => axios.get(`${Url_api}/categories`);
export const findCategorieById = (id: number) =>
  axios.get(`${Url_api}/categories/${id}`);

export const updateCategorie = async (form: Categorie) =>
  axios.put(`${Url_api}/categories/${form.id}`, form);

export const insertCategorie = async (form: Categorie) =>
  axios.post(`${Url_api}/categories`, form);
