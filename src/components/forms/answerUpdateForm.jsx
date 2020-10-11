import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {updateAnswer} from '../../actions/questionAction';
import { Button, Card, Divider, Label, Form, TextArea } from "semantic-ui-react";


const AnswerUpdate = (props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            answer: '',
        },

        validationSchema: Yup.object({
             answer: Yup.string()
               .min(10, 'Please enter at least 2 characters')
               .max(500, 'Please make sure you answer is less than 500 character')
               .required('Required'),
        }),

        onSubmit: (values) => {
            let data = {
                'answer': formik.values.answer,
            }
            data = JSON.stringify(data);
            dispatch(
                updateAnswer(props.id, data)
            )
        },
    });
    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <Card className="input-card">
                    <Card.Content>
                        <div className="input-label">Type Your Answer</div>
                        <Card.Description>
                            <Form.Field
                                control={TextArea}
                                name='answer'
                                value = {props.answer}
                                onChange={formik.handleChange}
                                required
                            />
                        </Card.Description>
                        <div className="errors">{formik.errors.answer}</div>
                        <div className="extra">
                            <div className="totalwords">500</div>
                            <button className="submit" type="submit" value="Submit">
                                Update
                  </button>
                        </div>
                    </Card.Content>
                </Card>
            </form>
        </>
    )
} 

export default AnswerUpdate;