import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/taskForm.scss';
import {
    Button,
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
                <Typography component="div" style={{ backgroundColor: 'white', height: '100vh', marginTop: '60px', paddingTop: '10px' }}>
                    <div className='task-create-form'>
                        <div className='heading'>Tell us what you need done?</div>

                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='What you need done?'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='e.g. Help move my sofa'
                                />
                                <Form.Field
                                    control={TextArea}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    label='What are the details?'
                                    placeholder='Be as specific as you can about what needs doing'
                                />
                            </Form.Group>
                            <Form.Group inline>
                                <label>Where do you need it done?</label>
                                <Form.Field
                                    control={Radio}
                                    label='Online'
                                    value='Online'
                                    checked={value === 'Online'}
                                    onChange={() => setValue('Online')}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='InPerson'
                                    value='InPerson'
                                    checked={value === 'InPerson'}
                                    onChange={() => setValue('InPerson')}
                                />
                            </Form.Group>
                            <Form.Field>
                            <Input icon='location arrow' iconPosition='left' value={suburb} onChange={e => setSuburb(e.target.value)} placeholder='Pincode' />
                            </Form.Field>
                            <Form.Field>
                                <label>When do you need it done?</label>
                                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                            </Form.Field>
                            <Form.Field>
                                <label>What is your budget?</label>
                                <Input icon='dollar sign' iconPosition='left' placeholder='Amount' value={price} onChange={e => setPrice(e.target.value)} />
                            </Form.Field>
                            <Form.Field
                                control={TextArea}
                                label='Address'
                                placeholder='write your full addresss'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            <Form.Field
                                control={Checkbox}
                                label='I agree to the Terms and Conditions'
                            />
                            <Form.Field control={Button} onClick={submit}>Submit</Form.Field>
                        </Form>

                    </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}