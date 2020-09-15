import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
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
    TextArea,
} from 'semantic-ui-react';
import * as Yup from 'yup';
import apiClient from "../config/apiclient";
import {
    useHistory
} from "react-router-dom";

const TaskCreate = () => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    let history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    },[])

    const formik = useFormik({

        initialValues: {
            title: '',
            description: '',
            suburb: '',
            price: '',
            startDate: new Date(),
            address: '',
            latitude: latitude,
            longtiude: longitude,
        },

        validationSchema: Yup.object({

            title: Yup.string()
                .max(50, 'Please enter at least 10 characters and a maximum of 50')
                .min(10, 'Please enter at least 10 characters and a maximum of 50')
                .required('Required'),

            description: Yup.string()
                .min(25, 'Please enter at least 25 characters')
                .required('Required'),

            price: Yup.number()
                .required('Required'),

            address: Yup.string()
                .min(20, 'Please provide a detailed address')
                .required('Required'),

            suburb: Yup.number()
                .required('Required'),

            latitude: Yup.number(),
            longitude: Yup.number(),
            startDate: Yup.date(),

        }),

        onSubmit: async(values) => {
            alert(JSON.stringify(values, null, 2));
            let data = {
                'description': formik.values.description,
                'price': parseFloat(formik.values.price),
                'title': formik.values.title,
                'due_date': formik.values.startDate,
                'status': 'O',
                'creater': 1,
            };
            data = JSON.stringify(data);
            let task_id = -1;
            await apiClient.post(`/tasks/`, data)
                    .then(res => {
                        console.log(res);
                        task_id = res.data.id;
                    })
            let data2 = {
                'address':  formik.values.address,
                'latitude': parseFloat(formik.values.latitude),
                'longitude': parseFloat(formik.values.longtiude),
                'pincode': parseFloat(formik.values.suburb),
                'task': parseFloat(task_id),
            }
            data2 = JSON.stringify(data2);
            await apiClient.post(`/locations/`, data2)
                    .then(res => {
                        console.log(res);
                    })
            if(task_id !== -1){
                return(
                history.push({
                    pathname: `/app/tasks/${task_id}`,
                    state: { task: data }
                })
                )
            }
        },

    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label' >What you need done?</div>
                    <Card.Description>
                        <Form.Field
                            control={Input}
                            name='title'
                            value={formik.values.title}
                            placeholder='e.g moving my sofa'
                            onChange={formik.handleChange}
                        />
                    </Card.Description>
                    <div className='errors'>{formik.errors.title}</div>
                </Card.Content>
            </Card>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label' >What are the details?</div>
                    <Card.Description>
                        <Form.Field
                            control={TextArea}
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder='Be as specific as you can about what needs doing'
                        />
                    </Card.Description>
                    <div className='errors'>{formik.errors.description}</div>
                </Card.Content>
            </Card>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label' >Suburb</div>
                    <Card.Description>
                        <Form.Field>
                            <Input icon='location arrow' name='suburb' iconPosition='left' value={formik.values.suburb} onChange={formik.handleChange}     placeholder='Pincode' />
                        </Form.Field>
                    </Card.Description>
                    <div className='errors'>{formik.errors.suburb}</div>
                </Card.Content>
            </Card>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label' >When do you need it done?</div>
                    <Card.Description>
                        <Form.Field>
                            <DatePicker selected={formik.values.startDate} onChange={formik.handleChange} />
                        </Form.Field>
                    </Card.Description>
                </Card.Content>
            </Card>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label' >What is your budget?</div>
                    <Card.Description>
                        <Form.Field>
                            <Input icon='dollar sign' type='number' iconPosition='left' placeholder='Amount' name='price' value={formik.values.price} onChange={formik.handleChange} />
                        </Form.Field>
                    </Card.Description>
                    <div className='errors'>{formik.errors.price}</div>
                </Card.Content>
            </Card>

            <Card className='input-card' >
                <Card.Content>
                    <div className='input-label'>Address</div>
                    <Card.Description>
                        <Form.Field
                            control={TextArea}
                            placeholder='write your full addresss'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            name='address'
                        />
                    </Card.Description>
                    <div className='errors'>{formik.errors.address}</div>
                </Card.Content>
            </Card>

            <Form.Field
                control={Checkbox}
                label='I agree to the Terms and Conditions'
            />

            <div className='task-form-actions'>
                <Button
                    type='submit'
                    content="Submit"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    className='submit-button-task'
                />
            </div>
        </form>
    );

};

export default function TaskForm() {
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: 'fit-content', marginTop: '60px', paddingTop: '10px' }}>
                    <div className='task-create-form'>
                        <div className='heading'>Tell us what you need done?</div>
                    <TaskCreate />
                    </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}
