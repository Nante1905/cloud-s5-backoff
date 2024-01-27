// EnergieListComponent.tsx

import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GridDeleteForeverIcon } from "@mui/x-data-grid";
import _ from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { deleteEnergie } from "../../../service/energie.service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../shared/service/api-service";
import { Energie } from "../../../shared/types/Energie";
import { ApiResponse } from "../../../shared/types/Response";
import "./couleur-list.components.css";
interface EnergieListComponentProps {
  energies: Energie[];
}

interface EnergieListState {
  id: number;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: EnergieListState = {
  id: 0,
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

const EnergieListComponent = ({ energies }: EnergieListComponentProps) => {
  const [state, setState] = useState<EnergieListState>(initialState);
  const navigate = useNavigate();

  const onDelete = (id: number) => {
    setState((state) => ({
      ...state,
      id: id,
      submitLoading: true,
    }));

    deleteEnergie(id)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            success: response.message,
            submitLoading: false,
            openSuccess: true,
          }));
          _.remove(energies, (value) => value?.id === id);
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
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {energies.map((energie) => (
                <TableRow
                  key={energie.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{energie.nom}</TableCell>
                  <TableCell className="text-center">
                    <Link to={`/energies/edit/${energie.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button onClick={() => onDelete(energie.id as number)}>
                      <AppLoaderComponent
                        loading={state.id == energie.id && state.submitLoading}
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

export default EnergieListComponent;
