import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Card, Icon } from 'semantic-ui-react'
import '../styles/home.scss';

export default function Home() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100vh', marginTop: '60px', paddingTop: '10px' }}>
                    <Card className='card-browse'>
                            <Card.Description>
                                  Browse Tasks
                            </Card.Description>
                    </Card>
                    <Card className='card-create'>
                            <Card.Description>
                                  Create your task.
                             </Card.Description>
                    </Card>
                </Typography>
            </Container>
        </React.Fragment>
    );
}