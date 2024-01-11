import React from "react";
import Title from "../../shared/title/title.component";
import DetailsAnnonce from "../components/details-annonce.component";

const DetailsAnnonceRoot = () => {
  // ao am url maka id
  // mi fetch annonce by id
  // omena an'i detailsAnnonce ilay annonce
  // manao loading kely
  return (
    <>
      <Title>Validation Annonce</Title>
      <DetailsAnnonce />
    </>
  );
};

export default DetailsAnnonceRoot;
