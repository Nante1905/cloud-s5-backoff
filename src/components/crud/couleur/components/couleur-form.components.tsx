import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Couleur } from "../../../shared/types/Couleur";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./couleur-form.component.css";
import "./couleur-form.component.scss";
import { Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';

interface CouleurFormProps {
  entity?: Couleur;
}

const CouleurFormComponent = (props: CouleurFormProps) => {
  const [state, setState] = useState<CouleurFormState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      const method_name = couleur ? "PUT" : "POST";
      const response = await fetch(Url_api + "couleurs", {
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

      setSuccessMessage("Modifié avec succès !");
      setErrorMessage(null);
      console.log("Form submitted successfully!" + response);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Une erreur s'est produite");
      setSuccessMessage(null);
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
};

export default CouleurFormComponent;
