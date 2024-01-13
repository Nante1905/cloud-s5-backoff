// apiService.js
import axios from "axios";
import { Etat } from "../shared/types/Etat";
import { Url_api } from "../shared/constants/global";

export const findAllEtat = () => axios.get(`${Url_api}/etats`);

export const findEtatById = (id: number) => axios.get(`${Url_api}/etats/${id}`);

export const updateEtat = async (form: Etat) =>
  axios.put(`${Url_api}/etats/${form.id}`, form);

export const insertEtat = async (form: Etat) =>
  axios.post(`${Url_api}/etats`, form);
