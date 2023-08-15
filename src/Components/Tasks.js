import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';

import CreateTask from "./CreateTask";
import IncompleteTasks from "./IncompleteTasks";
import CompleteTasks from "./CompleteTasks";
import SearchTasks from "./SearchTasks";
import DeleteAll from "./DeleteAll";

import '../Styles/all.css';


export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchingTerm, setSearchingTerm] = useState(false);
    
    const sortTasks = (taskArray) => {
        taskArray.sort((a, b) => {
            if (a.description < b.description) {
                return -1;
            } else if (a.description > b.description) {
                return 1;
            } else {
                return 0;
            }
        });

        let tempIncomplete = []
        let tempComplete = []
        
        taskArray.map(t => {
            if (t.status === 'complete') {
                return tempComplete.push(t);
            } else {
                return tempIncomplete.push(t);
            }
        });

        setIncompleteTasks(tempIncomplete);
        setCompleteTasks(tempComplete);
    }
    
    const getTasks = () => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data =>  {
                setTasks(data);
                sortTasks(data);

                if (searchingTerm) {
                    setSearchingTerm('');
                }
            })
            .catch(error => console.log("Error", error));
    }

    const handleNewTask = () => {
        getTasks();
    }

    const handleUpdate = (task) => () => {
        let updatedTask = {}
        if (task.status !== 'complete') {
             updatedTask = {
                ...task,
                status: 'complete'
            }
        } else {
            updatedTask = {
               ...task,
               status: 'incomplete',
               completed_at: ''
           }
        }

        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updatedTask})
        })
        .then(getTasks)
        .catch(error => console.log("Error", error));
    };

    const handleSearchInput = (searchTerm) => {
        if (searchTerm.length > 0) {
            setFilteredTasks(tasks.filter((task) => {
                return task.description.toLowerCase().includes(searchTerm.toLowerCase())
            }));
        } else {
            setFilteredTasks(tasks);
        }
    }

    const handleDeleteAllTasks = () => {
        fetch('http://localhost:3000/tasks/all', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(getTasks)
        .catch(error => console.log("Error", error));
    }
    
    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        sortTasks(filteredTasks);
    }, [filteredTasks]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h1 className="header">Marvelous v2.0</h1>
                </Grid>
                <Grid item xs={5} />
                <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-end'}} className="deleteAll">
                    <DeleteAll handleDeleteAllTasks={handleDeleteAllTasks}/>
                </Grid>
                <Grid container spacing={2} className="taskSearchGridContainer">
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                        <CreateTask onNewTask={handleNewTask} />
                    </Grid>
                    <Grid item xs={4} />

                    <Grid item xs={2}>
                        <SearchTasks searchingTerm={searchingTerm} onSearchInput={handleSearchInput} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={5} className="leftPaddingOverride">
                    <IncompleteTasks tasks={incompleteTasks} handleUpdate={handleUpdate}/>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4} className="leftPaddingOverride">
                    <CompleteTasks tasks={completeTasks} handleUpdate={handleUpdate}/>
                </Grid>
            </Grid>
        </div>
    )
}