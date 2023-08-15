import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import '../Styles/CreateTask.css';

export default function CreateTask(props) {
    const [description, setDescription] = useState('');

    const createNewTask = () => {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'description': description})
        }).then(response => {
            if (response.ok) {
                setDescription('');
                props.onNewTask();
            } else {
                console.log(response);
            }
        }).catch(error => console.log("error", error));
    }

    return  (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Task Description"
                    variant="outlined"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    size="small"
                    />
            </Grid>
            <Grid item xs={4}>
                    <Button 
                        fullWidth
                        variant="contained" 
                        size="medium" 
                        disableElevation 
                        onClick={createNewTask}
                        className="createTaskButton"
                    >
                        Add
                    </Button>
            </Grid>
        </Grid>
    )
}