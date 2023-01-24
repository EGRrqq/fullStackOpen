import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "SET_DIAGNOSIS_DATA";
      payload: Diagnosis[]
    }
  |
    {
      type: "ADD_NEW_ENTRY";
      payload: Entry
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patientData: action.payload
      };
    case "SET_DIAGNOSIS_DATA":
      return{
        ...state,
        diagnosis: action.payload
      };
    case "ADD_NEW_ENTRY":
      const patientUpdatedData = state.patientData;
      patientUpdatedData?.entries?.push(action.payload);
      return{
        ...state,
        patientData: patientUpdatedData
      };
    default:
      return state;
  }
};

export const setPatientList = (list: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: list
  };
};

export const setPatientData = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  };
};

export const addNewPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosisData = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_DATA",
    payload: diagnosis
  };
};

export const addNewEntry = (entry: Entry): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload: entry
  };
};