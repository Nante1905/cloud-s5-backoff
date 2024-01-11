// apiService.js
import axios from "axios";
import { Energie } from "../shared/types/Energie";
import { Url_api } from "../shared/constants/global";

const updateEnergie = async (form : Energie ) => {
  try {
    const response = await axios.put(`${Url_api}energies/${form.id}`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const insertEnergie = async (form : Energie ) => {
  try {
    const response = await axios.post(`${Url_api}energies`, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateEnergie, insertEnergie };
