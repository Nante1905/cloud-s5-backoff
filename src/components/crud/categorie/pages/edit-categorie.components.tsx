import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCategorieById } from "../../../service/categorie.service";
import { Categorie } from "../../../shared/types/Categorie";
import CategorieFormComponent from "../components/categorie-form.components";

const EditCategorieComponent = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la couleur depuis la barre d'adresse
  const [categorie, setCategorie] = useState<Categorie | null>(null);

  useEffect(() => {
    findCategorieById(Number(id))
      .then((res) => setCategorie(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!categorie) {
    return null;
  }

  document.title = `Modifier la couleur - ${categorie.nom}`;

  return <CategorieFormComponent entity={categorie} />;
};

export default EditCategorieComponent;
