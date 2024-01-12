import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertEnergie, updateEnergie } from "../../../service/energie.service";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";
import { ApiResponse } from "../../../shared/types/Response";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";

interface EnergieFormProps {
  entity?: Energie;
}

const EnergieFormComponent = (props: EnergieFormProps) => {
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
      loading: true,
    }));

    if (state.form.id) {
      updateEnergie(state.form)
        .then((res) => {
          const response: ApiResponse = res.data;
          if (response.ok) {
            setState((state) => ({
              ...state,
              success: response.message,
              loading: false,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              loading: false,
            }));
          }
        })
        .catch((err) => {
          console.error(err);

          setState((state) => ({
            ...state,
            loading: false,
            error: err?.response?.data.message
              ? err?.response?.data.message
              : "Une erreur s'est produite.",
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
              loading: false,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              loading: false,
            }));
          }
        })
        .catch((err) => {
          console.error(err);

          setState((state) => ({
            ...state,
            loading: false,
            error: err?.response?.data.message
              ? err?.response?.data.message
              : "Une erreur s'est produite.",
          }));
        });
    }
  };

  const energie = props.entity;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-temp couleur-form">
          <div className="container-form">
            <Link to="/energies">
              <i className="form-return fas fa-arrow-left"></i>
            </Link>{" "}
            <div className="title-form">
              <Title>{energie ? "Modifier energie" : "Créer energie"}</Title>
            </div>
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

              <AppLoaderComponent loading={state.loading}>
                <Button variant="contained" type="submit">
                  {energie ? "Modifier" : "Créer"}
                </Button>
              </AppLoaderComponent>
            </div>
          </div>
        </div>
      </form>
      <Snackbar open={state.error !== null}>
        <Alert severity="error">{state.error as string}</Alert>
      </Snackbar>
      <Snackbar open={state.success !== null}>
        <Alert severity="success">{state.success as string}</Alert>
      </Snackbar>
    </>
  );
};

interface EnergieFormState {
  form: Energie;
  success: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: EnergieFormState = {
  form: {
    nom: "",
  },
  success: null,
  error: null,
  loading: false,
};

export default EnergieFormComponent;
