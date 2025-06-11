/* eslint-disable @typescript-eslint/no-unused-vars */
  import express, {Response} from "express";
  import { getNonSensitivePatients,getSpecificPatient, addPatient, addEntry } from '../services/patientsServices';  
  import { NonSensitivePatient } from '../types';  
  // import { isString } from '../../utils';  
  import { toNewPatient, toNewEntry} from '../../utils';  
  const patientRouter = express.Router();

  patientRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  //   const patients = getNonSensitivePatients();
    res.json(getNonSensitivePatients());
  });

  patientRouter.get('/:id', (req, res) => {
      const id = req.params.id;
      const patients = getSpecificPatient();
      const patient = patients.find(p => p.id === id);
      if (patient) {
          res.json(patient);
      }
      else {
          res.status(404).send({ error: 'Patient not found' });
      }

  });
  patientRouter.post('/', (_req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    // const { name, ssn, dateOfBirth, occupation, gender } = _req.body; 
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const newPatient = toNewPatient(_req.body);
    const newAddedPatient = addPatient(newPatient);
    res.json(newAddedPatient);
  });
  
patientRouter.post('/:id/entries', (req, res) => {
  console.log('Received request to add entry:', req.body);
  const {entry} = req.body;
  const entryValidated = toNewEntry(entry);
  const added = addEntry(req.params.id, entryValidated);

  if (!added) {
    res.status(404).json({ error: 'Patient not found' });
    return;  // 👈 Return void
  }

  res.json(added);  // 👈 No return — void
});

  export default patientRouter;
