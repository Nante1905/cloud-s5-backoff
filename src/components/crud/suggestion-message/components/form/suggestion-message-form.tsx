import { Button, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../../shared/service/api-service";
import Title from "../../../../shared/title/title.component";
import { ApiResponse } from "../../../../shared/types/Response";
import { SuggestionMessage } from "../../../../shared/types/SuggestionMessage";
import {
  insertSuggestionMessage,
  updateSuggestionMessage,
} from "../../service/suggestion-message.service";

interface SuggestionMessageComponentFormProps {
  suggestion?: SuggestionMessage;
}

const SuggestionMessageComponentForm = (
  props: SuggestionMessageComponentFormProps
) => {
  // const suggestion = props.suggestion;
  const [state, setState] =
    useState<SuggestionMessageComponentFormState>(initialState);

  useEffect(() => {
    if (props.suggestion) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.suggestion as SuggestionMessage),
        },
      }));
    }
  }, [props.suggestion, props.suggestion?.id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((state) => ({
      ...state,
      submitLoading: true,
    }));

    if (state.form.id) {
      updateSuggestionMessage(state.form)
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
      insertSuggestionMessage(state.form)
        .then((res) => {
          console.log(res);
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
          <Link to="/suggestions">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>
              {props.suggestion ? "Modifier suggestion" : "Créer suggestion"}
            </Title>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <TextField
                label="Contenu"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      contenu: event.target.value,
                    },
                  }));
                }}
                value={state.form.contenu}
              />

              <Button variant="contained" type="submit">
                <AppLoaderComponent loading={state.submitLoading}>
                  <span>{props.suggestion ? "Modifier" : "Créer"}</span>
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

export default SuggestionMessageComponentForm;
interface SuggestionMessageComponentFormState {
  form: SuggestionMessage;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: SuggestionMessageComponentFormState = {
  form: {
    contenu: "",
  },
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};
