import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/fontawesome-5/css/all.min.css";
import { connexion } from "../../service/login.service";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import { Utilisateur } from "../../shared/types/Utilisateur";
import "./login-form.component.scss";

const LoginFormComponent = () => {
  const [state, setState] = useState<UtilisateurFormState>(initialState);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      submitLoading: true,
    }));
    connexion(state.form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data);
        setState((state) => ({
          ...state,
          success: res.data.message,
          submitLoading: false,
        }));
        navigate("/dashboard");
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
      <div className="background-clip-path"></div>
      <div className="content">
        <div className="logo-img">
          <img src="/logo-transparent.png" alt="" width={"600px"} />
        </div>
        <div className="container-form">
          <div className="title-form">
            <Title>{"Login Admin"}</Title>
          </div>
          <form onSubmit={handleSubmit}>
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
              <Button variant="contained" type="submit">
                <AppLoaderComponent
                  loading={state.submitLoading}
                  width="25px"
                  heigth="25px"
                  color="white"
                >
                  <>{"Se connecter"}</>
                </AppLoaderComponent>
              </Button>
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
    </div>
  );
};

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
    email: "yoanrazafinjaka@gmail.com",
    adresse: "",
    dateInscription: "",
    password: "ralph",
  },
  success: null,
  error: null,
  submitLoading: false,
};

export default LoginFormComponent;
