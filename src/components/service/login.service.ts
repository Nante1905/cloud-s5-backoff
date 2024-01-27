// apiService.js
import { http } from "../shared/service/interceptor/axios.interceptor";
import { Auth } from "../shared/types/Utilisateur";

export const connexion = async (form: Auth) =>
  http.post(`/auth/login-bo`, form);
