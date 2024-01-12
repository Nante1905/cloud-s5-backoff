import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertEnergie, updateEnergie } from "../../../service/energie.service";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface EnergieFormProps {
  entity?: Energie;
}

const EnergieFormComponent = (props: EnergieFormProps) => {
  const [state, setState] = useState<EnergieFormState>(initialState);
  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Energie),
        },
      }));
    }
  }, []);

  const handleSubmit = async () => {
    if (state.form.id) {
      updateEnergie(state.form)
        .then((res) => {
          setState((state) => ({
            ...state,
            success: res.data?.message,
          }));
        })
        .catch((err) => {
          setState((state) => ({
            ...state,
            error: err.response?.data?.message,
          }));
        });
    } else {
      insertEnergie(state.form)
        .then((res) => {
          setState((state) => ({
            ...state,
            success: res.data?.message,
          }));
        })
        .catch((err) => {
          setState((state) => ({
            ...state,
            error: err.response?.data?.message,
          }));
        });
    }
  };

  const energie = props.entity;

  return (
    <div className="form-temp couleur-form">
      <div className="container-form">
        <Link to="/energies">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>{" "}
        <div className="title-form">
          <Title>{energie ? "Modifier energie" : "Créer energie"}</Title>
        </div>
        <div className="form">
          <TextField
            label="Nom"
            onChange={(event) =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  nom: event.target.value as string,
                },
              }))
            }
            value={state.form.nom}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {energie ? "Modifier" : "Créer"}
          </Button>
        </div>
      </div>
      <Snackbar open={state.error !== null}>
        <Alert severity="error">{state.error as string}</Alert>
      </Snackbar>
      <Snackbar open={state.success !== null}>
        <Alert severity="success">{state.success as string}</Alert>
      </Snackbar>
    </div>
  );
};

interface EnergieFormState {
  form: Energie;
  success: string | null;
  error: string | null;
}

const initialState: EnergieFormState = {
  form: {
    nom: "",
  },
  success: null,
  error: null,
};

export default EnergieFormComponent;
