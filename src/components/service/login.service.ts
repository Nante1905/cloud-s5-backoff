// apiService.js
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Url_api } from "../shared/constants/global";
import { Auth, Utilisateur } from "../shared/types/Utilisateur";

export const connexion = async (form: Auth) =>
  http.post(`/auth/login-bo`, form);

