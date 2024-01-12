import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCategorieById } from "../../../service/categorie.service";
import { Categorie } from "../../../shared/types/Categorie";
import CategorieFormComponent from "../components/categorie-form.components";
import { getErrorMessage } from "../../../shared/service/api-service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";

interface EditState {
  categorie: Categorie | null;
  error: string;
}

const initialState: EditState = {
  categorie: null,
  error: "",
};

const EditCategorieComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [state, setState] = useState<EditState>(initialState);

  useEffect(() => {
    findCategorieById(Number(id))
      .then((res) =>
        setState((state) => ({
          ...state,
          categorie: res.data.data,
        }))
      )
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
        }));
      });
  }, [id]);

  document.title = `Modifier  - ${state.categorie?.nom}`;

  return (
    <AppLoaderComponent loading={state.categorie == null}>
      <>
        <CategorieFormComponent entity={state.categorie as Categorie} />;
      </>
    </AppLoaderComponent>
  );
};

export default EditCategorieComponent;
