import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';

const HealthEntry = ({ entry }: { entry: HealthCheckEntry }) => {
    const [{diagnosis}, ] = useStateValue();

    return(
        <div>
            Description: {entry.description} <br/>
            Diagnosed by: {entry.specialist}<br />
            Health Rate: {entry.healthCheckRating}<br/>
            <ul>
                {entry.diagnosisCodes?.map(code => <li key={code}>
                    {code} {diagnosis.find(diagnose => diagnose.code == code)?.name}
                </li>)}
            </ul>
        </div>
    );
};

export default HealthEntry;