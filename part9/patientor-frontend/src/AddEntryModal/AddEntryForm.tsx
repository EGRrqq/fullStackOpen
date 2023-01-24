import React from "react";
import { newEntry } from "../types";
import { useStateValue } from '../state';
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";

import { Grid, Button } from "@material-ui/core";

interface Props {
    onSubmit: (values: newEntry) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                specialist: '',
                date: '',
                type: 'OccupationalHealthcare',
                employerName: ''
            }}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="diagnosed by..."
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Name of Employer"
                            placeholder="Employer name..."
                            name="employerName"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;