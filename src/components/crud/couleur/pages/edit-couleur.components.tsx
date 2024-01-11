import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouleurFormComponent from "../components/couleur-form.components";
import { Url_api } from "../../../shared/constants/global";
import { Couleur } from "../../../shared/types/Couleur";

const EditCouleurComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [couleur, setCouleur] = useState<Couleur | null>(null);

  useEffect(() => {
    const fetchCouleur = async () => {
      try {
        const response = await fetch(`${Url_api}/couleurs/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la couleur");
        }

        const data = await response.json();
        setCouleur(data.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };

    fetchCouleur();
  }, [id]);

  if (!couleur) {
    // Peut être affiché un indicateur de chargement ou un message d'erreur ici
    return null;
  }

  document.title = `Modifier la couleur - ${couleur.nom}`;
  
  return <CouleurFormComponent entity={couleur} />;
};

export default EditCouleurComponent;
