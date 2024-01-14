import { configureStore } from "@reduxjs/toolkit";
import { PaginationSlice } from "./pagination/PaginationSlice";


export const store = configureStore({
  reducer: {
    paginationState: PaginationSlice.reducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
