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



export default function TaskForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('Online');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [suburb,  setSuburb] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    },[])

    const submit = () => {
        const data = {
            'description': description,
            'price': price,
            'title': title,
            'due_date': startDate,
            'status': 'Open',
            'creater': 1,
        };
        console.log(data);
        console.log(latitude);
        console.log(longitude);
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
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </Card.Description>
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
                                />
                            </div>
                        </Form>

                    </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}