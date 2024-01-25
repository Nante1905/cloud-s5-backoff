
import { StatRequest, StatRequestAnnee, TopUserRequest } from "../types/stats.type";
import { Url_api } from "../../shared/constants/global";
import { http } from "../../shared/service/interceptor/axios.interceptor";


export const getStatGenerale = (req: StatRequest) => http.post(`${Url_api}/stats/general`, req);
export const getStatBenefice = (req: StatRequest) => http.post(`${Url_api}/stats/benefice`, req);
export const getStatInscription = (req: StatRequestAnnee) => http.post(`${Url_api}/stats/users`, req);
export const getTopSellers = (req: TopUserRequest) => http.post(`${Url_api}/stats/topSellers`, req);
