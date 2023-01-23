export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}