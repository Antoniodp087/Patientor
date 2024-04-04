import diagoseData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types/diagnoseEntry';

const diagnoses: DiagnoseEntry[] = diagoseData as DiagnoseEntry[];

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const addDiagnose = (entry: DiagnoseEntry): DiagnoseEntry => {
  const newDiagnoseEntry = {...entry}
  diagnoses.push(newDiagnoseEntry)
  return newDiagnoseEntry;
};

const findByCode = (code: string): DiagnoseEntry | undefined => {
  const entry = diagoseData.find(d => d.code === code);
  return entry;
};



export default {
  getEntries,
  addDiagnose,
  findByCode,
};