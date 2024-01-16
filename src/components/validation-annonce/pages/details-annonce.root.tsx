import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorSnackBar from "../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../shared/service/api-service";
import Title from "../../shared/title/title.component";
import { Annonce } from "../../shared/types/Annonce";
import { ApiResponse } from "../../shared/types/Response";
import DetailsAnnonce from "../components/details-annonce.component";
import {
  findAnnonceById,
  refuserAnnonce,
  validerAnnonce,
} from "../service/validation-annonce.service";

interface DetailsAnnonceRootState {
  annonce?: Annonce;
  loadingValider: boolean;
  loadingRefuser: boolean;
  errorMessage: string;
  openError: boolean;
  successMessage: string;
  openSuccess: boolean;
  loading: boolean;
}

const initialState: DetailsAnnonceRootState = {
  loadingValider: false,
  loadingRefuser: false,
  errorMessage: "",
  openError: false,
  successMessage: "",
  openSuccess: false,
  loading: false,
};

const DetailsAnnonceRoot = () => {
  document.title = "Validation annonce";

  const idAnnonce = useParams().id;
  const [state, setState] = useState<DetailsAnnonceRootState>(initialState);

  const onValider = () => {
    setState((state) => ({
      ...state,
      loadingValider: true,
    }));

    validerAnnonce(Number(state?.annonce?.id))
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            openSuccess: true,
            successMessage: response.message,
            loadingValider: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            loadingValider: false,
            errorMessage: response.err,
            openError: true,
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
          loadingValider: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  };

  const onRefuser = () => {
    setState((state) => ({
      ...state,
      loadingRefuser: true,
    }));

    refuserAnnonce(Number(state.annonce?.id))
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            openSuccess: true,
            loadingRefuser: false,
            successMessage: response.message,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: true,
            loadingRefuser: false,
            errorMessage: response.err,
            openError: true,
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
          loadingRefuser: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAnnonceById(Number(idAnnonce))
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            loading: false,
            annonce: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            errorMessage: response.err,
            openError: true,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("code ", err.code);
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
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  }, [idAnnonce]);

  return (
    <>
      <Title>Validation Annonce</Title>
      <AppLoaderComponent loading={state.loading}>
        <>
          {state.annonce && (
            <DetailsAnnonce
              annonce={state.annonce}
              loadingValider={state.loadingValider}
              loadingRefuser={state.loadingRefuser}
              onValider={onValider}
              onRefuser={onRefuser}
            />
          )}
        </>
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.errorMessage}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() =>
          setState(() => ({
            ...state,
            openSuccess: false,
          }))
        }
        message={state.successMessage}
      />
    </>
  );
};

export default DetailsAnnonceRoot;
