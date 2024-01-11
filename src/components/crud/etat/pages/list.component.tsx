import React, { useEffect, useState } from "react";
import { Etat } from "../../../shared/types/Etat";
import { Url_api } from "../../../shared/constants/global";
import EtatListComponent from "../components/etat-list.components";

const EtatListComponentRoot = () => {
  document.title = "Etats";

  const [etats, setEtats] = useState<Etat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Url_api+"/etats");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();

        // Transformation des données en un tableau de type Etat[]
        const couleursData: Etat[] = data.data.map((item: any) => ({
          id: item.id,
          nom: item.nom,
          hexa: item.hexa,
        }));

        setEtats(couleursData);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <EtatListComponent etats={etats} />
    </div>
  );
};

export default EtatListComponentRoot;
