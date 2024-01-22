import { SuggestionMessage } from "../../../shared/types/SuggestionMessage";
import { http } from "../../../shared/service/interceptor/axios.interceptor";

export const insertSuggestionMessage = (suggestionMessage: SuggestionMessage) =>
  http.post(`/suggestion_messages`, suggestionMessage);

export const updateSuggestionMessage = (suggestionMessage: SuggestionMessage) =>
  http.put(`/suggestion_messages/${suggestionMessage.id}`, suggestionMessage);

export const findSuggestionMessageById = (id: string) =>
  http.get(`/suggestion_messages/${id}`);

export const findAllSuggestionMessages = () => http.get(`/suggestion_messages`);

export const deleteSuggestionMessage = (id: string) =>
  http.delete(`/suggestion_messages/${id}`);
