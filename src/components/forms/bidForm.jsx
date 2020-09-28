import React from 'react'
import {Button, Card, Modal, Form, TextArea, Input, Checkbox} from 'semantic-ui-react';
import '../../styles/bidForm.scss';
import { useFormik } from "formik";
import * as Yup from 'yup';
import apiClient from "../../config/apiclient";

const { forwardRef,  useImperativeHandle } = React;


const OfferCreate = (props) => {

    const formik = useFormik({

        initialValues: {
            offer: '',
            comment: '',
            task: parseInt(props.taskid),
            creator: 1,
        },

        validationSchema: Yup.object({
             offer: Yup.number()
                 .required('Required'),
            comment: Yup.string()
                .min(25, 'Please enter at least 25 characters')
                .required('Required'),
        }),

        onSubmit: async(values) => {
            alert(JSON.stringify(values, null, 2));

            let data = {
               'comment': formik.values.comment,
                'offer': formik.values.offer,
                'task': formik.values.task,
                'creater': formik.values.creator
            };
            data = JSON.stringify(data);
            await apiClient.post(`/bids/`, data)
                .then(res => {
                    console.log(res);
                })

        },

    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <Card className='input-price' >
                <Card.Content>
                    <div className='price-label' >Price</div>
                    <Card.Description>
                        <Form.Field  placeholder='500' control='input' type='number' name='offer'  onChange={formik.handleChange}  />
                    </Card.Description>
                    <div className='errors'>{formik.errors.offer}</div>
                </Card.Content>
            </Card>
            <Card className='input-desc' >
                <Card.Content>
                    <div className='description-label' >Description</div>
                    <Card.Description>
                        <Form.Field
                            control={TextArea}
                             name='comment'
                             onChange={formik.handleChange}
                            placeholder='Write brief summary on how you will perform the task.'
                        />
                    </Card.Description>
                    <div className='errors'>{formik.errors.comment}</div>
                </Card.Content>
            </Card>
            <div className='form-controls'>
                <Button
                    content="Nope"
                    positive
                    className='nope-button'
                    onClick={() => props.open}
                />
                <Button
                    type='submit'
                    content="Submit"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    className='submit-button'
                />
            </div>

        </form>

    );


}


const BidForm = forwardRef((props, ref) =>  {
    const [open, setOpen] = React.useState(false)

    const Open = () => {
        setOpen(false);
    }
        useImperativeHandle(ref, () => ({
        onOpen(){
            setOpen(true);
        }
    }));

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header className='bid-form-heading' >Make a offer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <OfferCreate open={Open} taskid={props.id} />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
})

export default BidForm;