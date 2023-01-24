import axios from "axios";
import React from "react";
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientData, setDiagnosisData } from "../state";
import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";
import Entries from "./Entries";

const PatientDataPage = () => {
    const [{ patientData }, dispatch] = useStateValue();

    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            console.log(patient);
            const diagnosis = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
            console.log(diagnosis);
            dispatch(setPatientData(patient.data));
            dispatch(setDiagnosisData(diagnosis.data));
        };
        void fetchPatient();
    }, [dispatch]);

    return(
        <>
            <h2>{patientData?.name} <GenderIcon gender={patientData?.gender} /></h2>
            <div>ssh: {patientData?.ssn}</div>
            <div>occupation: {patientData?.occupation}</div>
            <h3>entries</h3>
            {patientData?.entries?.map(entry => <Entries key={entry.id} entry={entry} />)}
        </>
    );
};

export default PatientDataPage;