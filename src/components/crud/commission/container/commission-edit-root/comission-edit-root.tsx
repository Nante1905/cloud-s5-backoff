import { useEffect, useState } from "react";
import { Commission } from "../../../../shared/types/Commission";
import CommissionEditFormComponent from "../../components/commission-edit-form/comission-edit-form";
import { findHistoriqueCommission } from "../../service/commission.service";
import "./comission-edit-root.scss";

const CommissionEditRoot = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    findHistoriqueCommission().then((res) => {
      setState((state) => ({
        ...state,
        commission: res.data.data[0],
        historiqueCommission: res.data.data,
      }));
    });
  }, []);

  return (
    <div className="commission-edit-root">
      <CommissionEditFormComponent
        commission={state.commission}
        historiqueCommission={state.historiqueCommission}
      />
    </div>
  );
};

export default CommissionEditRoot;

interface CommissionEditRootState {
  commission?: Commission;
  historiqueCommission: Commission[];
}

const initialState: CommissionEditRootState = {
  commission: undefined,
  historiqueCommission: [],
};
