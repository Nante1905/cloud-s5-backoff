import { useEffect, useState } from "react";
import { findAllCouleur } from "../../../service/couleur.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Couleur } from "../../../shared/types/Couleur";
import CouleurListComponent from "../components/couleur-list.components";

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
        }));
      });
  }, []);

  return (
    <div>
      <AppLoaderComponent loading={state.loading}>
        <CouleurListComponent couleurs={state.couleurs} />
      </AppLoaderComponent>
    </div>
  );
};

export default CategorieListComponentRoot;

interface CouleurListRootState {
  couleurs: Couleur[];
  loading: boolean;
}

// initial state
const initialState: CouleurListRootState = {
  couleurs: [],
  loading: true,
};
