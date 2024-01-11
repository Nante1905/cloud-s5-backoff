import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Etat } from "../../../shared/types/Etat";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./etat-form.component.css";
import "./etat-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';

interface EtatFormProps {
  entity?: Etat;
}

const EtatFormComponent = (props: EtatFormProps) => {
  const [state, setState] = useState<EtatFormState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      const method_name = etat ? "PUT" : "POST";
      const response = await fetch(Url_api + "etats", {
        method: method_name,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.form),
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMessageFromAPI = responseData.err || "Une erreur s'est produite";
        setErrorMessage(errorMessageFromAPI);
        setSuccessMessage(null);
        return;
      }

      setSuccessMessage("Inseré avec succès !");
      setErrorMessage(null);
      console.log("Form submitted successfully!" + response);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Une erreur s'est produite");
      setSuccessMessage(null);
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
        {errorMessage && <div className="success-error-form" style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div className="success-error-form" style={{ color: 'green' }}>{successMessage}</div>}
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
};

export default EtatFormComponent;
