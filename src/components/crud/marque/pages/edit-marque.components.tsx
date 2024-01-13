import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarqueFormComponent from "../components/marque-form.components";
import { Url_api } from "../../../shared/constants/global";
import { Marque } from "../../../shared/types/Marque";

const EditMarqueComponent = () => {
  document.title="marques";
  
  const { id } = useParams<{ id: string }>();
  const [marque, setMarque] = useState<Marque | null>(null);

  useEffect(() => {
    const fetchMarque = async () => {
      try {
        const response = await fetch(`${Url_api}/marques/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la marque");
        }

        const data = await response.json();
        setMarque(data.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };

    fetchMarque();
  }, [id]);

  if (!marque) {
    // Peut être affiché un indicateur de chargement ou un message d'erreur ici
    return null;
  }

  document.title = `Modifier la marque - ${marque.nom}`;
  
  return <MarqueFormComponent entity={marque} />;
};

export default EditMarqueComponent;
