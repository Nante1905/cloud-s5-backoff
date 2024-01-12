import { useParams } from "react-router-dom";
import Title from "../../shared/title/title.component";
import DetailsAnnonce from "../components/details-annonce.component";
import { useEffect, useState } from "react";
import axios from "axios";
import { Url_api } from "../../shared/constants/global";
import { ApiResponse } from "../../shared/types/Response";
import { Annonce } from "../../shared/types/Annonce";
import { getErrorMessage } from "../../shared/service/api-service";
import ErrorSnackBar from "../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../shared/components/snackbar/SuccessSnackBar";

interface DetailsAnnonceRootState {
  annonce?: Annonce;
  loading: boolean;
  isLoaded: boolean;
  errorMessage: string;
  openError: boolean;
  successMessage: string;
  openSuccess: boolean;
}

const initialState: DetailsAnnonceRootState = {
  loading: true,
  isLoaded: false,
  errorMessage: "",
  openError: false,
  successMessage: "",
  openSuccess: false,
};

const DetailsAnnonceRoot = () => {
  document.title = "Validation annonce";

  const idAnnonce = useParams().id;
  const [state, setState] = useState<DetailsAnnonceRootState>(initialState);

  const onValider = () => {
    console.log("VALIDATION ANNONCE " + state.annonce?.id);

    axios
      .put(`${Url_api}/annonces/${state.annonce?.id}/valider`)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            openSuccess: true,
            successMessage: response.message,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: true,
            isLoaded: false,
            errorMessage: response.err,
            openError: true,
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
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  };

  const onRefuser = () => {
    console.log("REFUS ANNONCE " + state.annonce?.id);

    axios
      .put(`${Url_api}/annonces/${state.annonce?.id}/refuser`)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            openSuccess: true,
            successMessage: response.message,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: true,
            isLoaded: false,
            errorMessage: response.err,
            openError: true,
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
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  };

  useEffect(() => {
    axios
      .get(`${Url_api}/annonces/${idAnnonce}`)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            loading: false,
            isLoaded: true,
            annonce: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: true,
            isLoaded: false,
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
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  }, [idAnnonce]);
  return (
    <>
      <Title>Validation Annonce</Title>
      {state.annonce && (
        <DetailsAnnonce
          annonce={state.annonce}
          loading={state.loading}
          onValider={onValider}
          onRefuser={onRefuser}
        />
      )}
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
