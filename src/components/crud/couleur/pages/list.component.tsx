import { useEffect, useState } from "react";
import { findAllCouleur } from "../../../service/couleur.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Couleur } from "../../../shared/types/Couleur";
import CouleurListComponent from "../components/couleur-list.components";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPagination } from "../../../../store/pagination/selector";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import { Button } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Link } from "react-router-dom";

const CategorieListComponentRoot = () => {
  document.title = "Couleurs";

  const [state, setState] = useState(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllCouleur(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);
        if (response.ok) {
          setState((state) => ({
            ...state,
            couleurs: response.data.items,
            loading: false,
          }));

          dispatch(
            setNumeroEtTotal({
              numero: response.data.nbPage,
              total: response.data.totalPage,
            })
          );
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            error: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }

        setState((state) => ({
          ...state,
          loading: false,
          error: errorMessage,
        }));
      });
  }, [page]);

  return (
    <div className="list-couleur">
      <div className="title-form">
        <Title> Liste des couleurs </Title>
      </div>
      <div className="add-button">
        <Link to="/couleurs/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
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
