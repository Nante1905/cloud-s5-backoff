import React, { useEffect, useState } from "react";
import { Marque } from "../../../shared/types/Marque";

import { findAllMarque } from "../../../service/marque.service";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../store/pagination/selector";
import { useDispatch, useSelector } from "react-redux";
import MarqueListComponent from "../components/marque-list.components";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../shared/title/title.component";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
interface MarqueListRootState {
  marques: Marque[];
  loading: boolean;
  errorMessage: string;
  openError: boolean;
}

const initialState: MarqueListRootState = {
  marques: [],
  loading: true,
  errorMessage: "",
  openError: false,
};

const MarqueListRoot = () => {
  document.title = "Marques";

  const [state, setState] = useState<MarqueListRootState>(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    // dispatch(initializeRefresh());

    findAllMarque(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            marques: response.data.items,
            loading: false,
          }));

          dispatch(
            setNumeroEtTotal({
              numero: response.data.nbPage,
              total: response.data.totalPage,
            })
          );
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            openError: true,
            errorMessage: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        console.log("etoo");

        setState((state) => ({
          ...state,
          loading: false,
          openError: true,
          errorMessage: errorMessage,
        }));
      });
  }, [page.numero]);

  return (
    <div className="list-crud">
      <div className="title-form">
        <Title> Liste des marques </Title>
      </div>

      <div className="add-button">
        <Link to="/marques/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <MarqueListComponent marques={state.marques} />
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.openError}
        onClose={() => {
          setState((state) => ({
            ...state,
            openError: false,
          }));
        }}
        error={state.errorMessage}
      />
    </div>
  );
};

export default MarqueListRoot;
