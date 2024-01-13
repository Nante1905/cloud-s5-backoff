import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCouleurById } from "../../../service/couleur.service";
import { Couleur } from "../../../shared/types/Couleur";
import CouleurFormComponent from "../components/couleur-form.components";
import { ApiResponse } from "../../../shared/types/Response";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";

interface EditCouleurState {
  couleur: Couleur | null;
  error: string;
}

const initialState: EditCouleurState = {
  couleur: null,
  error: "",
};

const EditCouleurComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [state, setState] = useState<EditCouleurState>(initialState);

  useEffect(() => {
    findCouleurById(Number(id))
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            couleur: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            error: response.err,
          }));
        }
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          error: err?.response?.data.message
            ? err?.response?.data.message
            : "Une erreur s'est produite.",
        }));
      });
  }, [id]);

  document.title = `Modifier la couleur - ${state.couleur?.nom}`;
  return (
    <AppLoaderComponent loading={state.couleur == null}>
      <CouleurFormComponent entity={state.couleur as Couleur} />
    </AppLoaderComponent>
  );
};

export default EditCouleurComponent;
