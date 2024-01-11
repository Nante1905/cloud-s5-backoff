import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Couleur } from "../../../shared/types/Couleur";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./couleur-form.component.css";
import "./couleur-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';
import { insertCouleur, updateCouleur } from "../../../service/couleur.service";

interface CouleurFormProps {
  entity?: Couleur;
}

const CouleurFormComponent = (props: CouleurFormProps) => {
  const [state, setState] = useState<CouleurFormState>(initialState);
  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Couleur),
        },
      }));
    }
  }, [props.entity]);

  const handleSubmit = async () => {
    console.log("ny alefa : ");
    console.log( state );
    try {
      if (state.form.id) {
        await updateCouleur(state.form);
        console.log("Mise à jour effectuée avec succès!");
        setState((state) => ({ ...state, success: "Modifié avec succès !", error: null }));
      } else {
        await insertCouleur(state.form);
        console.log("Insertion effectuée avec succès!");
        setState((state) => ({ ...state, success: "Insertion effectuée avec succès !", error: null }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setState((state) => ({ ...state, error: "Une erreur s'est produite", success: null }));
    }
  };

  const couleur = props.entity;

  return (
    <div className="form-temp couleur-form">
      <div className="container-form" > 
      <Link to="/couleurs">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>        <div className="title-form" > 
          <Title >{couleur ? "Modifier couleur" : "Créer couleur"}</Title>
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
          type="color"
            label="Valeur hexadécimale"
            onChange={(event) =>
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  hexa: event.target.value as string,
                },
              }))
            }
            value={state.form.hexa}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {couleur ? "Modifier" : "Créer"}
          </Button>
        </div>
        </div>
    </div>
  );
};

interface CouleurFormState {
  form: Couleur;
}

const initialState: CouleurFormState = {
  form: {
    nom: "",
    hexa: "",
  },
  success: null,
  error: null,
};

export default CouleurFormComponent;
