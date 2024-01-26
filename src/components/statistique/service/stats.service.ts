
import { StatRequest, StatRequestAnnee, TopUserRequest } from "../types/stats.type";
import { http } from "../../shared/service/interceptor/axios.interceptor";


export const getStatGenerale = (req: StatRequest) => http.post(`/stats/general`, req);
export const getStatBenefice = (req: StatRequest) => http.post(`/stats/benefice`, req);
export const getStatInscription = (req: StatRequestAnnee) => http.post(`/stats/users`, req);
export const getTopSellers = (req: TopUserRequest) => http.post(`/stats/topSellers`, req);
