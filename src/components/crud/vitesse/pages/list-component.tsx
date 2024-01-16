import { useEffect, useState } from "react";
import { Vitesse } from "../../../shared/types/Vitesse";

import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../store/pagination/selector";
import { findAllVitesse } from "../../../service/vitesse.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { ApiResponse } from "../../../shared/types/Response";
import VitesseListComponent from "../components/vitesse-list.component";

interface VitesseListRootState {
  vitesses: Vitesse[];
  loading: boolean;
  errorMessage: string;
  openError: boolean;
}

const initialState: VitesseListRootState = {
  vitesses: [],
  loading: true,
  errorMessage: "",
  openError: false,
};

const VitesseListRoot = () => {
  document.title = "Boîte de vitesse";

  const [state, setState] = useState<VitesseListRootState>(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllVitesse(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            vitesses: response.data.items,
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
  }, [page]);

  return (
    <div className="list-crud">
      <div className="title-form">
        <Title>Liste des boîtes de vitesse</Title>
      </div>
      <div className="add-button">
        <Link to="/vitesses/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <VitesseListComponent vitesses={state.vitesses} />
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

export default VitesseListRoot;
