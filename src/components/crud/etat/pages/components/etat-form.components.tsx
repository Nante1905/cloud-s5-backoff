import React, { FormEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Etat } from "../../../shared/types/Etat";
import "../../../../assets/fontawesome-5/css/all.min.css";
import "./etat-form.component.css";
import "./etat-form.component.scss";
import { Link } from "react-router-dom";
import { insertEtat, updateEtat } from "../../../service/etat.service";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";

interface EtatFormProps {
  entity?: Etat;
}

const EtatFormComponent = (props: EtatFormProps) => {
  const etat = props.entity;
  const [state, setState] = useState<EtatFormState>(initialState);

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Etat),
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
      updateEtat(state.form)
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
      insertEtat(state.form)
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
          <Link to="/etats">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>{etat ? "Modifier etat" : "Créer etat"}</Title>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <TextField
                label="Nom"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      nom: event.target.value,
                    },
                  }));
                }}
                value={state.form.nom}
              />
              <TextField
                label="valeur"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      valeur: Number(event.target.value),
                    },
                  }));
                }}
                value={state.form.valeur}
              />

              <Button variant="contained" type="submit">
                <AppLoaderComponent loading={state.submitLoading}>
                  <span>{etat ? "Modifier" : "Créer"}</span>
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

interface EtatFormState {
  form: Etat;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: EtatFormState = {
  form: {
    nom: "",
    valeur: 0,
  },
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

export default EtatFormComponent;
