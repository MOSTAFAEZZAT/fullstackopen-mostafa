import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const getById = async (id: string) => {
  return  axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
 };

 
const addEntry = async (id: string, entry: string[]) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    { entry }
  );
  return data;
};

export default {
  getAll, getById, addEntry
};

