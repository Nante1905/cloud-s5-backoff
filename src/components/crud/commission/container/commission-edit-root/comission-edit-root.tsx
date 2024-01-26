import { useEffect, useState } from "react";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import Title from "../../../../shared/title/title.component";
import { Commission } from "../../../../shared/types/Commission";
import CommissionEditFormComponent from "../../components/commission-edit-form/comission-edit-form";
import { findHistoriqueCommission } from "../../service/commission.service";
import "./comission-edit-root.scss";

const CommissionEditRoot = () => {
  document.title = "Commission";
  const [state, setState] = useState(initialState);

  useEffect(() => {
    findHistoriqueCommission()
      .then((res) => {
        setState((state) => ({
          ...state,
          commission: res.data.data[0],
          historiqueCommission: res.data.data,
          historiqueLoading: false,
        }));
      })

      .catch((err) => {
        setState((state) => ({
          ...state,
          histiriqueError: err.response.data.message,
          historiqueLoading: false,
        }));
      });
  }, []);

  return (
    <div className="commission-edit-root">
      <Title>Commission</Title>
      <div className="commission-edit-root_form">
        <CommissionEditFormComponent
          commission={state.commission}
          historiqueCommission={state.historiqueCommission}
          loading={state.historiqueLoading}
        />
      </div>
      <ErrorSnackBar
        error={state.historiqueError}
        open={state.historiqueError !== ""}
        onClose={() => {
          setState((state) => ({
            ...state,
            historiqueError: "",
          }));
        }}
      />
    </div>
  );
};

export default CommissionEditRoot;

interface CommissionEditRootState {
  commission?: Commission;
  historiqueCommission: Commission[];
  historiqueLoading: boolean;
  historiqueError: string;
  historiqueSuccess: string;
}

const initialState: CommissionEditRootState = {
  commission: undefined,
  historiqueCommission: [],
  historiqueLoading: true,
  historiqueError: "",
  historiqueSuccess: "",
};
