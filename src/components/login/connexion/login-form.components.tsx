import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "../../../assets/fontawesome-5/css/all.min.css";
import { connexion } from "../../service/login.service";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import { Auth } from "../../shared/types/Utilisateur";
import "./login-form.component.scss";

const LoginFormComponent = () => {
  const [state, setState] = useState<UtilisateurFormState>(initialState);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParam] = useSearchParams();
  const redirect = searchParam.get("redirect");

  let showMessage =
    (location?.state as { showMessage: boolean })?.showMessage || false;

  useEffect(() => {
    setState((state) => ({
      ...state,
      redirectMessage: showMessage,
    }));
  }, []);

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
        console.error(err);
        console.error(err);

        setState((state) => ({
          ...state,
          error: err?.response?.data.err
            ? err?.response?.data.err
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
          <div
            className="title-form"
            style={{
              textAlign: "center",
            }}
          >
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
                label="Mot de passe"
                type={state.viewPassword ? "text" : "password"}
                className={!state.viewPassword ? "bold" : ""}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      // onClick={() => {
                      //   setState((state) => ({
                      //     ...state,
                      //     viewPassword: !state.viewPassword,
                      //   }));
                      // }}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setState((state) => ({
                            ...state,
                            viewPassword: !state.viewPassword,
                          }));
                        }}
                        edge="end"
                      >
                        {state.viewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                      {/* {state.viewPassword ? <VisibilityOff /> : <Visibility />} */}
                    </InputAdornment>
                  ),
                }}
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

      <Snackbar
        open={state.error !== null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{state.error as string}</Alert>
      </Snackbar>
      <Snackbar open={state.success !== null}>
        <Alert severity="success">{state.success as string}</Alert>
      </Snackbar>
      <Snackbar
        open={state.redirectMessage || redirect != undefined}
        onClose={() =>
          setState((state) => ({
            ...state,
            redirectMessage: false,
          }))
        }
        autoHideDuration={3000}
      >
        <Alert severity="error">Veuillez vous connecter pour continuer</Alert>
      </Snackbar>
    </div>
  );
};

interface UtilisateurFormState {
  form: Auth;
  success: string | null;
  error: string | null;
  submitLoading: boolean;
  viewPassword: boolean;
  redirectMessage: boolean;
}

const initialState: UtilisateurFormState = {
  form: {
    email: "yoanrazafinjaka@gmail.com",
    password: "ralph",
  },
  success: null,
  error: null,
  submitLoading: false,
  viewPassword: false,
  redirectMessage: false,
};

export default LoginFormComponent;
