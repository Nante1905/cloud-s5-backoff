import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { ApiResponse } from "../../../../shared/types/Response";
import { SuggestionMessage } from "../../../../shared/types/SuggestionMessage";
import SuggestionMessageComponentForm from "../../components/form/suggestion-message-form";
import { findSuggestionMessageById } from "../../service/suggestion-message.service";

const EditSuggestionMessageRoot = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<EditSuggestionMessageState>(initialState);

  useEffect(() => {
    findSuggestionMessageById(id as string)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            suggestion: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            error: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);

        setState((state) => ({
          ...state,
          error: err?.response?.data.message
            ? err?.response?.data.message
            : "Une erreur s'est produite.",
        }));
      });
  }, [id]);

  document.title = `Modifier suggestion message`;

  return (
    <>
      <AppLoaderComponent loading={state.suggestion == null}>
        <>
          <SuggestionMessageComponentForm
            suggestion={state.suggestion as SuggestionMessage}
          />
          ;
        </>
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.error !== ""}
        onClose={() => {
          setState((state) => ({
            ...state,
            error: "",
          }));
        }}
        error={state.error}
      />
    </>
  );
};

export default EditSuggestionMessageRoot;

interface EditSuggestionMessageState {
  suggestion: SuggestionMessage | null;
  error: string;
}

const initialState: EditSuggestionMessageState = {
  suggestion: null,
  error: "",
};
