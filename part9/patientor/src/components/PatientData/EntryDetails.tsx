import OccupationalHealthcare from './OccupationalHealthcare';
import { Entry } from '../../types';
import React from 'react';
import HealthCheckEntry from './HealthCheck';
import Hospotal from './Hospital';
import { assertNever } from '../../utils';
const EntryDetails: React.FC<{ entries: Entry[] }> = ({ entries }) => {
    return (
        <div>
            {entries.map((entry) => {
                 switch (entry.type) {
                    case "HealthCheck":
                        return <HealthCheckEntry key={entry.id} entry={entry} />;
                    case "OccupationalHealthcare":
                        return <OccupationalHealthcare key={entry.id}   entry={entry} />;
                    case "Hospital":
                        return <Hospotal key={entry.id}  entry={entry} />;
                    default:
                    return assertNever(entry);
                }
            })}
        </div>
    );
};

export default EntryDetails;