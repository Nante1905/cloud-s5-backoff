import { RootState } from "./store";

export const getPagination = (state: RootState) => ({ ...state.paginationState });
export const getAnnoncePage = (state: RootState) => ({ ...state.annoncePage })
