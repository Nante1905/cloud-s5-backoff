import { Url_api } from "../../shared/constants/global";
import { http } from '../../shared/service/interceptor/axios.interceptor';

export const TAILLE_PAGE = 5;

export const findAnnonceNonValide = () =>
  http.get(`${Url_api}/annonces/nonValide`);

export const findAnnonceNonValideParPage = (page: number) =>
  http.get(`${Url_api}/annonces/nonValide?page=${page}&taille=${TAILLE_PAGE}`);
