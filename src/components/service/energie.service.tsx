// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Energie } from "../shared/types/Energie";

export const findAllEnergie = async () => axios.get(`${Url_api}/energies`);

export const findEnergieById = async (id: number) =>
  axios.get(`${Url_api}/energies/${id}`);

export const updateEnergie = async (form: Energie) =>
  axios.put(`${Url_api}/energies/${form.id}`, form);

export const insertEnergie = async (form: Energie) =>
  axios.post(`${Url_api}/energies`, form);
