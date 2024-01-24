import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../../shared/service/api-service";
import Title from "../../../../shared/title/title.component";
import { ApiResponse } from "../../../../shared/types/Response";
import { SuggestionMessage } from "../../../../shared/types/SuggestionMessage";
import SuggestionListComponent from "../../components/list/suggestion-message-list";
import { findAllSuggestionMessages } from "../../service/suggestion-message.service";

interface SuggestionListRootState {
  suggestions: SuggestionMessage[];
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: SuggestionListRootState = {
  suggestions: [],
  loading: true,
  openError: false,
  errorMessage: "",
};

const SuggestionListRoot = () => {
  document.title = "Suggestions";

  const [state, setState] = useState<SuggestionListRootState>(initialState);

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllSuggestionMessages()
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(res);

        if (response.ok) {
          setState((state) => ({
            ...state,
            suggestions: response.data,
            loading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            openError: true,
            errorMessage: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }

        setState((state) => ({
          ...state,
          loading: false,
          openError: true,
          errorMessage: errorMessage,
        }));
      });
  }, []);

  return (
    <div className="list-crud">
      <div className="title-form">
        <Title> Liste des suggestions </Title>
      </div>
      <div className="add-button">
        <Link to="/suggestions/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <SuggestionListComponent suggestions={state.suggestions} />
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.openError}
        onClose={() => {
          setState((state) => ({
            ...state,
            openError: false,
          }));
        }}
        error={state.errorMessage}
      />
    </div>
  );
};

export default SuggestionListRoot;
