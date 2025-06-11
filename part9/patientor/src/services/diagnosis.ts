import axios from 'axios';
import { Diagnose } from '../types';
import { apiBaseUrl } from '../constants';
 
export const getDiagnoseByCode = (codes: string[]) => {
    return axios.post<Diagnose []>(`${apiBaseUrl}/diagnoses/codes`, {codes});
};