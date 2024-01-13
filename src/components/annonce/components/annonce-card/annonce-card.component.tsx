import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Button } from "@mui/material";
import { Annonce } from "../../../shared/types/Annonce";
import "./annonce-card.component.scss";

interface AnnonceCardComponentProps {
  annonce?: Annonce;
}

const AnnonceCardComponent = (props: AnnonceCardComponentProps) => {
  return (
    <div className="annonce-card">
      <div className="annonce-card-root">
        <div className="container">
          <div className="image">
            <img src="/mercedes.jpg" alt="" />
          </div>
          <div className="annonce-card-text">
            <div className="vehicule-name">
              {props.annonce?.voiture.modele.nom +
                " - " +
                props.annonce?.voiture.modele.marque}
            </div>
            <div className="vehicule-info">
              <span className="prix">{props.annonce?.prix}</span>
              <span className="author">
                {props.annonce?.utilisateur.prenom} -{" "}
                {props.annonce?.utilisateur.nom}
              </span>
              <span className="photo-number">
                <PhotoLibraryIcon />
              </span>
            </div>
          </div>
          <span className="annonce-date">{props.annonce?.dateCreation}</span>
        </div>
        <div className="card-action">
          {/* TODO: Add link */}
          <Button variant="contained" color="success">
            Valider
          </Button>
          <Button variant="contained" color="error">
            Refuser
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCardComponent;
