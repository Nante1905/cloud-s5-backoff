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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SuggestionMessage } from "../../../../shared/types/SuggestionMessage";

import _ from "lodash";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../../shared/service/api-service";
import { ApiResponse } from "../../../../shared/types/Response";
import { deleteSuggestionMessage } from "../../service/suggestion-message.service";

interface SuggestionListComponentProps {
  suggestions: SuggestionMessage[];
}

interface SuggestionListState {
  id: string;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: SuggestionListState = {
  id: "",
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
};

const SuggestionListComponent = ({
  suggestions,
}: SuggestionListComponentProps) => {
  const [state, setState] = useState<SuggestionListState>(initialState);
  const navigate = useNavigate();

  const onDelete = (id: string) => {
    setState((state) => ({
      ...state,
      id: id,
      submitLoading: true,
    }));

    deleteSuggestionMessage(id)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            success: response.message,
            submitLoading: false,
            openSuccess: true,
          }));
          _.remove(suggestions, (value) => value?.id === id);
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
                <TableCell>Contenu</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestions.map((suggestion) => (
                <TableRow
                  key={suggestion.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{suggestion.contenu}</TableCell>
                  <TableCell className="text-center">
                    <Link to={`/suggestions/edit/${suggestion.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button onClick={() => onDelete(suggestion.id as string)}>
                      <AppLoaderComponent
                        loading={
                          state.id == suggestion.id && state.submitLoading
                        }
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

export default SuggestionListComponent;
