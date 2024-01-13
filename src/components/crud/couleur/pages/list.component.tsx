import { useEffect, useState } from "react";
import { findAllCouleur } from "../../../service/couleur.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Couleur } from "../../../shared/types/Couleur";
import CouleurListComponent from "../components/couleur-list.components";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";

const CategorieListComponentRoot = () => {
  document.title = "Couleurs";

  const [state, setState] = useState(initialState);

  useEffect(() => {
    findAllCouleur()
      .then((res) => {
        setState((state) => ({
          ...state,
          couleurs: res.data.data,
          loading: false,
        }));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        setState((state) => ({
          ...state,
          loading: false,
          error: err?.response?.data.message
            ? err?.response?.data.message
            : "Une erreur s'est produite.",
        }));
      });
  }, []);

  return (
    <div>
      <AppLoaderComponent loading={state.loading}>
        <CouleurListComponent couleurs={state.couleurs} />
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.error != ""}
        onClose={() => {
          state.error == "";
        }}
        error={state.error}
      />
    </div>
  );
};

export default CategorieListComponentRoot;

interface CouleurListRootState {
  couleurs: Couleur[];
  loading: boolean;
  error: string;
}

// initial state
const initialState: CouleurListRootState = {
  couleurs: [],
  loading: true,
  error: "",
};
