import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnergieFormComponent from "../components/energie-form.components";
import { Url_api } from "../../../shared/constants/global";
import { Energie } from "../../../shared/types/Energie";

const EditEnergieComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la energie depuis la barre d'adresse
  const [energie, setEnergie] = useState<Energie | null>(null);

  useEffect(() => {
    const fetchEnergie = async () => {
      try {
        const response = await fetch(`${Url_api}/energies/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la energie");
        }

        const data = await response.json();
        setEnergie(data.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };

    fetchEnergie();
  }, [id]);

  if (!energie) {
    // Peut être affiché un indicateur de chargement ou un message d'erreur ici
    return null;
  }

  document.title = `Modifier la energie - ${energie.nom}`;
  
  return <EnergieFormComponent entity={energie} />;
};

export default EditEnergieComponent;
