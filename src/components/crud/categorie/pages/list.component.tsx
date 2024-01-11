import React, { useEffect, useState } from "react";
import { Categorie } from "../../../shared/types/Categorie"; 
import { Url_api } from "../../../shared/constants/global";
import CategorieListComponent from "../components/categorie-list.components";

const CategorieListComponentRoot = () => {
  document.title = "Categories";

  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Url_api+"/categories");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();

        // Transformation des données en un tableau de type Categorie[]
        const categoriesData: Categorie[] = data.data.map((item: any) => ({
          id: item.id,
          nom: item.nom
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CategorieListComponent categories={categories} />
    </div>
  );
};

export default CategorieListComponentRoot;
