export interface Diagnose {
  code: string;
  name: string;
  latin?: string;  
}

export type NonSensitiveDiagnose = Omit<Diagnose, 'latin'>;
export type NewDiagnose = Omit<Diagnose, 'code'>;
export type PublicDiagnose = Omit<Diagnose, 'code' | 'latin'>;

export enum Gender {
  Male = "male", 
  Female = "female",
  Other = "other" 
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;  
  gender: Gender;
  occupation: string;
  entries: Entry[];
};
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"; 
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
// export type NonSensitivePatient = Omit<Patient, 'ssn'>;
// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;