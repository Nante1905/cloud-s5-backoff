import axios from "axios";
import { Url_api } from "../../shared/constants/global";

export const findAnnonceNonValide = () =>
  axios.get(`${Url_api}/annonces/nonValide`);
