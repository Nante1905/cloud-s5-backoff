import { Button, TextField } from "@mui/material";

import { FormEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertVitesse, updateVitesse } from "../../../service/vitesse.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { ApiResponse } from "../../../shared/types/Response";
import { Vitesse } from "../../../shared/types/Vitesse";

interface VitesseFormProps {
  entity?: Vitesse;
}

const VitesseFormComponent = (props: VitesseFormProps) => {
  const vitesse = props.entity;
  const [state, setState] = useState<VitesseFormState>(initialState);

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Vitesse),
        },
      }));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((state) => ({
      ...state,
      submitLoading: true,
    }));

    if (state.form.id) {
      updateVitesse(state.form)
        .then((res) => {
          const response: ApiResponse = res.data;
          if (response.ok) {
            setState((state) => ({
              ...state,
              success: response.message,
              submitLoading: false,
              openSuccess: true,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              submitLoading: false,
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
            error: errorMessage,
            submitLoading: false,
            openError: true,
          }));
        });
    } else {
      insertVitesse(state.form)
        .then((res) => {
          const response: ApiResponse = res.data;

          if (response.ok) {
            setState((state) => ({
              ...state,
              success: response.message,
              submitLoading: false,
              openSuccess: true,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              submitLoading: false,
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
            error: errorMessage,
            submitLoading: false,
            openError: true,
          }));
        });
    }
  };

  return (
    <>
      <div className="form-temp couleur-form">
        <div className="container-form">
          <Link to="/vitesses">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>{vitesse ? "Modifier vitesse" : "Créer vitesse"}</Title>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <TextField
                label="Nom"
                onChange={(event) =>
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      nom: event.target.value as string,
                    },
                  }))
                }
                value={state.form.nom}
              />

              <Button variant="contained" type="submit">
                <AppLoaderComponent loading={state.submitLoading}>
                  <span>{vitesse ? "Modifier" : "Créer"}</span>
                </AppLoaderComponent>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.error}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() =>
          setState(() => ({
            ...state,
            openSuccess: false,
          }))
        }
        message={state.success}
      />
    </>
  );
};

interface VitesseFormState {
  form: Vitesse;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: VitesseFormState = {
  form: {
    nom: "",
  },
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

export default VitesseFormComponent;
