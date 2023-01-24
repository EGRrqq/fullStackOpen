import patients from '../../data/patients';
// @ts-ignore
import { v1 as uuid } from 'uuid';
import { NewPatient, PublicPatient , Patient, newEntry, Entry } from '../types';

const getAll = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...entry,
    };
    patients.push(newPatient);

    return newPatient;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error('There is no user with this id.');
    }

    return patient;
};

const addNewEntry = (entry: newEntry, patientId: string): Entry => {
    const id: string = uuid();
    const newEntry = {
        id,
        ...entry
    };
    const patient = patients.find(patient => patient.id === patientId);
    patient?.entries.push(newEntry);

    return newEntry;
};

export default {
    getAll,
    addPatient,
    getPatient,
    addNewEntry
};