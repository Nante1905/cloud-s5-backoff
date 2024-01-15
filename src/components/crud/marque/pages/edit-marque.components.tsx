import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findMarqueById } from "../../../service/marque.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Marque } from "../../../shared/types/Marque";
import { ApiResponse } from "../../../shared/types/Response";
import MarqueFormComponent from "../components/marque-form.components";

interface EditMarqueState {
  marque: Marque | null;
  error: string;
}

const initialState: EditMarqueState = {
  marque: null,
  error: "",
};

const EditMarqueComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<EditMarqueState>(initialState);

  useEffect(() => {
    findMarqueById(Number(id))
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);
        if (response.ok) {
          setState((state) => ({
            ...state,
            marque: response.data,
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

  document.title = `Modifier la marque - ${state.marque?.nom}`;

  return (
    <>
      <AppLoaderComponent loading={state.marque === null}>
        <MarqueFormComponent entity={state.marque as Marque} />
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

export default EditMarqueComponent;
