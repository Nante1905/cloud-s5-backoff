import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertCategorie, updateCategorie } from "../../../service/categorie.service";
import Title from "../../../shared/title/title.component";
import { Categorie } from "../../../shared/types/Categorie";
import "./couleur-form.component.css";
import "./couleur-form.component.scss";

interface CategorieFormProps {
  entity?: Categorie;
}

const CategorieFormComponent = (props: CategorieFormProps) => {
  const [state, setState] = useState<CategorieFormState>(initialState);

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
      if (state.form.id) {
        await updateCategorie(state.form);
        console.log("Mise à jour effectuée avec succès!");
        setState((state) => ({ ...state, success: "Modifié avec succès !", error: null }));
      } else {
        await insertCategorie(state.form);
        console.log("Insertion effectuée avec succès!");
        setState((state) => ({ ...state, success: "Insertion effectuée avec succès !", error: null }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setState((state) => ({ ...state, error: "Une erreur s'est produite", success: null }));
    }
  };

  return (
    <div className="form-temp couleur-form">
      <div className="container-form">
        <Link to="/categories">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>{" "}
        <div className="title-form">
          <Title>{state.form.id ? "Modifier categorie" : "Créer categorie"}</Title>
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
            {state.form.id ? "Modifier" : "Créer"}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CategorieFormState {
  form: Categorie;
  success: string | null;
  error: string | null;
}

const initialState: CategorieFormState = {
  form: {
    nom: "",
  },
  success: null,
  error: null,
};

export default CategorieFormComponent;
