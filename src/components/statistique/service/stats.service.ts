import axios from "axios";
import { Dayjs } from "dayjs";
import { StatRequest } from "../types/stats.type";
import { Url_api } from "../../shared/constants/global";
export const getStatGenerale = (monthYear: Dayjs) => {};
export const getStatBenefice = (req: StatRequest)=> axios.post(`${Url_api}/stats/benefice`, req);
