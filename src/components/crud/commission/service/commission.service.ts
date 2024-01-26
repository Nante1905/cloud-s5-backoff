
import { Commission } from "../../../shared/types/Commission";
import { http } from '../../../shared/service/interceptor/axios.interceptor';

export const findHistoriqueCommission = () =>
  http.get(`/commissions/historiques`);

export const updateCommission = (commission: Commission) =>
  http.post(`/commissions`, commission);
