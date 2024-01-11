import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Etat } from "../../../shared/types/Etat";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./etat-form.component.css";
import "./etat-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';
import { insertEtat, updateEtat } from "../../../service/etat.service";

interface EtatFormProps {
  entity?: Etat;
}

const EtatFormComponent = (props: EtatFormProps) => {
  const [state, setState] = useState<EtatFormState>(initialState);
  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Etat),
        },
      }));
    }
  }, [props.entity]);

  const handleSubmit = async () => {
    console.log("ny alefa : ");
    console.log( state );
    try {
      if (state.form.id) {
        await updateEtat(state.form);
        console.log("Mise à jour effectuée avec succès!");
        setState((state) => ({ ...state, success: "Modifié avec succès !", error: null }));
      } else {
        await insertEtat(state.form);
        console.log("Insertion effectuée avec succès!");
        setState((state) => ({ ...state, success: "Insertion effectuée avec succès !", error: null }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setState((state) => ({ ...state, error: "Une erreur s'est produite", success: null }));
    }
  };

  const etat = props.entity;

  return (
    <div className="form-temp etat-form">
      <div className="container-form" > 
      <Link to="/etats">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>        <div className="title-form" > 
          <Title >{etat ? "Modifier etat" : "Créer etat"}</Title>
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
          <TextField
            label="valeur"
            onChange={(event) =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  valeur: event.target.value as string,
                },
              }))
            }
            value={state.form.valeur}
          />
          
          <Button variant="contained" onClick={handleSubmit}>
            {etat ? "Modifier" : "Créer"}
          </Button>
        </div>
        </div>
    </div>
  );
};

interface EtatFormState {
  form: Etat;
}

const initialState: EtatFormState = {
  form: {
    nom: "",
    valeur:0.
  },
  success: null,
  error: null,
};

export default EtatFormComponent;
