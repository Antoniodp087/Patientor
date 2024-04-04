export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
  }

  export interface Entry{
    
  }

  export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }  
  

  export type NonSensitivePatientEntry = Omit<PatientEntry,'ssn'| 'entries'>;