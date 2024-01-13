import { useEffect, useState } from "react";
import { findAllCategorie } from "../../../service/categorie.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Categorie } from "../../../shared/types/Categorie";
import CategorieListComponent from "../components/categorie-list.components";

const CategorieListComponentRoot = () => {
  document.title = "Categories";

  const [state, setState] = useState(initialState);

  useEffect(() => {
    findAllCategorie()
      .then((res) => {
        setState((state) => ({
          ...state,
          categories: res.data.data,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AppLoaderComponent loading={state.loading}>
        <CategorieListComponent categories={state.categories} />
      </AppLoaderComponent>
    </div>
  );
};

export default CategorieListComponentRoot;

interface CategorieListRootState {
  categories: Categorie[];
  loading: boolean;
}

const initialState: CategorieListRootState = {
  categories: [],
  loading: true,
};
