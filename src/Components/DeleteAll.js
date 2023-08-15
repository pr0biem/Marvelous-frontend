import { useState } from 'react';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteAll(props) {
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDeleteAllTasks = () => {
        props.handleDeleteAllTasks();
        setOpen(false);
    };
    return (
        <div>
            <Button size="small" onClick={handleOpenDialog}>Delete All Tasks</Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Are you sure you want to delete all tasks?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDeleteAllTasks} color="secondary">
                    Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}