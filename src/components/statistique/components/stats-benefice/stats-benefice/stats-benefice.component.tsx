import { useEffect, useState } from "react";

import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import { getErrorMessage } from "../../../../shared/service/api-service";
import { ApiResponse } from "../../../../shared/types/Response";
import { getStatBenefice } from "../../../service/stats.service";
import {
  StatBenefice,
  StatProps,
  StatRequest,
} from "../../../types/stats.type";
import BeneficeParMarque from "../benefice-par-marque/benefice-par-marque.component";

interface StatBeneficeState {
  statBenefice: StatBenefice;
  loading: boolean;
  isLoaded: boolean;
  errorMessage: string;
  openError: boolean;
}
const initialState: StatBeneficeState = {
  statBenefice: {
    benefice: 0,
    beneficeMarque: [],
  },
  loading: true,
  isLoaded: false,
  errorMessage: "",
  openError: false,
};
const StatsBenefice = (props: StatProps) => {
  const [state, setState] = useState<StatBeneficeState>(initialState);
  useEffect(() => {
    const req: StatRequest = {
      mois: props.monthYear.month() + 1,
      annee: props.monthYear.year(),
    };
    getStatBenefice(req)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            statBenefice: response.data,
            loading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            loading: false,
            isLoaded: false,
            errorMessage: response.err,
            openError: true,
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
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
  }, [props.monthYear]);
  return (
    <div>
      <BeneficeParMarque
        loading={state.loading}
        statBenefice={state.statBenefice}
      />
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.errorMessage}
      />
    </div>
  );
};

export default StatsBenefice;
