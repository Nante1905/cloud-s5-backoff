import { RootState } from "../store";

export const getPagination = (state: RootState) => ({ ...state.paginationState })
