import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Card, Icon } from 'semantic-ui-react'
import '../styles/home.scss';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100vh', marginTop: '60px', paddingTop: '10px' }}>
                    <Link to='/app/tasks/'>
                    <Card className='card-browse'>
                            <Card.Description>
                                  Browse Tasks
                            </Card.Description>
                    </Card>
                    </Link>
                    <Link to='/app/post-task/'>
                        <Card className='card-create'>
                            <Card.Description>
                                  Create your task.
                             </Card.Description>
                    </Card>
                    </Link>
                </Typography>
            </Container>
        </React.Fragment>
    );
}