import { useParams } from 'react-router-dom';
import { Patient, Diagnose,  Entry} from '../../types';
import { useEffect, useState} from 'react';
import  patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  patients: Patient[];
}
const padding = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid black'
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const PatientData = ({ patients }: Props) => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  // const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnose[] | null>([]);
  const [formData, setFormData] = useState({
    description: '',
    specialist: '',
    healthCheckRating: 0,
    diagnosisCodes: [],
    date: null,
    sickLeaveStartDate: null,
    sickLeaveEndDate: null,
    EmployerName: '',
    type: 'HealthCheck' // Default type, can be changed based on user input
  });
  const diagnosisCodesArr = [
    'Z57.1',
    'N30.0',
    'L60.1'
  ];
   
  useEffect(() => {
    if (id) {
      patientService
        .getById(id)
        .then((response) => {
          setPatient(response.data);
          console.log('Patient data fetched:', response.data);
        })
        .catch((error: unknown) => {
          console.error('Error fetching patient data:', error);
        });
    }
  }, [id]);

  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  if (!patient) {
    return <div>Loading...</div>;
  }

    const handleChange = (event: SelectChangeEvent<typeof formData.diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    
    setFormData((prev) => ({
      ...prev,
      diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [id]: id === 'healthCheckRating' ? Number(value) : value,  
  }));
  };

  const handleDateChange = (newDate: any) => {
    setFormData((prev) => ({ ...prev, date: newDate }));
  };
  const handleSickLeaveStartDate = (newDate: any) => {
    setFormData((prev) => ({ ...prev, sickLeaveStartDate: newDate }));
  };
  const handleSickLeaveEndDate = (newDate: any) => {
    setFormData((prev) => ({ ...prev, sickLeaveEndDate : newDate }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const result = await patientService.addEntry(patient.id, formData);
    // Add logic to handle form submission, e.g., API call
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries:</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ border: '1px solid black', padding: '10px', marginBottom: '50px'}}>
          <h3>Add New Entry</h3>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <TextField
              sx={{ margin: '10px' }} 
              id="description"
              label="Description"
              variant="standard"
              value={formData.description}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                  sx={{ margin: '10px' }} 
              />
            </LocalizationProvider>
            <TextField
              sx={{ margin: '10px' }} 
              id="specialist"
              label="Specialist"
              variant="standard"
              value={formData.specialist}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ margin: '10px' }} 
              id="healthCheckRating"
              label="Healthcheck Ratings"
              variant="standard"
              value={formData.healthCheckRating}
              onChange={handleInputChange}
              type="number"
            />
            <InputLabel id="demo-simple-select-label">diagnosisCodes</InputLabel>
             <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={formData.diagnosisCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
            {diagnosisCodesArr.map((code) => (
              <MenuItem
                key={code}
                value={code}
                style={getStyles(code, formData.diagnosisCodes, theme)} 
              >
                {code}
            </MenuItem>
          ))}
        </Select>
            <TextField
            sx={{ margin: '10px' }} 
              id="EmployerName"
              label="Employer Name"
              variant="standard"
              value={formData.EmployerName}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              label="Sick Leave Start Date"
             
                value={formData.sickLeaveStartDate}
                onChange={handleSickLeaveStartDate}
                renderInput={(params) => <TextField {...params} />}
                  sx={{ margin: '10px' }} 
              />
            </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              label="Sick Leave End Date"

                value={formData.sickLeaveEndDate}
                onChange={handleSickLeaveEndDate}
                renderInput={(params) => <TextField {...params} />}
                  sx={{ margin: '10px' }} 
              />
            </LocalizationProvider>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button   sx={{ margin: '10px' }} size="medium" type="submit" variant="outlined">
              Cancel
            </Button>
            <Button sx={{ margin: '10px' }}  size="medium" type="submit" variant="contained">
              Submit
            </Button>
           </div>
          </div>
       
        </div>
      </form>
      <EntryDetails entries={patient.entries} />
    </div>
  );
};

export default PatientData;