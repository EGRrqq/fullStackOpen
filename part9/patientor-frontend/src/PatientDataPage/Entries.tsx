import { Entry } from '../types';
import OccupationalEntry from './OccupationalEntry';
import HospitalEntry from './HospitalEntry';
import HealthEntry from './HealthCheckEntry';

const assertNever = (value: never): never => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Value ${value} has not been handled`);
};

const Entries = ({ entry }: { entry: Entry }) => {
    switch(entry.type){
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />;
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default Entries;