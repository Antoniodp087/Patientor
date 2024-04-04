const data = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop"
    },
    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop"
    },
    {
        "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "other",
        "occupation": "Technician"
    },
    {
        "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": "female",
        "occupation": "Forensic Pathologist"
    },
    {
        "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
        "name": "Matti Luukkainen",
        "dateOfBirth": "1971-04-09",
        "ssn": "090471-8890",
        "gender": "male",
        "occupation": "Digital evangelist"
    }
];



import patientServices from './services/patientServices';
import toNewPatientEntry from './services/utils';


import express from 'express'
import cors from 'cors'
//const router = express.Router();
const app = express();
app.use(cors())
app.use(express.json());


app.get('/patients', (req, res) => {
  res.send(data);
});

app.get('/api/patients', (_req, res) => {
  res.send(patientServices.getEntries());
});

/*
app.get('/api/patients', (_req, res) => {
    res.send(patientServices.getNonSensitiveEntries());
  });
*/
/*
app.get('/api/patients/omitted', (_req, res) => {
    res.send(patientServices.getOmittedPatients());
  });  
*/

app.get('/api/patients/:id', (req, res) => {
    const patient = patientServices.findById((req.params.id));
  
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  });

/*
app.post('/patients',(req,res) => {
  const {id, name, dateOfBirth, ssn, gender, occupation} = req.body;
  const addedEntry = patientServices.addPatient({id, name, dateOfBirth, ssn, gender, occupation});
  res.json(addedEntry)
})
*/

app.post('/api/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//module.exports = router;