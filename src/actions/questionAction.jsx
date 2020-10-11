import { FastField } from 'formik';
import apiClient from '../config/apiclient';

import{
    GET_TASK_QUESTIONS,
    GET_TASK_QUESTIONS_PENDING, 
    GET_QUESTIONS_ERROR,
    CREATE_ANSWER,
    UPDATE_ANSWER,
    CREATE_QUESTION,
    UPDATE_QUESTION,
    CREATE_ANSWER_PENDING,
    CREATE_QUESTION_PENDING,
    UPDATE_ANSWER_PENDING,
    UPDATE_QUESTION_PENDING,
} from './questionActionType';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType, 
        payload: data,
    };
};


export const createQuestion = (questionObj) => {
    let apiUrl = '/questions/';

    return (dispatch) => {
        dispatch(apiDispatch(CREATE_QUESTION_PENDING, true))

        apiClient
         .post(apiUrl, questionObj)
         .then(res => {
             dispatch(apiDispatch(CREATE_QUESTION_PENDING, false))
             dispatch(apiDispatch(CREATE_QUESTION, res.data))
         })
         .catch(error => {
             dispatch(apiDispatch(CREATE_QUESTION_PENDING, false))
             console.log(error.response);
         })
    }
}

export const createAnswer = (answerObj) => {
    let apiUrl = '/answers/';

    return (dispatch) => {
        dispatch(apiDispatch(CREATE_ANSWER_PENDING, true));

        apiClient
         .post(apiUrl, answerObj)
         .then(res => {
             dispatch(apiDispatch(CREATE_ANSWER, res.data));
             dispatch(apiDispatch(CREATE_ANSWER_PENDING, false));
         })
         .catch(error => {
             console.log(error.response);
             dispatch(apiDispatch(CREATE_ANSWER_PENDING, false));
         })
    }
}

export const updateQuestion = (id, questionObj) => {
    let apiUrl = `'/questions/${id}'`;

    return (dispatch) => {
        dispatch(apiDispatch(UPDATE_QUESTION_PENDING, true));

        apiClient
         .patch(apiUrl, questionObj)
         .then(res => {
             console.log(res);
         })
         .catch(error => {
             console.log(error);
         })
    }
}

export const updateAnswer = (id, answerObj) => {
    let apiUrl = `'/answers/${id}'`;

    return (dispatch) => {
        dispatch(apiDispatch(UPDATE_ANSWER_PENDING, true));

        apiClient
         .patch(apiUrl, answerObj)
         .then(res => {
             console.log(res);
         })
         .catch(error => {
             console.log(error);
         })
    }
}

export const getTaskQuestions = (id, params) => {
    let apiUrl = `/questions/?task=${id}`;

    return dispatch => {
        dispatch(apiDispatch(GET_TASK_QUESTIONS_PENDING, true));

        apiClient
         .get(apiUrl)
         .then(res => {
             dispatch(apiDispatch(GET_TASK_QUESTIONS, res.data))
             dispatch(apiDispatch(GET_TASK_QUESTIONS_PENDING, false))
         })
         .catch(error => {
             console.log(error.response);
            //  dispatch(apiDispatch(GET_QUESTIONS_ERROR, error.response))
         })
    }
}