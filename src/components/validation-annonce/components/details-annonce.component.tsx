import { Button, Card, CardContent } from "@mui/material";
import "./details-annonce.component.scss";
import { Annonce } from "../../shared/types/Annonce";
import dayjs from "dayjs";

const DetailsAnnonce = () => {
  document.title = "Validation annonce";
  // alaina am props
  const annonce: Annonce = {
    id: 1,
    reference: "ANu8177",
    description: "Lieu: Ambodivona",
    dateCreation: "2024-01-08",
    prix: 2.5e7,
    commission: 10.0,
    nbVues: 200,
    utilisateur: {
      id: 1,
      nom: "Rakotonirina",
      prenom: "Tiavina Irintsoa",
      email: "rakotonirinairintsoa0@gmail.com",
      dateInscription: "2022-12-15",
      adresse: "Ankadifotsy",
    },
    voiture: {
      id: 4,
      consommation: 10.0,
      kilometrage: 2000,
      etat: 1,
      couleur: {
        id: 1,
        nom: "Noir",
        hexa: "#12a",
      },
      modele: {
        id: 88,
        nom: "Corolla",
        nbPlace: 5,
        nbPorte: 4,
        anneeSortie: 2021,
        categorie: {
          id: 2,
          nom: "Berlines",
        },
        marque: {
          id: 1,
          nom: "Toyota",
          logo: "Toyota.jpg",
        },
      },
      vitesse: {
        id: 1,
        nom: "Automatique",
      },
      energie: {
        id: 4,
        nom: "Hybride",
      },
    },
  };

  const photos = [
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
    {
      url: "mercedes.jpg",
    },
  ];

  document.title = "Validation annonce " + annonce.reference;

  return (
    <div className="div_details_annonce">
      <div className="div_info">
        <Card className="card card_annonce">
          <CardContent className="card_content">
            <h2 className="title">Annonce</h2>
            {/* <Title>Annonce</Title> */}
            <div className="div_info_item">
              <strong>Création: </strong>
              <span>{dayjs(annonce.dateCreation).format("DD MMMM YYYY")}</span>
            </div>
            <div className="div_info_item_no_flex">
              <strong>Description</strong>
              <p>
                {annonce.description} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Tenetur illum debitis, rem natus neque nihil
                voluptatem similique saepe consequatur corporis labore
                exercitationem repellat quo non consectetur, blanditiis corrupti
                obcaecati omnis maiores quisquam enim possimus et? Voluptate
                commodi quis tenetur voluptatibus ad voluptatem necessitatibus
                ipsum architecto officiis recusandae? Natus, minus.
                Consequuntur.
              </p>
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
          <Button variant="contained" className="div-success">
            Valider
          </Button>
          <Button variant="contained" className="div-danger">
            Refuser
          </Button>
        </div>
        <div className="div_images_container">
          {photos.map((p, index) => (
            <div key={`${p.url}_${index}`} className="div_images_item">
              <p>
                {index + 1}/{photos.length}
              </p>
              <img src={p.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsAnnonce;
