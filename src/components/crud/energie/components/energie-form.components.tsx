import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Energie } from "../../../shared/types/Energie";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./couleur-form.component.css";
import "./couleur-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';

interface EnergieFormProps {
  entity?: Energie;
}

const EnergieFormComponent = (props: EnergieFormProps) => {
  const [state, setState] = useState<EnergieFormState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      const method_name = energie ? "PUT" : "POST";
      const response = await fetch(Url_api + "energies", {
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

  const energie = props.entity;

  return (
    <div className="form-temp energie-form">
      <div className="container-form" > 
      <Link to="/energies">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>        <div className="title-form" > 
          <Title >{energie ? "Modifier energie" : "Créer energie"}</Title>
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
    nom: ""
  },
};

export default EnergieFormComponent;
