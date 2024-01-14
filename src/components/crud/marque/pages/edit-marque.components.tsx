import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarqueFormComponent from "../components/marque-form.components";
import { Marque } from "../../../shared/types/Marque";
import { findMarqueById } from "../../../service/marque.service";
import { ApiResponse } from "../../../shared/types/Response";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";

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
        if (response.ok) {
          setState((state) => ({
            ...state,
            etat: response.data,
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
      <AppLoaderComponent loading={state.marque == null}>
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
