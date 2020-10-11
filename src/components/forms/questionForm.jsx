import React from 'react';
import { Button, Card, Divider, Label, Form, TextArea } from "semantic-ui-react";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {createQuestion} from '../../actions/questionAction';
import * as Yup from 'yup';

const QuestionCreate = (props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            question: '',
            creater: parseInt(localStorage.getItem('user_id')),
            task: props.id,
        },

        validationSchema: Yup.object({
            question: Yup.string()
                .min(10, 'Please enter at least 10 characters')
                .max(500, 'Please make sure your question in less than 500 characters in lenght')
                .required('Required'),
        }),

        onSubmit: (values) => {
             let data = {
                 'question': formik.values.question,
                 'creater': formik.values.creater,
                 'task': formik.values.task
             }
             data = JSON.stringify(data);
             
             dispatch(
                 createQuestion(data)
             )
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Card className="input-card">
                    <Card.Content>
                        <div className="input-label">Type Your Question</div>
                        <Card.Description>
                            <Form.Field
                                control={TextArea}
                                name='question'
                                onChange={formik.handleChange}
                                required
                            />
                        </Card.Description>
                        <div className="errors">{formik.errors.question}</div>
                        <div className="extra">
                            <div className="totalwords">500</div>
                            <button className="submit" type="submit" value="Submit">
                                Post
                  </button>
                        </div>
                    </Card.Content>
                </Card>
            </form>
        </>
    )
}


export default QuestionCreate;