import apiClient from '../config/apiclient';
import { PAGINATION_LOADING } from './paginationActionType';
import {ErrorMsg} from '../config/utils';
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
    ADD_TASKS,
    SET_COUNT
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
            let status = error.response.status;
            let msg = ErrorMsg(status)
            dispatch(apiDispatch(GET_TASK_PENDING, false));
            dispatch(apiError([status, msg]));
          })
    }
}


export const getAllTasks = (pageno) => {
    let apiUrl = `/tasks/?page=${pageno}`;

    return dispatch => {
        dispatch(apiDispatch(GET_TASK_ALL_PENDING, true));

        apiClient
          .get(apiUrl)
          .then(res => {
             dispatch(apiDispatch(GET_TASK_ALL_PENDING, false));
             dispatch(apiDispatch(GET_TASK_ALL, res.data.results));
             dispatch(apiDispatch(SET_COUNT, res.data.count))
          })
          .catch(error => {
            console.log(error)
            dispatch(apiDispatch(GET_TASK_ALL_PENDING, false))
            let status = error.response.status;
            let msg = ErrorMsg(status);
            dispatch(apiError([status, msg]));
          })
    }
}



export const addTasks = (pageno) => {
    let apiUrl = `/tasks/?page=${pageno}`;

    return dispatch => {
        apiClient
          .get(apiUrl)
          .then(res => {
             dispatch(apiDispatch(ADD_TASKS, res.data.results));
             dispatch(apiDispatch(PAGINATION_LOADING, true))
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