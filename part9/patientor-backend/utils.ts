import { NewPatient, Gender, EntryWithoutId , HealthCheckRating} from './src/types';
import {z}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  from 'zod';

/* const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);
 */
/* const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Incorrect or missing name');
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Incorrect or missing ssn');
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error('Incorrect or missing date');
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Incorrect or missing occupation');
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender');
  return gender;
}; */

export const toNewPatient = (object: unknown): NewPatient => {
/*   if (
    !object ||
    typeof object !== 'object' ||
    !('name' in object) ||
    !('ssn' in object) ||
    !('dateOfBirth' in object) ||
    !('occupation' in object) ||
    !('gender' in object)
  ) {
    throw new Error('Incorrect or missing patient data');
  }

  const newPatient: NewPatient = {
    name: z.string().parse(object.name),  
    ssn: z.string().parse(object.ssn),
    dateOfBirth: z.string().date().parse(object.dateOfBirth),
    occupation: z.string().parse(object.occupation),  
    gender: z.nativeEnum(Gender).parse(object.gender)
  }; */
  
  return newPatientSchema.parse(object) as NewPatient; ; 
};
// export type NewPatientZod = z.infer<typeof newPatientSchema>; // same shape as NewPatient

export const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  gender : z.nativeEnum(Gender),
  occupation: z.string(),
  
});

/* const HealthCheckSchema = z.object({
  type: z.literal("HealthCheck"),
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.number().min(0).max(3)
}); */

const BaseEntryFields  = z.object({
  
  date:  z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  sickLeaveStartDate:  z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  sickLeaveEndDate:  z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  employerName: z.string().optional(),
  description: z.string(),
  specialist: z.string(),
  // employerName: z.string(),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  type: z.literal("HealthCheck"), // Defines the type as a Zod schema
  diagnosisCodes: z.preprocess(
    (val) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return [];
    },
    z.array(z.string())
  ).optional(), 
 // sickLeave: z.object({
  //   startDate: z.string(),
  //   endDate: z.string()
  // }).optional()
});

/* const HospitalSchema = z.object({
  type: z.literal("Hospital"),
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});
 */
// This union handles the proper narrowing
export const EntrySchema = BaseEntryFields;

export const toNewEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object) as EntryWithoutId; // EntrySchema must be a union of all entry schemas
};
