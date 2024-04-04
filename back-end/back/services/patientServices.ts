import patientData from '../data/patients.json';

import { PatientEntry, NonSensitivePatientEntry } from '../types/patientEntry';

const patients: PatientEntry[] = patientData as PatientEntry[];
const patientWithoutSsn: NonSensitivePatientEntry[]= patientData
                                                        .map(({ id, name ,dateOfBirth,gender,occupation}) => ({
                                                            id,
                                                             name ,
                                                             dateOfBirth,
                                                             gender,
                                                             occupation
                                                            }));

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries =
  (): Pick<PatientEntry, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
    return patientData.map(({ id, name ,dateOfBirth,gender,occupation}) => ({
      id,
       name ,
       dateOfBirth,
       gender,
       occupation
      }));
    };

  const getOmittedPatients = (): NonSensitivePatientEntry[] => {
    return patientWithoutSsn;
  }

const addPatient = (entry: PatientEntry): PatientEntry =>  {
  const newPatientEntry = {...entry}
  patients.push(newPatientEntry)
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getOmittedPatients,
  findById
};