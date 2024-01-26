
import { http } from '../../shared/service/interceptor/axios.interceptor';

export const TAILLE_PAGE = 5;

export const findAnnonceNonValide = () =>
  http.get(`/annonces/nonValide`);

export const findAnnonceNonValideParPage = (page: number) =>
  http.get(`/annonces/nonValide?page=${page}&taille=${TAILLE_PAGE}`);
