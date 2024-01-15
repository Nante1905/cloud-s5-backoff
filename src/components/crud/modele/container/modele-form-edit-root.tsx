import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getErrorMessage } from "../../../shared/service/api-service";
import { Modele } from "../../../shared/types/Modele";
import ModeleFormComponent from "../components/modele-form/modele-form.component";
import { findModeleById } from "../service/modele.service";

const ModeleEditRoot = () => {
  const [state, setState] = useState(initialState);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    findModeleById(Number(params.id))
      .then((res) =>
        setState((state) => ({
          ...state,
          modele: res.data.data,
        }))
      )
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
          error: errorMessage,
        }));
      });
  }, [params.id]);

  return (
    <div className="modele-edit-root">
      <ModeleFormComponent entity={state.modele} />
    </div>
  );
};

export default ModeleEditRoot;

interface ModeleEditRootState {
  modele?: Modele;
}

const initialState: ModeleEditRootState = {
  modele: undefined,
};
