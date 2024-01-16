// apiService.js
import axios from "axios";
import { Marque } from "../shared/types/Marque";
import { Url_api } from "../shared/constants/global";
import { PaginationState } from "../../store/pagination/PaginationSlice";
import { Utilisateur } from "../shared/types/Utilisateur";

export const connexion = async (form: Utilisateur) =>
  axios.post(`${Url_api}/auth/login`, form);

  export const inscription = async (form: Utilisateur) =>
  axios.post(`${Url_api}/marques`, form);