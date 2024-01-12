// apiService.js
import axios from "axios";
import { Marque } from "../shared/types/Marque";
import { Url_api } from "../shared/constants/global";

const listMarque = () => { return axios.get(`${Url_api}marques/`); };

const updateMarque = async (form : Marque ) => {
  try {
    const response = await axios.put(`${Url_api}marques/${form.id}`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertMarque = async (form : Marque ) => {
  try {
    const response = await axios.post(`${Url_api}marques`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateMarque, insertMarque , listMarque };
