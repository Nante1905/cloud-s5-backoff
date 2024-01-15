import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../store/pagination/selector";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Modele } from "../../../shared/types/Modele";
import { ApiResponse } from "../../../shared/types/Response";
import ModeleListComponent from "../components/modele-list/modele-list.component";
import { findAllModele } from "../service/modele.service";
import "./modele-form-create-root";
import "./modele-list-root.scss";

const ModeleListRoot = () => {
  const [state, setState] = useState(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllModele(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);

        if (response.ok) {
          setState((state) => ({
            ...state,
            modeles: response.data.items,
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
    <div className="modele-list-root">
      <Title>Liste des modeles</Title>
      <div className="modele-add-button">
        <Link to="/modeles/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <ModeleListComponent modeles={state.modeles} />
      </AppLoaderComponent>
    </div>
  );
};

export default ModeleListRoot;

interface ModeleListRootState {
  modeles: Modele[];
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: ModeleListRootState = {
  modeles: [],
  loading: true,
  openError: false,
  errorMessage: "",
};
