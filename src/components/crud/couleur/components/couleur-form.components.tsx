import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertCouleur, updateCouleur } from "../../../service/couleur.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Couleur } from "../../../shared/types/Couleur";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface CouleurFormProps {
  entity?: Couleur;
}

const CouleurFormComponent = (props: CouleurFormProps) => {
  const [state, setState] = useState<CouleurFormState>(initialState);
  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Couleur),
        },
      }));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      submitLoading: true,
    }));

    if (state.form.id) {
      updateCouleur(state.form)
        .then((res) => {
          setState((state) => ({
            ...state,
            success: res.data.message,
            submitLoading: false,
          }));
        })
        .catch((err) => {
          setState((state) => ({
            ...state,
            error: err?.response?.data.err
              ? err?.response?.data.err
              : "Une erreur s'est produite.",
            submitLoading: false,
          }));
        });
    } else {
      insertCouleur(state.form)
        .then((res) => {
          console.log(res);

          setState((state) => ({
            ...state,
            success: res.data.message,
            submitLoading: false,
          }));
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
    }
  };

  const couleur = props.entity;

  return (
    <div className="form-temp couleur-form">
      <div className="container-form">
        <Link to="/couleurs">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>{" "}
        <div className="title-form">
          <Title>{couleur ? "Modifier couleur" : "Ajouter une couleur"}</Title>
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
            <TextField
              type="color"
              label=""
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    hexa: event.target.value as string,
                  },
                }))
              }
              value={state.form.hexa}
            />
            <AppLoaderComponent loading={state.submitLoading}>
              <Button variant="contained" type="submit">
                <>{state.form.id ? "Modifier" : "Créer"}</>
              </Button>
            </AppLoaderComponent>
          </div>
        </form>
      </div>

      <Snackbar open={state.error !== null}>
        <Alert severity="error">{state.error as string}</Alert>
      </Snackbar>
      <Snackbar open={state.success !== null}>
        <Alert severity="success">{state.success as string}</Alert>
      </Snackbar>
    </div>
  );
};

interface CouleurFormState {
  form: Couleur;
  success: string | null;
  error: string | null;
  submitLoading: boolean;
}

const initialState: CouleurFormState = {
  form: {
    nom: "",
    hexa: "",
  },
  success: null,
  error: null,
  submitLoading: false,
};

export default CouleurFormComponent;
