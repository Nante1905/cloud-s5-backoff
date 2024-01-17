// apiService.js
import axios from "axios";
import { Url_api } from "../shared/constants/global";
import { Auth, Utilisateur } from "../shared/types/Utilisateur";

export const connexion = async (form: Auth) =>
  axios.post(`${Url_api}/auth/login`, form);

export const inscription = async (form: Utilisateur) =>
  axios.post(`${Url_api}/marques`, form);
