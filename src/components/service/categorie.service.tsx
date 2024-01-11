// apiService.js
import axios from "axios";
import { Categorie } from "../shared/types/Categorie";
import { Url_api } from "../shared/constants/global";

const updateCategorie = async (form : Categorie ) => {
  try {
    const response = await axios.put(`${Url_api}categories/${form.id}`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertCategorie = async (form : Categorie ) => {
  try {
    const response = await axios.post(`${Url_api}categories`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateCategorie, insertCategorie };
