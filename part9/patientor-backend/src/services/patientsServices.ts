import patients from '../../data/patients';
import {  Patient, NonSensitivePatient ,Gender, EntryWithoutId } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {toNewPatient} from '../../utils';

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender, 
    occupation,
 
  }));
};


export const getSpecificPatient = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries}) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender: gender as Gender, 
    occupation,
    entries
  }));
};


export const addPatient = (obj: unknown): Patient => {
  const newPatientEntry = toNewPatient(obj);  

  const newPatient: Patient = {
    id: uuidv4(), // generate unique id
    ...newPatientEntry,
  };

  patients.push(newPatient);  
  return newPatient;  
};

export const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) return undefined;

  const newEntry = {
    ...entry,
    id: uuidv4(),
  };
 
  patient.entries.push(newEntry);
  console.log('New entry added:', newEntry);
  console.log('Updated patient:', patient);
  return patient;
};