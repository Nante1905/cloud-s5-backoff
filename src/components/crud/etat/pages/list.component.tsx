import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../store/pagination/selector";
import { findAllEtat } from "../../../service/etat.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Etat } from "../../../shared/types/Etat";
import { ApiResponse } from "../../../shared/types/Response";
import EtatListComponent from "../components/etat-list.components";

interface EtatListRootState {
  etats: Etat[];
  loading: boolean;
  errorMessage: string;
  openError: boolean;
}

const initialState: EtatListRootState = {
  etats: [],
  loading: true,
  errorMessage: "",
  openError: false,
};

const EtatListComponentRoot = () => {
  document.title = "Etats";

  const [state, setState] = useState(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllEtat(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            etats: response.data.items,
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
        <Title>Liste des états</Title>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <EtatListComponent etats={state.etats} />
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

export default EtatListComponentRoot;
