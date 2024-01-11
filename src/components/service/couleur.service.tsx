// apiService.js
import axios from "axios";
import { Couleur } from "../shared/types/Couleur";
import { Url_api } from "../shared/constants/global";

const updateCouleur = async (form : Couleur ) => {
  try {
    const response = await axios.put(`${Url_api}couleurs/${form.id}`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertCouleur = async (form : Couleur ) => {
  try {
    const response = await axios.post(`${Url_api}couleurs`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateCouleur, insertCouleur };
