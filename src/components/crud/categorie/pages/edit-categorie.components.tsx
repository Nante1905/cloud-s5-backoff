import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategorieFormComponent from "../components/categorie-form.components";
import { Url_api } from "../../../shared/constants/global";
import { Categorie } from "../../../shared/types/Categorie";

const EditCategorieComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [categorie, setCategorie] = useState<Categorie | null>(null);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const response = await fetch(`${Url_api}/categories/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la couleur");
        }

        const data = await response.json();
        setCategorie(data.data);
      } catch (error) {
        console.error("Une erreur s'est produite:", error.message);
      }
    };

    fetchCategorie();
  }, [id]);

  if (!categorie) {
    return null;
  }

  document.title = `Modifier la couleur - ${categorie.nom}`;
  
  return <CategorieFormComponent entity={categorie} />;
};

export default EditCategorieComponent;
