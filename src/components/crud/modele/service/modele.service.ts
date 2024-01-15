import axios from "axios";
import { Modele } from "../../../shared/types/Modele";
import { Url_api } from "../../../shared/constants/global";

export const updateModele = (model: Modele) =>
  axios.put(`${Url_api}/modeles/${model.id}`, model);

export const insertModele = (model: Modele) =>
  axios.post(`${Url_api}/modeles`, model);
