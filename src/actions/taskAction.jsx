import apiClient from '../config/apiclient';

import {
    GET_TASK,
    GET_TASK_PENDING,
    GET_TASK_ALL,
    GET_TASK_ALL_PENDING,
    TASK_DELETE, 
    TASK_DELETE_PENDING,
    TASK_UPDATE,
    TASK_UPDATE_PENDING,
    CREATE_TASK,
    CREATE_TASK_PENDING,
    TASK_API_ERROR,
} from './taskActionType';

const apiDispatch = (actionType = '', data) => {
    return{
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return{
        type: TASK_API_ERROR,
        error,
    }
}

export const getTask = (id, params) => {
    let apiUrl = `/tasks/${id}`;
    
    return dispatch => {
        dispatch(apiDispatch(GET_TASK_PENDING, true));

        apiClient
          .get(apiUrl)
          .then(res => {
            dispatch(apiDispatch(GET_TASK_PENDING, false));
            dispatch(apiDispatch(GET_TASK, res.data));
          })
          .catch(error => {
            dispatch(apiError(error));
          })
    }
}


export const getAllTasks = params => {
    let apiUrl = '/tasks/';

    return dispatch => {
        dispatch(apiDispatch(GET_TASK_ALL_PENDING, true));

        apiClient
          .get(apiUrl)
          .then(res => {
             dispatch(apiDispatch(GET_TASK_ALL_PENDING, false));
             dispatch(apiDispatch(GET_TASK_ALL, res.data));
          })
          .catch(error => {
            dispatch(apiError(TASK_API_ERROR, error));
          })
    }
}


export const createTask = taskObj => {
    const apiUrl = '';

    return (dispatch, getState) => {
        dispatch(apiDispatch(CREATE_TASK_PENDING, true));

        apiClient
          .post(apiUrl, taskObj)
          .then(res => {
             dispatch(apiDispatch(CREATE_TASK_PENDING, false));
             dispatch(apiDispatch(CREATE_TASK, res.data));
          })
          .catch(error => {
             dispatch(apiError(TASK_API_ERROR,error));
          })
    }
}