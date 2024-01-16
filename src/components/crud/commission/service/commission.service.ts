import axios from "axios";
import { Url_api } from "../../../shared/constants/global";

export const findHistoriqueCommission = () =>
  axios.get(`${Url_api}/commissions/historiques`);
