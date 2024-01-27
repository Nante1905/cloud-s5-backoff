import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../shared/loader/app-loader.component";
import { AnnonceGeneral, Photo } from "../../../shared/types/Annonce";
import {
  refuserAnnonce,
  validerAnnonce,
} from "../../../validation-annonce/service/validation-annonce.service";
import "./annonce-card.component.scss";

interface AnnonceCardComponentProps {
  annonce?: AnnonceGeneral;
}

const AnnonceCardComponent = (props: AnnonceCardComponentProps) => {
  const [state, setState] = useState(initialState);
  const photos: Photo[] = props.annonce?.photos as Photo[];
  const navigate = useNavigate();

  const onValider = (id: number) => {
    setState((pervState) => ({
      ...pervState,
      validerLoading: true,
    }));
    validerAnnonce(id)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          validerLoading: false,
          validerSuccessMessage: res.data?.message,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          validerLoading: false,
          validerErrorMessage: err.response?.data?.message,
        }));
      });
  };

  const onRefuser = (id: number) => {
    setState((pervState) => ({
      ...pervState,
      refuserLoading: true,
    }));
    refuserAnnonce(id)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          refuserLoading: false,
          refuserSuccessMessage: res.data?.message,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          refuserLoading: false,
          refuserErrorMessage: err.response?.data?.message,
        }));
      });
  };

  return (
    <div className="annonce-card">
      <div className="annonce-card-root">
        <div
          className="container"
          onClick={() => {
            navigate(`/validation/${props.annonce?.id}`);
          }}
        >
          <div className="image">
            {photos.length >= 1 ? (
              <img src={props.annonce?.photos[0]?.url} alt="Image" />
            ) : (
              <img src={props.annonce?.marque.logo} alt="Image" />
            )}
          </div>
          <div className="annonce-card-text">
            <Link to={`/validation/${props.annonce?.id}`}>
              <div className="vehicule-name">
                {props.annonce?.modele.nom + " - " + props.annonce?.marque.nom}
              </div>
            </Link>
            <div className="vehicule-info">
              <span className="prix">
                {props.annonce?.prix.toLocaleString()} MGA
              </span>
              <span className="author">
                {props.annonce?.utilisateur.prenom} -{" "}
                {props.annonce?.utilisateur.nom}
              </span>
              <span className="photo-number">
                {photos.length} <PhotoLibraryIcon />
              </span>
            </div>
          </div>
          <span className="annonce-date">
            {" "}
            {dayjs(props.annonce?.creation).format("DD MMMM YYYY à HH:mm")}{" "}
          </span>
        </div>
        <div className="card-action">
          {/* TODO: Add link */}
          <Button
            variant="contained"
            color="success"
            onClick={() => onValider(Number(props.annonce?.id))}
          >
            <AppLoaderComponent
              width="25px"
              heigth="25px"
              color="white"
              loading={state.validerLoading}
            >
              <>Valider</>
            </AppLoaderComponent>
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => onRefuser(Number(props.annonce?.id))}
          >
            <AppLoaderComponent
              width="25px"
              heigth="25px"
              color="white"
              loading={state.refuserLoading}
            >
              <>Refuser</>
            </AppLoaderComponent>
          </Button>
        </div>
      </div>
      <SuccessSnackBar
        message={state.refuserSuccessMessage || state.validerSuccessMessage}
        open={
          state.refuserSuccessMessage !== "" ||
          state.validerSuccessMessage !== ""
        }
        onClose={() => {
          setState((state) => ({
            ...state,
            refuserSuccessMessage: "",
            validerSuccessMessage: "",
          }));
        }}
      />
      <ErrorSnackBar
        error={state.refuserErrorMessage || state.validerErrorMessage}
        open={
          state.refuserErrorMessage !== "" || state.validerErrorMessage !== ""
        }
        onClose={() => {
          setState((state) => ({
            ...state,
            refuserErrorMessage: "",
            validerErrorMessage: "",
          }));
        }}
      />
    </div>
  );
};

export default AnnonceCardComponent;

interface AnnonceCardState {
  validerLoading: boolean;
  refuserLoading: boolean;
  validerSuccessMessage: string;
  validerErrorMessage: string;
  refuserSuccessMessage: string;
  refuserErrorMessage: string;
}

const initialState: AnnonceCardState = {
  refuserLoading: false,
  validerLoading: false,
  validerSuccessMessage: "",
  refuserSuccessMessage: "",
  validerErrorMessage: "",
  refuserErrorMessage: "",
};
