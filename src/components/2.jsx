import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../styles/taskForm.scss';


export default function TaskForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [suburb,  setSuburb] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');

    const [taskid, setTaskid] = useState(0);

    //errors
    const [errortitle, setErrortitle] = useState('');
    const [errordescription, setErrordescription] = useState('');
    const [errorprice, setErrorprice] = useState('');




    const submit = async (e) => {
        e.preventDefault();
        if(title.length <= 10 ||  title.length >=50 ){
           await setErrortitle('Please enter at least 10 characters and a maximum of 50');
        }else{
           await setErrortitle('');
        }

        if(description.length < 25){
            await setErrordescription('Please enter at least 25 characters');
        }else{
            await setErrordescription('');
        }




    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: 'fit-content', marginTop: '60px', paddingTop: '10px' }}>
                    <div className='task-create-form'>

                        <Form>









                        </Form>


                </Typography>
            </Container>
        </React.Fragment>
    );
}