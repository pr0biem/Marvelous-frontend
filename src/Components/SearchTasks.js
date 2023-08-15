import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function CreateTask(props) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        props.onSearchInput(search);
    }, [search, props])

    return  (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    size="small"
                    />
            </Grid>
        </Grid>
    )
}