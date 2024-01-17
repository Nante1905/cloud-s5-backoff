import { useEffect, useState } from "react";
import { findAllCategorie } from "../../../service/categorie.service";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { Categorie } from "../../../shared/types/Categorie";
import CategorieListComponent from "../components/categorie-list.components";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPagination } from "../../../../store/selector";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import { Button } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Link } from "react-router-dom";

const CategorieListComponentRoot = () => {
  document.title = "Categories";

  const [state, setState] = useState(initialState);
  const page: PaginationState = or(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllCategorie(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);

        if (response.ok) {
          setState((state) => ({
            ...state,
            categories: response.data.items,
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
            openError: true,
            errorMessage: response.err,
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
          openError: true,
          errorMessage: errorMessage,
        }));
      });
  }, [page]);

  return (
    <div className="list-crud">
      <div className="title-form">
        <Title> Liste des categories </Title>
      </div>
      <div className="add-button">
        <Link to="/categories/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <CategorieListComponent categories={state.categories} />
      </AppLoaderComponent>
      <ErrorSnackBar
        open={state.openError}
        onClose={() => {
          setState((state) => ({
            ...state,
            openError: false,
          }));
        }}
        error={state.errorMessage}
      />
    </div>
  );
};

export default CategorieListComponentRoot;

interface CategorieListRootState {
  categories: Categorie[];
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: CategorieListRootState = {
  categories: [],
  loading: true,
  openError: false,
  errorMessage: "",
};
