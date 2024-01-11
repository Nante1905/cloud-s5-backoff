import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./couleur-form.component.css";
import "./couleur-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';
import { insertEnergie, updateEnergie } from "../../../service/energie.service";

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
  }, [props.entity]);

  const handleSubmit = async () => {
    console.log("ny alefa : ");
    console.log( state );
    try {
      if (state.form.id) {
        await updateEnergie(state.form);
        console.log("Mise à jour effectuée avec succès!");
        setState((state) => ({ ...state, success: "Modifié avec succès !", error: null }));
      } else {
        await insertEnergie(state.form);
        console.log("Insertion effectuée avec succès!");
        setState((state) => ({ ...state, success: "Insertion effectuée avec succès !", error: null }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setState((state) => ({ ...state, error: "Une erreur s'est produite", success: null }));
    }
  };

  const energie = props.entity;

  return (
    <div className="form-temp couleur-form">
      <div className="container-form" > 
      <Link to="/energies">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>        <div className="title-form" > 
          <Title >{energie ? "Modifier energie" : "Créer energie"}</Title>
        </div>
        {state.error && (
          <div className="success-error-form" style={{ color: "red" }}>
            {state.error}
          </div>
        )}
        {state.success && (
          <div className="success-error-form" style={{ color: "green" }}>
            {state.success}
          </div>
        )}
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
    </div>
  );
};

interface EnergieFormState {
  form: Energie;
}

const initialState: EnergieFormState = {
  form: {
    nom: "",
  },
  success: null,
  error: null,
};

export default EnergieFormComponent;
