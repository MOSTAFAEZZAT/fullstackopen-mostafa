import OccupationalHealthcareEntry from '../../types/OccupationalHealthcareEntry';
import WorkIcon from '@mui/icons-material/Work';
const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  
  return (
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
      <h3>Occupational Healthcare</h3>
      <p>Employer: {entry.date} <WorkIcon/>{entry.employerName}</p>
      <p>Description:  {entry.description}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};
export default OccupationalHealthcare;