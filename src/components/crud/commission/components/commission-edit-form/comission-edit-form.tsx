import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { Commission } from "../../../../shared/types/Commission";
import { updateCommission } from "../../service/commission.service";
import "./comission-edit-form.scss";

interface CommissionEditFormComponentProps {
  commission?: Commission;
  historiqueCommission: Commission[];
  loading?: boolean;
}

const CommissionEditFormComponent = (
  props: CommissionEditFormComponentProps
) => {
  const [state, setState] = useState(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      updateLoading: true,
    }));

    const newCommission: Commission = {
      pourcentage: state.newValue,
    };

    updateCommission(newCommission)
      .then((res) => {
        setState((state) => ({
          ...state,
          updateLoading: false,
          updateSuccess: res.data?.message,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          updateLoading: false,
          updateError: err.response?.data?.err,
        }));
      });
  };

  return (
    <div className="commission-edit-form">
      <div className="form">
        <h3>Valeur actuelle</h3>
        <AppLoaderComponent loading={props?.loading as boolean}>
          <p className="valeur">{props.commission?.pourcentage} %</p>
        </AppLoaderComponent>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nouvelle valeur"
            onChange={(event) => {
              setState((state) => ({
                ...state,
                newValue: Number(event.target.value),
              }));
            }}
          />
          <Button type="submit" variant="contained">
            <AppLoaderComponent
              loading={state.updateLoading}
              width="25px"
              heigth="25px"
              color="white"
            >
              <>Mettre à jour</>
            </AppLoaderComponent>
          </Button>
        </form>
      </div>
      <div className="historique">
        <h3>Historique de mis à jour commission</h3>
        <AppLoaderComponent loading={props?.loading as boolean}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date de modification</TableCell>
                <TableCell>Pourcentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.historiqueCommission?.map((commission, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(
                      commission.dateAjout as string
                    ).toLocaleDateString() +
                      " " +
                      new Date(
                        commission?.dateAjout as string
                      ).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{commission.pourcentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AppLoaderComponent>
      </div>
      <ErrorSnackBar
        open={state.updateError !== ""}
        error={state.updateError}
        onClose={() => {
          setState((state) => ({
            ...state,
            updateError: "",
          }));
        }}
      />
      <SuccessSnackBar
        open={state.updateSuccess !== ""}
        message={state.updateSuccess}
        onClose={() => {
          setState((state) => ({
            ...state,
            updateSuccess: "",
          }));
        }}
      />
    </div>
  );
};

export default CommissionEditFormComponent;

interface CommissionEditFormComponentState {
  newValue: number;
  updateLoading: boolean;
  updateError: string;
  updateSuccess: string;
}

const initialState: CommissionEditFormComponentState = {
  newValue: 0,
  updateLoading: false,
  updateError: "",
  updateSuccess: "",
};
