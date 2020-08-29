import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TaskCard from './taskcard';

const Tasks = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100%', marginTop: '60px', paddingTop: '10px' }}>
                   <TaskCard />
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default Tasks;