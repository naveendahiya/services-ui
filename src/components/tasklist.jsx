import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TaskCard from './taskcard';
import apiClient from "../config/apiclient";

const Tasks = () => {
     const [tasks, setTasks] = useState([]);

   useEffect(() => {
        apiClient.get('/tasks/')
            .then(res => {
                setTasks(res.data);
                console.log(res.data);
            })
    }, []);

    const List = () => {
        const products = tasks.map((task) =>
            <TaskCard  task={task} key={task.title} />
        )
        return (
            products
        )
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Typography component="div" style={{ backgroundColor: 'white', height: 'fit-content', marginTop: '60px', paddingTop: '10px' }}>
                    {List()}
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default Tasks;