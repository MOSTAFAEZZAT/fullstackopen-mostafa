import axios from 'axios';
import type { NewDiaryEntry } from '../types';
const API_URL = 'http://localhost:3000/api';

export const getAllDiaries =  () => {
 return axios.get(`${API_URL}/diaries`)
}

export const addDiary = (newDiaryEntry : NewDiaryEntry ) => {
  return axios.post(`${API_URL}/diaries`, newDiaryEntry)
}