// apiService.js
import axios from "axios";
import { Etat } from "../shared/types/Etat";
import { Url_api } from "../shared/constants/global";
const updateEtat = async (form : Etat ) => {
  try {
    const response = await axios.put(`${Url_api}etats/${form.id}`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertEtat = async (form : Etat ) => {
  try {
    const response = await axios.post(`${Url_api}etats`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateEtat, insertEtat };
