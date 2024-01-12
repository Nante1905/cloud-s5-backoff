import React, { useEffect, useState } from "react";
import { Marque } from "../../../shared/types/Marque";
import { Url_api } from "../../../shared/constants/global";
import MarqueListComponent from "../components/marque-list.components";
import FileUrlFetcher from "../../../shared/constants/FileUrlFetcher";


const MarqueListRoot = () => {
  document.title = "Marques";
  const fichier_nom = FileUrlFetcher( "106dd23c-50fd-4b88-928b-ef3c617dee99" );
  console.log( "file : " );
  console.log( fichier_nom );
  const [marques, setMarques] = useState<Marque[]>([]);

  // useEffect(() => {
  //   listMarque().then( res=> {
  //     const MarquesData : Marque[] = res.data.map((item: any) => ({
  //       id: item.id,
  //       nom: item.nom,
  //       logo: item.logo,
  //     }));
  //     setMarques(MarquesData);
  //   }  )
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Url_api+"/marques");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();

        // Transformation des données en un tableau de type Marque[]
        const marquesData: Marque[] = data.data.map((item: any) => ({
          id: item.id,
          nom: item.nom,
          logo: item.logo,
        }));

        setMarques(marquesData);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MarqueListComponent marques={marques} />
    </div>
  );
};

export default MarqueListRoot;
