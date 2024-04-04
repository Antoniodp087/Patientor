import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

let diagnosesData: Diagnosis[] = [];

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  diagnosesData = data;
  return diagnosesData;
};

const findDiagnosisByCode =  (code: string): Diagnosis | undefined => {
  return diagnosesData.find(diagnosis => diagnosis.code === code);
};

export default {
  getAll, 
  findDiagnosisByCode
};

