/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  AnnoncePageState,
  addPage,
} from "../../../store/annonce-page/AnnoncePageSlice";
import { getAnnoncePage } from "../../../store/selector";
import ErrorSnackBar from "../../shared/components/snackbar/ErrorSnackBar";
import AppLoaderComponent from "../../shared/loader/app-loader.component";
import Title from "../../shared/title/title.component";
import { Annonce } from "../../shared/types/Annonce";
import { ApiResponse } from "../../shared/types/Response";
import AnnonceCardComponent from "../components/annonce-card/annonce-card.component";
import {
  TAILLE_PAGE,
  findAnnonceNonValideParPage,
} from "../service/annonce.service";
import "./annonce-root.component.scss";

const AnnonceRoot = () => {
  document.title = "Validation annonces";
  const [state, setState] = useState(initialState);
  const page: AnnoncePageState = useSelector(getAnnoncePage);
  const initialized = useRef(false);
  const dispatch = useDispatch();

  const fetchAnnonce = () => {
    setState((state) => ({
      ...state,
      annonceLoading: true,
    }));
    console.log("fetch page ", page.page);
    findAnnonceNonValideParPage(page.page)
      .then((res) => {
        const response: ApiResponse = res.data;
        console.log(res);
        if (response.data.length == 0) {
          setState((state) => ({
            ...state,
            endScrolling: true,
            annonceLoading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            annonces: [...state.annonces, ...(res.data?.data as Annonce[])],
            annonceLoading: false,
            endScrolling: response.data.length < TAILLE_PAGE,
          }));
          dispatch(addPage());
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
  };

  useEffect(() => {
    // juste pour éviter qu'USeEffect se réexecute en env dev fa jsp en prod otrn tsy manao check intsony React.StrictMode
    if (initialized.current == false) {
      console.log("sending request");
      fetchAnnonce();
      initialized.current = true;
    }
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div className="annonce-root">
      <Title>Liste des annonces à valider</Title>
      {/* TODO : Add loader */}
      <InfiniteScroll
        dataLength={state.annonces.length}
        next={fetchAnnonce}
        hasMore={true}
        scrollThreshold={0.9}
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
        initialScrollY={0}
      >
        <div className="annonce-container">
          {state.annonceLoading === false
            ? state.annonces?.map((annonce, index) => (
                <AnnonceCardComponent
                  key={`${annonce.reference}-${index}`}
                  annonce={annonce}
                />
              ))
            : state.endScrolling == true
            ? "Aucune annonce à valider"
            : ""}
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

export default AnnonceRoot;

interface AnnonceRootState {
  annonces: Annonce[];
  annonceLoading: boolean;
  annonceError?: string;
  annonceSuccess?: string;
  page: number;
  endScrolling: boolean;
  prevPage: number;
}

const initialState: AnnonceRootState = {
  annonces: [],
  annonceLoading: true,
  annonceError: "",
  annonceSuccess: "",
  page: 1,
  prevPage: 0,
  endScrolling: false,
};
