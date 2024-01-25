import { Url_api } from "../../../shared/constants/global";
import { Commission } from "../../../shared/types/Commission";
import { http } from '../../../shared/service/interceptor/axios.interceptor';

export const findHistoriqueCommission = () =>
  http.get(`${Url_api}/commissions/historiques`);

export const updateCommission = (commission: Commission) =>
  http.post(`${Url_api}/commissions`, commission);
