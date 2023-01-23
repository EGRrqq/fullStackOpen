import axios from "axios";
import React from "react";
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientData } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDataPage = () => {
    const [{ patientData }, dispatch] = useStateValue();

    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            console.log(patient);
            dispatch(setPatientData(patient.data));
        };
        void fetchPatient();
    }, [dispatch]);

    return(
        <>
            <h2>{patientData?.name}</h2>
            <div>ssh: {patientData?.ssn}</div>
            <div>occupation: {patientData?.occupation}</div>
        </>
    );
};

export default PatientDataPage;