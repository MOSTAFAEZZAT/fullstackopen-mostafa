import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Hospital = ({entry}) => {
     if(entry.healthCheckRating >0) {
        return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <p>Employer: {entry.date} <MedicalServicesIcon />  </p>
            <p>Description:  {entry.description}</p>
            <FavoriteIcon sx={{ color: 'yellow' }} />
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
      );
    }else{
        return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <p>Employer: {entry.date} <MedicalServicesIcon /> </p>
            <p>Description:  {entry.description}</p>
            <FavoriteIcon sx={{ color: 'green' }} />
            <p>Diagnosed by: {entry.specialist}</p>
         </div>
        );
    }
};  
export default Hospital;