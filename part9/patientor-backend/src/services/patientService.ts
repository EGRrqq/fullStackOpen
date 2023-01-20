import patients from '../../data/patients';
// @ts-ignore
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatientData, Patient } from '../types';

const getAll = (): Array<NonSensitivePatientData> => {
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

    const newEntry = {
        id,
        ...entry,
    };
    patients.push(newEntry);

    return newEntry;
};

export default {
    getAll,
    addPatient
};