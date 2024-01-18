import axios from "axios";
import { Dayjs } from "dayjs";
import { StatRequest, StatRequestAnnee, TopUserRequest } from "../types/stats.type";
import { Url_api } from "../../shared/constants/global";
export const getStatGenerale = (monthYear: Dayjs) => {};
export const getStatBenefice = (req: StatRequest)=> axios.post(`${Url_api}/stats/benefice`, req);
export const getStatInscription = (req: StatRequestAnnee)=>axios.post(`${Url_api}/stats/users`,req);
export const getTopSellers = (req: TopUserRequest)=>axios.post(`${Url_api}/stats/topSellers`,req);