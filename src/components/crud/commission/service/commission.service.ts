import axios from "axios";
import { Url_api } from "../../../shared/constants/global";
import { Commission } from "../../../shared/types/Commission";

export const findHistoriqueCommission = () =>
  axios.get(`${Url_api}/commissions/historiques`);

export const updateCommission = (commission: Commission) =>
  axios.post(`${Url_api}/commissions`, commission);
