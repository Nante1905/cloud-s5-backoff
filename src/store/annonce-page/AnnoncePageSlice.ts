/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export interface AnnoncePageState {
  page: number;
}

const initialState: AnnoncePageState = {
  page: 1,
};

export const AnnoncePageSlice = createSlice({
  name: "paginationState",
  initialState,
  reducers: {
    addPage: (state) => {
      state.page = state.page + 1;
    },
    init: (state) => {
      state.page = 1;
    },
  },
});

export const { addPage, init } = AnnoncePageSlice.actions;
