import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EtatFormComponent from "../components/etat-form.components";
import { Etat } from "../../../shared/types/Etat";
import { ApiResponse } from "../../../shared/types/Response";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { findEtatById } from "../../../service/etat.service";

interface EditEtatState {
  etat: Etat | null;
  error: string;
}

const initialState: EditEtatState = {
  etat: null,
  error: "",
};

const EditEtatComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<EditEtatState>(initialState);

  useEffect(() => {
    findEtatById(Number(id))
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

  document.title = `Modifier l'état - ${state.etat?.nom}`;

  return (
    <AppLoaderComponent loading={state.etat == null}>
      <EtatFormComponent entity={state.etat as Etat} />
    </AppLoaderComponent>
  );
};

export default EditEtatComponent;
