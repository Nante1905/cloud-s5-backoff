import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnergieFormComponent from "../components/energie-form.components";
import { Energie } from "../../../shared/types/Energie";
import { findEnergieById } from "../../../service/energie.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { ApiResponse } from "../../../shared/types/Response";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";

interface EditEnergieState {
  energie: Energie | null;
  error: string;
}

const initialState: EditEnergieState = {
  energie: null,
  error: "",
};

const EditEnergieComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<EditEnergieState>(initialState);

  useEffect(() => {
    findEnergieById(Number(id))
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

  document.title = `Modifier l'énergie - ${state.energie?.nom}`;

  return (
    <>
      <AppLoaderComponent loading={state.energie == null}>
        <>
          <EnergieFormComponent entity={state.energie as Energie} />;
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

export default EditEnergieComponent;
