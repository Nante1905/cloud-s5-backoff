import { Button, TextField } from "@mui/material";

import { FormEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertEnergie, updateEnergie } from "../../../service/energie.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import { ApiResponse } from "../../../shared/types/Response";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface EnergieFormProps {
  entity?: Energie;
}

const EnergieFormComponent = (props: EnergieFormProps) => {
  const energie = props.entity;
  const [state, setState] = useState<EnergieFormState>(initialState);

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Energie),
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
      updateEnergie(state.form)
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
      insertEnergie(state.form)
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
          <Link to="/energies">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>
              {energie ? "Modifier l'énergie" : "Créer une énergie"}
            </Title>
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
                  <span>{energie ? "Modifier" : "Créer"}</span>
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

interface EnergieFormState {
  form: Energie;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: EnergieFormState = {
  form: {
    nom: "",
  },
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

export default EnergieFormComponent;
