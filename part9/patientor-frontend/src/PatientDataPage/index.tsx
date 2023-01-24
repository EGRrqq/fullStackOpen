import axios from "axios";
import React from "react";
import { useParams } from 'react-router-dom';
import { useStateValue, setPatientData, setDiagnosisData, addNewEntry } from "../state";
import { Patient, Diagnosis, newEntry, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import GenderIcon from "../components/GenderIcon";
import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";

import { Button } from "@material-ui/core";


const PatientDataPage = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [{ patientData }, dispatch] = useStateValue();

    const {id} = useParams<{id: string}>();

    const closeModal = (): void => {
        setModalOpen(false);
    };
    const openModal = (): void => setModalOpen(true);

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

    const submitNewEntry = async(values: newEntry) =>{
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const {data: newEntry} = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientData?.id}/entries`,
                values);
            dispatch(addNewEntry(newEntry));
            closeModal();
        } catch (error: unknown){
            if (axios.isAxiosError(error)) {
                console.error(error?.response?.data || "Unrecognized axios error");
            } else {
                console.error("Unknown error", error);
            }
        }
    };

    return(
        <>
            <h2>{patientData?.name} <GenderIcon gender={patientData?.gender} /></h2>
            <div>ssh: {patientData?.ssn}</div>
            <div>occupation: {patientData?.occupation}</div>
            <h3>entries</h3>
            <div>
                {patientData?.entries?.map(entry => <Entries key={entry.id} entry={entry} />)}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onClose={closeModal}
                onSubmit={submitNewEntry}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Occupational healthcare Entry
            </Button>
        </>
    );
};

export default PatientDataPage;