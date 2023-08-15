import {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CompleteTasks(props) {
    const [completeTasks, setCompleteTasks] = useState([]);

    useEffect(() => {
        setCompleteTasks(props.tasks);

    }, [props.tasks])

    return (
        <Grid 
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            >
                <List disablePadding subheader={
                    <ListSubheader sx={{textAlign: 'left', padding: 0, paddingTop: '24px', fontSize: '24px'}} component="div">
                        Done
                    </ListSubheader>
                }>
                {completeTasks.slice(0, 10).map(task => (
                    <ListItem
                        key={task.id}
                        disablePadding>
                            <ListItemButton sx={{padding: 0}} role={undefined} onClick={props.handleUpdate(task)} dense disableRipple>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disableRipple
                                        checked={true}
                                        inputProps={{ 'aria-labelledby': task.id }}  
                                    />
                                </ListItemIcon>
                                <ListItemText id={task.id} primary={task.description} />
                            </ListItemButton>
                        </ListItem>
                ))}

                </List>
            </Grid>
    )
}