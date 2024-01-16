import { useEffect, useRef, useState } from "react";
import ErrorSnackBar from "../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import { Annonce } from "../../shared/types/Annonce";
import AnnonceCardComponent from "../components/annonce-card/annonce-card.component";
import { findAnnonceNonValideParPage } from "../service/annonce.service";
import "./annonce-root.component.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiResponse } from "../../shared/types/Response";

const AnnonceRootTest = () => {
  document.title = "Validation annonces";
  const [state, setState] = useState(initialState);
  const intitiliazed = useRef(false);

  const fetchAnnonce = () => {
    console.log("fetch page ", state.page);
    setTimeout(() => {
      findAnnonceNonValideParPage(state.page)
        .then((res) => {
          const response: ApiResponse = res.data;
          console.log(res);
          if (response.data.length == 0) {
            setState((state) => ({
              ...state,
              endScrolling: true,
            }));
          } else {
            setState((state) => ({
              ...state,
              annonces: [...state.annonces, ...(res.data?.data as Annonce[])],
              annonceLoading: false,
              page: state.page + 1,
            }));
          }
        })
        .catch((err) => {
          setState((state) => ({
            ...state,
            annonceLoading: false,
            annonceError: err?.response?.data?.message,
          }));
          console.log(err);
        });
    }, 1000);
  };

  useEffect(() => {
    // juste pour éviter qu'USeEffect se réexecute en env dev fa jsp en prod otrn tsy manao check intsony React.StrictMode
    // Raha mi actualiser eny ampovoany koa d miverina mi fetch izy
    if (intitiliazed.current == false) {
      console.log("sending request");
      fetchAnnonce();
      intitiliazed.current = true;
    }
  }, []);

  return (
    <div className="annonce-root">
      <Title>Liste des annonces à valider</Title>
      {/* TODO : Add loader */}
      <InfiniteScroll
        dataLength={state.annonces.length}
        next={fetchAnnonce}
        hasMore={true}
        loader={
          state.endScrolling ? (
            <p className="text-center p_end_scroll">
              Vous avez atteint la fin.
            </p>
          ) : (
            <AppLoaderComponent loading={state.endScrolling == false}>
              <></>
            </AppLoaderComponent>
          )
        }
      >
        <div className="annonce-container">
          {state.annonces.length > 0
            ? state.annonces?.map((annonce, index) => (
                <AnnonceCardComponent
                  key={`${annonce.reference}-${index}`}
                  annonce={annonce}
                />
              ))
            : "Aucune annonce à valider"}
        </div>
      </InfiniteScroll>
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

export default AnnonceRootTest;

interface AnnonceRootState {
  annonces: Annonce[];
  annonceLoading: boolean;
  annonceError?: string;
  annonceSuccess?: string;
  page: number;
  endScrolling: boolean;
}

const initialState: AnnonceRootState = {
  annonces: [],
  annonceLoading: true,
  annonceError: "",
  annonceSuccess: "",
  page: 1,
  endScrolling: false,
};
