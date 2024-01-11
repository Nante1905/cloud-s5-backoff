import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import Title from "../../../shared/title/title.component";
import { Categorie } from "../../../shared/types/Categorie";
import { updateCategorie } from "../service/categorie.service";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface CategorieFormProps {
  entity?: Categorie;
}

const CategorieFormComponent = (props: CategorieFormProps) => {
  const [state, setState] = useState<CategorieFormState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Categorie),
        },
      }));
    }
  }, [props.entity]);

  const handleSubmit = async () => {
    console.log("ny alefa : ");
    console.log(state);
    try {
      // const method_name = couleur ? "PUT" : "POST";
      // const response = await fetch(Url_api + "categories", {
      //   method: method_name,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(state.form),
      // });

      if (couleur) {
        updateCategorie(state.form)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }

      if (!response.ok) {
        const responseData = await response.json();
        const errorMessageFromAPI =
          responseData.err || "Une erreur s'est produite";
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
      <div className="container-form">
        <Link to="/categories">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>{" "}
        <div className="title-form">
          <Title>{couleur ? "Modifier categorie" : "Créer categorie"}</Title>
        </div>
        {errorMessage && (
          <div className="success-error-form" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="success-error-form" style={{ color: "green" }}>
            {successMessage}
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
            {couleur ? "Modifier" : "Créer"}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CategorieFormState {
  form: Categorie;
}

const initialState: CategorieFormState = {
  form: {
    nom: "",
  },
};

export default CategorieFormComponent;
