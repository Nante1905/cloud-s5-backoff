import { useEffect, useState } from "react";


import { Etat } from "../../../shared/types/Etat";
import EtatListComponent from "../components/etat-list.components";
import { findAllEtat } from "../../../service/etat.service";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";

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

  useEffect(() => {
    findAllEtat()
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            etats: response.data,
            loading: false,
          }));
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
          !err.response.data.err ||
          err.response.data.err == "" ||
          err.response.data.err == null
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

  }, []);

  return (
    <div>
      <AppLoaderComponent loading={state.loading}>
        <EtatListComponent etats={state.etats} />
      </AppLoaderComponent>
    </div>
  );
};

export default EtatListComponentRoot;
