import { HospitalEntry as HostEntry } from '../types';
import { useStateValue } from '../state';

const HospitalEntry = ({entry}: {entry: HostEntry}) => {
    const [{diagnosis}, ] = useStateValue();
    return(
        <>
            <div>
                <p>
                    {entry.description}
                    diagnosed by: {entry.specialist}
                    Discharged at {entry.discharge.date}
                    reason: {entry.discharge.criteria}
                </p>
                <ul>
                    {entry.diagnosisCodes?.map(code => <li key={code}>
                        {code} {diagnosis.find(diagnose => diagnose.code == code)?.name}
                    </li>)}
                </ul>
            </div>
        </>
    );
};

export default HospitalEntry;