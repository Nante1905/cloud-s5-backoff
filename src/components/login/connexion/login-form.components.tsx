import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/fontawesome-5/css/all.min.css";
import { Utilisateur } from "../../shared/types/Utilisateur";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import "./login-form.component.scss";
import { connexion } from "../../service/login.service";

const LoginFormComponent = () => {
    const [state, setState] = useState<UtilisateurFormState>(initialState);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setState((state) => ({
        ...state,
        submitLoading: true,
      }));
      connexion(state.form)
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
          error: err?.response?.data.message
              ? err?.response?.data.message
              : "Une erreur s'est produite.",
          submitLoading: false,
          }));
      });
    };

return (
    <div className="form-temp login-form">
          <div className="background-clip-path">
        
        </div>
      <div className="container-form">
        <div className="title-form">
          <Title>{"Login"}</Title>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="form">
            <TextField
              label="Email"
              type="email"
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    email: event.target.value as string,
                  },
                }))
              }
              value={state.form.email}
            />
            <TextField
              label="mot de passe"
              type="password"
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    password: event.target.value as string,
                  },
                }))
              }
              value={state.form.password}
            />
            <AppLoaderComponent loading={state.submitLoading}>
              <Button variant="contained" type="submit">
                <>{"Se connecter"}</>
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
}

interface UtilisateurFormState {
    form: Utilisateur;
    success: string | null;
    error: string | null;
    submitLoading: boolean;
  }

  const initialState: UtilisateurFormState = {
    form: {
      nom: "",
      prenom: "",
      email:"yoanrazafinjaka@gmail.com",
      adresse: "",
      dateInscription : "",
      password:"ralph"
    },
    success: null,
    error: null,
    submitLoading: false,
  };

export default LoginFormComponent;