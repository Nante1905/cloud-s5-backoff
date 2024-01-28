/* eslint-disable @typescript-eslint/no-unused-vars */
// CouleurListComponent.tsx

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Button } from "@mui/material";
import { GridDeleteForeverIcon } from "@mui/x-data-grid";
import _ from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { deleteCouleur } from "../../../service/couleur.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import { Couleur } from "../../../shared/types/Couleur";
import { ApiResponse } from "../../../shared/types/Response";
import "./couleur-list.component.scss";
import "./couleur-list.components.css";

interface CouleurListComponentProps {
  couleurs: Couleur[];
}

interface CouleurListState {
  id: number;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: CouleurListState = {
  id: 0,
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

const CouleurListComponent = (props: CouleurListComponentProps) => {
  const [state, setState] = useState<CouleurListState>(initialState);
  const navigate = useNavigate();

  const onDelete = (id: number) => {
    setState((state) => ({
      ...state,
      id: id,
      submitLoading: true,
    }));

    deleteCouleur(id)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(response);

        if (response.ok) {
          setState((state) => ({
            ...state,
            success: response.message,
            submitLoading: false,
            openSuccess: true,
          }));
          _.remove(props.couleurs, (value) => value?.id === id);
        } else {
          setState((state) => ({
            ...state,
            error: response.err,
            submitLoading: false,
            openError: true,
          }));
        }
      })
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
          submitLoading: false,
          openError: true,
        }));
      });
  };

  return (
    <>
      <div>
        <TableContainer
          style={{ boxShadow: "2px 3px 20px #adaaaa", borderRadius: "10px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Hexadécimal</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.couleurs.map((couleur) => (
                <TableRow
                  key={couleur.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{couleur.nom}</TableCell>
                  <TableCell>
                    <div className="cell_couleur">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: couleur.hexa,
                          border: "1px solid black",
                        }}
                      ></div>
                      {couleur.hexa}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/couleurs/edit/${couleur.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button onClick={() => onDelete(couleur.id as number)}>
                      <AppLoaderComponent
                        loading={state.id == couleur.id && state.submitLoading}
                        width="30px"
                        heigth="30px"
                        color="#c93e3e"
                      >
                        <GridDeleteForeverIcon className="text-danger" />
                      </AppLoaderComponent>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
      </div>
      <CustomPagination />
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.error}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() => navigate(0)}
        message={state.success}
      />
    </>
  );
};

export default CouleurListComponent;
