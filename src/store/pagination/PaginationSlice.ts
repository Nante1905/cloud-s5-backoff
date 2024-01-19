/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export interface PaginationState {
  numero: number;
  nbrParPage: number;
  total: number;
}

const initialState: PaginationState = {
  numero: 1,
  nbrParPage: 5,
  total: 0,
};

export const PaginationSlice = createSlice({
  name: "paginationState",
  initialState,
  reducers: {
    setNumeroPage: (state, action) => {
      state.numero = action.payload;
    },
    setNbrParPage: (state, action) => {
      state.numero = 1;
      state.nbrParPage = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setNumeroEtTotal: (state, action) => {
      (state.numero = action.payload.numero),
        (state.total = action.payload.total);
    },
    initialize: (state) => {
      state = initialState
    },
  },
});

export const {
  setNumeroPage,
  setNbrParPage,
  setTotal,
  setNumeroEtTotal,
  initialize,
} = PaginationSlice.actions;
