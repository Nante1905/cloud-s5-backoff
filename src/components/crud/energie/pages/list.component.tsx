import React, { useEffect, useState } from "react";
import { Energie } from "../../../shared/types/Energie";
import { Url_api } from "../../../shared/constants/global";
import EnergieListComponent from "../components/energie-list.components";

const EnergieListComponentRoot = () => {
  document.title = "Energies";

  const [energies, setEnergies] = useState<Energie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Url_api+"/energies");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();

        // Transformation des données en un tableau de type Energie[]
        const couleursData: Energie[] = data.data.map((item: any) => ({
          id: item.id,
          nom: item.nom,
          hexa: item.hexa,
        }));

        setEnergies(couleursData);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <EnergieListComponent energies={energies} />
    </div>
  );
};

export default EnergieListComponentRoot;
