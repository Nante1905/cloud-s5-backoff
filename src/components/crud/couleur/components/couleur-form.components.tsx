import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../../shared/title/title.component";
import { Couleur } from "../../../shared/types/Couleur";
import "./couleur-form.component.scss";

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
  }, []);

  // apiana ny mandefa anle requete axios any am WS sisa

  const couleur = props.entity;
  return (
    <div className="couleur-form">
      <Title>{couleur ? "Modifier couleur" : "Creer couleur"}</Title>
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
          label="Valeur hexadecimale"
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
        <Button variant="contained">{couleur ? "Modifier" : "Creer"}</Button>
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
