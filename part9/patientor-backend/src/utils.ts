import {
    Gender,
    NewPatient,
    newEntry,
    HealthCheckRating
} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }

    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }

    return description;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};

const parseCriteria = (value: unknown):string => {
    if(!value || !isString(value)) throw new Error("Invalid criteria");
    return value;
};

const parseHealthRate = (rate: unknown): HealthCheckRating => {
    if(!rate || !isHealthCheckRate(rate)) throw new Error("Invalid or missing rating");
    return rate;
};

const isHealthCheckRate = (rate: unknown): rate is HealthCheckRating=>{
    return typeof rate === 'number';
};

type EntryFields = {description: string,
    date: unknown,
    specialist: unknown,
    employerName: unknown,
    criteria: unknown,
    healthCheckRating: unknown,
    type: string,
    dischargeDate: unknown
};

export const toNewEntry = ({ description, date, specialist, employerName, criteria, healthCheckRating, type, dischargeDate }: EntryFields): newEntry =>{
    if (type === "OccupationalHealthcare") {
        return {
            description: parseDescription(description),
            date: parseDate(date),
            specialist: parseName(specialist),
            type: "OccupationalHealthcare",
            employerName: parseName(employerName)
        };
    } else if (type === "Hospital") {
        return {
            description: parseDescription(description),
            date: parseDate(date),
            specialist: parseName(specialist),
            type: "Hospital",
            discharge: {
                date: parseDate(dischargeDate),
                criteria: parseCriteria(criteria)
            }
        };
    }

    return{
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        type: "HealthCheck",
        healthCheckRating: parseHealthRate(healthCheckRating),
    };
};

export default toNewPatient;