import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EtatFormComponent from "../components/etat-form.components";
import { Url_api } from "../../../shared/constants/global";
import { Etat } from "../../../shared/types/Etat";

const EditEtatComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la etat depuis la barre d'adresse
  const [etat, setEtat] = useState<Etat | null>(null);

  useEffect(() => {
    const fetchEtat = async () => {
      try {
        const response = await fetch(`${Url_api}/etats/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la etat");
        }

        const data = await response.json();
        setEtat(data.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };

    fetchEtat();
  }, [id]);

  if (!etat) {
    // Peut être affiché un indicateur de chargement ou un message d'erreur ici
    return null;
  }

  document.title = `Modifier la etat - ${etat.nom}`;
  
  return <EtatFormComponent entity={etat} />;
};

export default EditEtatComponent;
