import {PatientFormValues, Patient, EntryWithoutId } from "../types";
import {useParams} from 'react-router-dom';



import { MaleRounded } from '@mui/icons-material';
import { FemaleRounded } from '@mui/icons-material';
import { TransgenderRounded } from "@mui/icons-material";
import { MedicalServicesRounded } from "@mui/icons-material";
import { WorkRounded } from "@mui/icons-material";
import { LocalHospitalRounded } from "@mui/icons-material";

import TransitionAlerts from "./AddEntryForm";



import diagnosesService from "../services/diagnoses";

import HealthRatingBar from "../components/HealthRatingBar";

import React from "react";
import { useState, useEffect } from "react";


import { Diagnosis } from '../types';





//many jsx childen a
const EntryDetails: React.FC<{ items: EntryWithoutId[] }> = ({ items }) => {
    return (
      <div >
        {items.map((item, index) => (
            <div key={index} style={{border: 'solid black', borderRadius:'4px', margin:'10px', padding:'5px'}} >
                <EntryPrintType type={item.type} items={item}/>
                <p></p>
            </div>
        ))}
      </div>
    );
  };

  
  //many jsx childen b
  const EntryPrintType: React.FC<{ type: string, items }> = ({ type, items }) => {
    switch (type) {
      case "HealthCheck":
       return (  
        <div>
        <React.Fragment>
          <EntryPrintDate date={items.date}/><MedicalServicesRounded/>
          <div></div>
          <EntryPrintDescription  description={items.description}/>
          <HealthRatingBar showText={true} rating={items.healthCheckRating} />
          <EntryPrintDiagnosis diagnosis={items.diagnosisCodes}/>
          <EntryPrintSpecialist specialist={items.specialist}/>
        </React.Fragment>
        </div>
       );
       case "OccupationalHealthcare":
        return(
          <React.Fragment>
            <EntryPrintDate date={items.date}/><WorkRounded/> 
            <OccupationalHealthcareEntry employerName={items.employerName} />
            <div></div>
            <EntryPrintDescription  description={items.description}/>
            <EntryPrintDiagnosis diagnosis={items.diagnosisCodes}/>
            <EntryPrintSpecialist specialist={items.specialist}/>
          </React.Fragment>
        );
      case "Hospital":
        return(
          <React.Fragment>
            <EntryPrintDate date={items.date}/> <EntryPrintDescription  description={items.description}/>
            <LocalHospitalRounded/>
            <EntryPrintSpecialist specialist={items.specialist}/>
            <EntryPrintDiagnosis diagnosis={items.diagnosisCodes}/>
          <HospitalEntry discharge={items.discharge}/>
          </React.Fragment>
        );
      default:
        return(<div></div>);
   }
  };
  

  const HospitalEntry: React.FC<{ discharge }> = ({ discharge }) => {
    if(discharge)
    return (
        <div>
          discharged {discharge.date}: {discharge.criteria}
        </div>
    );
    else
    return <div></div>;
  };

  const OccupationalHealthcareEntry: React.FC<{ employerName: string }> = ({ employerName }) => {
    if(employerName)
    return (<span> {employerName}</span>
    );
    else
    return <div></div>;
  };


  const EntryPrintDescription = ({ description }) => {
    return <span>{description}</span>;
  };
  const EntryPrintSpecialist = ({ specialist }) => {
    return <div> diagnose by {specialist}</div>;
  };
  const EntryPrintDate = ({ date }) => {
    return <span>{date}</span>;
  };

  const EntryPrintDiagnosis: React.FC<{ diagnosis: string[] | undefined }> = ({ diagnosis }) => {
    if(diagnosis)
      return (
        <ul>
          {diagnosis.map(list =>
            <li key={list}>
              {list} {diagnosesService.findDiagnosisByCode(list)?.name}
            </li>
          )}
        </ul>
      );
    else
    return <div></div>;
  };


const entriesPrint =(patient: Patient) =>{
    const entry = patient.entries;
    if(entry.length>0){
         entry.forEach(item => {
            console.log(item.type);        
    });
    }    
   return(
    <div>
        <h3>Entries</h3>
        <EntryDetails items={entry} />
    </div>
   );
};


const nameSex = (patient: PatientFormValues) => {
    if (patient.gender === 'male')
        return (<h1>{patient.name} <MaleRounded/></h1>);
    else if (patient.gender === 'female')
        return (<h1>{patient.name} <FemaleRounded/> </h1>);
    else 
        return <h1>{patient.name} <TransgenderRounded/></h1>;

};




const PatientInfo = ({patients}) => {
    const id: string | undefined = useParams().id;
    const patient: Patient = patients.find(p => p.id === id);
    console.log(patient);
    
  const [diagnoses, setDiagnose] = useState<Diagnosis[]>([]);

  useEffect(() => {
  const fetchDiagnoseList = async () => {
    const diagnoses = await diagnosesService.getAll();
    setDiagnose(diagnoses);
  };
  void fetchDiagnoseList();
  }, [open]);

    return(
        <>
        {nameSex(patient)}
        <div>
            <h3 style={{margin:0}}>ssh: {patient.ssn}</h3>
            <h3 style={{margin:0}}>occupation: {patient.occupation}</h3>
        </div>
        <div>
            {entriesPrint(patient)}
        </div>
        <TransitionAlerts diagnose={diagnoses}/>
        </>
    );
   
  };
  
  export default PatientInfo;
  