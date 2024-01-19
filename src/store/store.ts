import { configureStore } from "@reduxjs/toolkit";
import { PaginationSlice } from "./pagination/PaginationSlice";
import { AnnoncePageSlice } from "./annonce-page/AnnoncePageSlice";


export const store = configureStore({
  reducer: {
    paginationState: PaginationSlice.reducer,
    annoncePage: AnnoncePageSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
