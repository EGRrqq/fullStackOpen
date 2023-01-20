"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
// @ts-ignore
const uuid_1 = require("uuid");
const getAll = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id }, entry);
    patients_json_1.default.push(newEntry);
    return newEntry;
};
exports.default = {
    getAll,
    addPatient
};
