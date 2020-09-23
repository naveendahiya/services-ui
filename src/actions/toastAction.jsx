import {
    TOAST_ERROR, 
    TOAST_SUCCESS,
    TOAST_MESSAGE,
} from './toastActionType';

const apiDispatch = (ActionTypes = '', data) => {
    return{
        type: ActionTypes, 
        payload:data,
    }
}

export const error = (msg) => {
    return dispatch => {
        dispatch(apiDispatch(TOAST_ERROR, msg));
    }
}

export const success = (msg) => {
    return dispatch => {
        dispatch(apiDispatch(TOAST_SUCCESS, msg));
    }
}

export const message = (msg) => {
    return dispatch => {
        dispatch(apiDispatch(TOAST_MESSAGE, msg));
    }
}