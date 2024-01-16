import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findVitesseById } from "../../../service/vitesse.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { ApiResponse } from "../../../shared/types/Response";
import { Vitesse } from "../../../shared/types/Vitesse";
import VitesseFormComponent from "../components/vitesse-form.component";

interface EditVitesseState {
  vitesse: Vitesse | null;
  error: string;
}

const initialState: EditVitesseState = {
  vitesse: null,
  error: "",
};

const EditVitesseComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<EditVitesseState>(initialState);

  useEffect(() => {
    findVitesseById(Number(id))
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            vitesse: response.data,
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

  document.title = `Modifier l'énergie - ${state.vitesse?.nom}`;

  return (
    <>
      <AppLoaderComponent loading={state.vitesse == null}>
        <>
          <VitesseFormComponent entity={state.vitesse as Vitesse} />;
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

export default EditVitesseComponent;
