import { useEffect, useState } from "react";
import ErrorSnackBar from "../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import { Annonce } from "../../shared/types/Annonce";
import AnnonceCardComponent from "../components/annonce-card/annonce-card.component";
import { findAnnonceNonValide } from "../service/annonce.service";
import "./annonce-root.component.scss";

const AnnonceRoot = () => {
  document.title = "Validation annonces";
  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log("sending request");

    findAnnonceNonValide()
      .then((res) => {
        setState({
          ...state,
          annonces: res.data?.data,
          annonceLoading: false,
        });
        console.log(res);
      })
      .catch((err) => {
        setState({
          ...state,
          annonceLoading: false,
          annonceError: err?.response?.data?.message,
        });
        console.log(err);
      });
  }, []);

  return (
    <div className="annonce-root">
      <Title>Liste des annonces à valider</Title>
      {/* TODO : Add loader */}
      <div className="annonce-container">
        <AppLoaderComponent loading={state.annonceLoading}>
          <>
            {state.annonces.length > 0
              ? state.annonces?.map((annonce) => (
                  <AnnonceCardComponent key={annonce.id} annonce={annonce} />
                ))
              : "Aucune annonce à valider"}
          </>
        </AppLoaderComponent>
      </div>
      <ErrorSnackBar
        open={state.annonceError !== ""}
        onClose={() => {
          setState((state) => ({
            ...state,
            annonceError: "",
          }));
        }}
        error={state.annonceError || "Connexion impossible"}
      />
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
  annonceError: "",
  annonceSuccess: "",
};
