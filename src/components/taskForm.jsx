import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/taskForm.scss';
import {
    Button, Card,
    Checkbox,
    Form,
    Input,
    Radio,
    TextArea,
} from 'semantic-ui-react';
import apiClient from "../config/apiclient";


export default function TaskForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [suburb,  setSuburb] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [taskid, setTaskid] = useState(0);

    //errors
    const [errortitle, setErrortitle] = useState('');
    const [errordescription, setErrordescription] = useState('');
    const [errorprice, setErrorprice] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    },[])

    const submit = async () => {
        if(title.length <= 10 ||  title.length >=50 ){
           await setErrortitle('Please enter at least 10 characters and a maximum of 50');
        }else{
           await setErrortitle('');
        }

        if(description.length < 25){
            setErrordescription('Please enter at least 25 characters');
        }else{
            setErrordescription('');
        }
        let data = {
            'description': description,
            'price': parseFloat(price),
            'title': title,
            'due_date': startDate,
            'status': 'O',
            'creater': 1,
        };
        data = JSON.stringify(data);
        if(errortitle === '' && errordescription === ''){
            console.log(data);
            await apiClient.post(`/tasks/`, data)
                .then(res => {
                   console.log(res);
                   setTaskid(res.data.id);
                })
        }
        let data2 = {
            'address':  address,
            'latitude': latitude,
            'longitude': longitude,
            'pincode': suburb,
            'task': taskid
        }
        data2 = JSON.stringify(data2);
        apiClient.post(`/locations/`, data)
            .then(res => {
                console.log(res);
            })

    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: 'fit-content', marginTop: '60px', paddingTop: '10px' }}>
                    <div className='task-create-form'>
                        <div className='heading'>Tell us what you need done?</div>

                        <Form>
                                <Card className='input-card' >
                                    <Card.Content>
                                        <div className='input-label' >What you need done?</div>
                                        <Card.Description>
                                            <Form.Field
                                                control={Input}
                                                  value={title}
                                                placeholder='e.g moving my sofa'
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </Card.Description>
                                        <div className='errors'>{errortitle}</div>
                                    </Card.Content>
                                </Card>
                                <Card className='input-card' >
                                    <Card.Content>
                                        <div className='input-label' >What are the details?</div>
                                        <Card.Description>
                                            <Form.Field
                                                control={TextArea}
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                placeholder='Be as specific as you can about what needs doing'
                                            />
                                        </Card.Description>
                                        <div className='errors'>{errordescription}</div>
                                    </Card.Content>
                                </Card>
                            <Card className='input-card' >
                                <Card.Content>
                                    <div className='input-label' >Suburb</div>
                                    <Card.Description>
                                        <Form.Field>
                                            <Input icon='location arrow' iconPosition='left' value={suburb} onChange={e => setSuburb(e.target.value)} placeholder='Pincode' />
                                        </Form.Field>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card className='input-card' >
                                <Card.Content>
                                    <div className='input-label' >When do you need it done?</div>
                                    <Card.Description>
                                        <Form.Field>
                                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                                        </Form.Field>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card className='input-card' >
                                <Card.Content>
                                    <div className='input-label' >What is your budget?</div>
                                    <Card.Description>
                                        <Form.Field>
                                            <Input icon='dollar sign' iconPosition='left' placeholder='Amount' value={price} onChange={e => setPrice(e.target.value)} />
                                        </Form.Field>
                                    </Card.Description>
                                </Card.Content>
                                <div className='errors'>{errorprice}</div>
                            </Card>
                            <Card className='input-card' >
                                <Card.Content>
                                    <div className='input-label' >Address</div>
                                    <Card.Description>
                                        <Form.Field
                                            control={TextArea}
                                            placeholder='write your full addresss'
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </Card.Description>
                                </Card.Content>
                            </Card>

                            <Form.Field
                                control={Checkbox}
                                label='I agree to the Terms and Conditions'
                            />
                            <div className='task-form-actions'>
                                <Button
                                    content="Submit"
                                    labelPosition='right'
                                    icon='checkmark'
                                    positive
                                    className='submit-button-task'
                                    onClick={submit}
                                />
                            </div>
                        </Form>

                    </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}