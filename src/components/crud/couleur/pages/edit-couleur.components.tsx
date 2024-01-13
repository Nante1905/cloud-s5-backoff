import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCouleurById } from "../../../service/couleur.service";
import { Couleur } from "../../../shared/types/Couleur";
import CouleurFormComponent from "../components/couleur-form.components";

const EditCouleurComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [couleur, setCouleur] = useState<Couleur | null>(null);

  useEffect(() => {
    findCouleurById(Number(id))
      .then((res) => {
        setCouleur(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!couleur) {
    // Peut être affiché un indicateur de chargement ou un message d'erreur ici
    return null;
  }

  document.title = `Modifier la couleur - ${couleur.nom}`;

  return <CouleurFormComponent entity={couleur} />;
};

export default EditCouleurComponent;
