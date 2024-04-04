
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
  }

 

  export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }  




  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
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

  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
          date: string,
          criteria: string,
        },
  }
  
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave?: {
          startDate: string,
          endDate: string,
        },
  }
  
 
  export type NonSensitivePatientEntry = Omit<Patient,'ssn'| 'entries'>;
 
  export type Entry = | HospitalEntry  | OccupationalHealthcareEntry  | HealthCheckEntry;

    // Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
 export type EntryWithoutId = UnionOmit<Entry, 'id'>;