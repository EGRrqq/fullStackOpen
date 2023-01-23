import patients from '../../data/patients';
// @ts-ignore
import { v1 as uuid } from 'uuid';
import { NewPatient, PublicPatient , Patient } from '../types';

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
    const newEntry = {
        id,
        ...entry,
    };
    patients.concat(newEntry);

    return newEntry;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        throw new Error('There is no user with this id.');
    }

    return patient;
};

export default {
    getAll,
    addPatient,
    getPatient
};