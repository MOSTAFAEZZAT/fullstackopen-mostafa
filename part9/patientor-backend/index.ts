import express from 'express';
import patientRouter from './src/routes/patientRouter';
import diagnoseRouter from './src/routes/diagnoseRouter';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});