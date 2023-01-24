import React from "react";
import AddEntryForm from "./AddEntryForm";
import { newEntry } from '../types';

import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: newEntry ) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new Occupational Healthcare</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;