import { Alert, Button, Snackbar, TextField } from "@mui/material";

import { FormEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import {
  insertCategorie,
  updateCategorie,
} from "../../../service/categorie.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Categorie } from "../../../shared/types/Categorie";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface CategorieFormProps {
  entity?: Categorie;
}

const CategorieFormComponent = (props: CategorieFormProps) => {
  const [state, setState] = useState<CategorieFormState>(initialState);

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Categorie),
        },
      }));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("ny alefa : ");
    console.log(state);

    setState((state) => ({
      ...state,
      submitLoading: true,
    }));

    if (state.form.id) {
      updateCategorie(state.form)
        .then((res) => {
          setState((state) => ({
            ...state,
            success: res.data.message,
            error: null,
            submitLoading: false,
          }));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);

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
      insertCategorie(state.form)
        .then((res) => {
          setState((state) => ({
            ...state,
            success: res.data.message,
            error: null,
            submitLoading: false,
          }));
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
            submitLoading: false,
            error: errorMessage,
          }));
        });
    }
  };

  return (
    <>
      <div className="form-temp couleur-form">
        <div className="container-form">
          <Link to="/categories">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>
              {state.form.id ? "Modifier categorie" : "Créer categorie"}
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
              <AppLoaderComponent loading={state.submitLoading}>
                <Button variant="contained" type="submit">
                  <>{state.form.id ? "Modifier" : "Créer"}</>
                </Button>
              </AppLoaderComponent>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={state.error !== null}>
        <Alert severity="error">{state.error as string}</Alert>
      </Snackbar>
      <Snackbar open={state.success !== null}>
        <Alert severity="success">{state.success as string}</Alert>
      </Snackbar>
    </>
  );
};

interface CategorieFormState {
  form: Categorie;
  success: string | null;
  error: string | null;
  submitLoading: boolean;
}

const initialState: CategorieFormState = {
  form: {
    nom: "",
  },
  success: null,
  error: null,
  submitLoading: false,
};

export default CategorieFormComponent;
