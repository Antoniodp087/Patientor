import { Patient, Diagnosis } from "../types/fullPatientEntry";
import fullPatientData from '../data/fullPatients.json'


const patients: Patient[] = fullPatientData as Patient[];

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const addPatient = (entry: Patient): Patient =>  {
  const newPatientEntry = {...entry}
  patients.push(newPatientEntry)
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
  }
  
  export default {
    findById,
    parseDiagnosisCodes,
    addPatient
  };