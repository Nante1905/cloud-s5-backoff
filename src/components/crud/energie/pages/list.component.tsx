import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  PaginationState,
  setNumeroEtTotal,
} from "../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../store/pagination/selector";
import { findAllEnergie } from "../../../service/energie.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import { ApiResponse } from "../../../shared/types/Response";
import EnergieListComponent from "../components/energie-list.components";

interface EnergieListRootState {
  energies: Energie[];
  loading: boolean;
  openError: boolean;
  errorMessage: string;
}

const initialState: EnergieListRootState = {
  energies: [],
  loading: true,
  openError: false,
  errorMessage: "",
};

const EnergieListComponentRoot = () => {
  document.title = "Energies";

  const [state, setState] = useState<EnergieListRootState>(initialState);
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    findAllEnergie(page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);

        if (response.ok) {
          setState((state) => ({
            ...state,
            energies: response.data.items,
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
        <Title> Liste des energies </Title>
      </div>
      <div className="add-button">
        <Link to="/energies/add">
          <Button variant="contained">
            <i className="fas fa-plus"></i>
          </Button>
        </Link>
      </div>
      <AppLoaderComponent loading={state.loading}>
        <EnergieListComponent energies={state.energies} />
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

export default EnergieListComponentRoot;
