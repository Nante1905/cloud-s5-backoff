import { useEffect, useState } from "react";
import Title from "../../shared/title/title.component";
import { Annonce } from "../../shared/types/Annonce";
import AnnonceCardComponent from "../components/annonce-card/annonce-card.component";
import { findAnnonceNonValide } from "../service/annonce.service";
import "./annonce-root.component.scss";

const AnnonceRoot = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log("sending request");

    findAnnonceNonValide()
      .then((res) => {
        setState({
          ...state,
          annonces: res.data,
          annonceLoading: false,
        });
        console.log(res);
      })
      .catch((err) => {
        setState({
          ...state,
          annonceLoading: false,
          annonceError: err.response.data.message,
        });
        console.log(err);
      });
  }, []);

  return (
    <div className="annonce-root">
      <Title>Liste des annonces à valider</Title>
      {/* TODO : Add loader */}
      <div className="annonce-container">
        {state.annonces.length > 0
          ? state.annonces?.map((annonce) => (
              <AnnonceCardComponent key={annonce.id} annonce={annonce} />
            ))
          : "Aucune annonce à valider"}
      </div>
    </div>
  );
};

export default AnnonceRoot;

interface AnnonceRootState {
  annonces: Annonce[];
  annonceLoading: boolean;
  annonceError?: string;
  annonceSuccess?: string;
}

const initialState: AnnonceRootState = {
  annonces: [],
  annonceLoading: true,
  annonceError: undefined,
  annonceSuccess: undefined,
};
