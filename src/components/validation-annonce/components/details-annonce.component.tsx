import { Button, Card, CardContent } from "@mui/material";
import "./details-annonce.component.scss";
import dayjs from "dayjs";
import { Annonce } from "../../shared/types/Annonce";
import AppLoaderComponent from "../../shared/loader/app-loader.component";

interface DetailsAnnonceProps {
  annonce: Annonce;
  loadingValider: boolean;
  loadingRefuser: boolean;
  onValider: () => void;
  onRefuser: () => void;
}

const DetailsAnnonce = (props: DetailsAnnonceProps) => {
  const annonce: Annonce = props.annonce;
  document.title = "Validation annonce " + annonce.reference;

  return (
    <div className="div_details_annonce">
      <div className="div_info">
        <Card className="card card_annonce">
          <CardContent className="card_content">
            <h2 className="title">Annonce {annonce.reference}</h2>
            <div className="div_info_item">
              <strong>Création: </strong>
              <span>
                {dayjs(annonce.dateCreation).format("DD MMMM YYYY à HH:MM")}
              </span>
            </div>
            <div className="div_info_item_no_flex">
              <strong>Description</strong>
              <p>{annonce.description}</p>
            </div>
            <div className="div_info_item">
              <strong>Prix: </strong>
              <span>{annonce.prix.toLocaleString()} MGA</span>
            </div>
            <div className="div_info_item">
              <strong>Commission: </strong>
              <span>{annonce.commission?.toLocaleString()} MGA</span>
            </div>
            <div className="div_info_item">
              <strong>Utilisateur: </strong>
              <span>
                {annonce.utilisateur.nom} {annonce.utilisateur.prenom}
              </span>
            </div>
            <div className="div_info_item">
              <strong>Membre depuis: </strong>
              <span>
                {dayjs(annonce.utilisateur.dateInscription).format(
                  "DD MMMM YYYY"
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card card_voiture">
          <CardContent className="card_content">
            <h2 className="title">Voiture</h2>
            <div className="div_info_item">
              <strong>Marque: </strong>
              <span>{annonce.voiture.modele.marque.nom}</span>
            </div>
            <div className="div_info_item">
              <strong>Modèle: </strong>
              <span>{annonce.voiture.modele.nom}</span>
            </div>
            <div className="div_info_item">
              <strong>Catégorie: </strong>
              <span>{annonce.voiture.modele.categorie.nom}</span>
            </div>
            <div className="div_info_item">
              <strong>Mise en circulation: </strong>
              <span>{annonce.voiture.modele.anneeSortie}</span>
            </div>
            <div className="div_info_item">
              <strong>Etat: </strong>
              <span>{annonce.voiture.etat} / 10</span>
            </div>
            <div className="div_info_item">
              <strong>Couleur: </strong>
              <span
                className="box-color"
                style={{ background: annonce.voiture.couleur.hexa }}
              ></span>
            </div>
            <div className="div_info_item">
              <strong>Energie: </strong>
              <span>{annonce.voiture.energie.nom}</span>
            </div>
            <div className="div_info_item">
              <strong>Boîte de vitesse: </strong>
              <span>{annonce.voiture.vitesse.nom}</span>
            </div>
            <div className="div_info_item">
              <strong>Consommation: </strong>
              <span>{annonce.voiture.consommation} L/100 km</span>
            </div>
            <div className="div_info_item">
              <strong>Kilométrage: </strong>
              <span>{annonce.voiture.kilometrage} km</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="div_images">
        <div className="actions">
          <Button
            variant="contained"
            className="div-success"
            onClick={props.onValider}
          >
            <AppLoaderComponent
              loading={props.loadingValider}
              width="30px"
              heigth="30px"
            >
              <>Valider</>
            </AppLoaderComponent>
          </Button>
          <Button
            variant="contained"
            className="div-danger"
            onClick={props.onRefuser}
          >
            <AppLoaderComponent
              loading={props.loadingRefuser}
              width="30px"
              heigth="30px"
            >
              <>Refuser</>
            </AppLoaderComponent>
          </Button>
        </div>
        <div className="div_images_container">
          {annonce.photos.map((p, index) => (
            <div key={`${p.url}_${index}`} className="div_images_item">
              <p>
                {index + 1}/{annonce.photos.length}
              </p>
              <img src={`${p.url}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsAnnonce;
