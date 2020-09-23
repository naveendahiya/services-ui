import{
    LOGIN, 
    LOGIN_PENDING,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_PENDING,
    GET_USER,
    GET_USER_PENDING,
    USER_API_ERROR,
    LOGIN_CHECK,
    LOGOUT,
    COMPLETE_SIGNUP_PENDING,
    COMPLETE_SIGNUP,
} from './userActionType';
import axios from "axios";
import apiClient from '../config/apiclient';


import{
  TOAST_ERROR,
  TOAST_SUCCESS,
} from './toastActionType';
import { setIn } from 'formik';

//urls 

const GET_USER_URL = '/dj-rest-auth/user/';
 
const apiDispatch = (actionType = '', data) => {
    return{
        type: actionType, 
        payload: data,
    };
};


export const loginState = (data) => {  
    return (dispatch) => {
        dispatch(apiDispatch(LOGIN_PENDING, data));
    }
}

export const login = (data) => {
  return dispatch => {
    dispatch(apiDispatch(LOGIN, data));
  }
}

export const toastError = (msg) => {
  return dispatch => {
    dispatch(apiDispatch(TOAST_ERROR, msg));
  }
}

export const toastSuccess = (msg) => {
  return dispatch => {
    dispatch(apiDispatch(TOAST_SUCCESS, msg));
  }
}

export const getUser = () => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_USER_PENDING, true));

    apiClient
      .get(GET_USER_URL)
      .then(res => {
        dispatch(apiDispatch(GET_USER_PENDING, false));
        dispatch(apiDispatch(GET_USER, res.data));
      })
      .catch(error => {
        dispatch(apiDispatch(GET_USER_PENDING, false));
      })
  }
}

export const signupState = (data) => {
   return dispatch => {
     dispatch(apiDispatch(COMPLETE_SIGNUP_PENDING, data));
   }
} 

export const signup = (data) => {
  return (dispatch) => {
    dispatch(apiDispatch(COMPLETE_SIGNUP, data));
  }
}


export const setError = (error) => {
   return dispatch => {
    dispatch(apiDispatch(USER_API_ERROR, error));
  }
}

export const emptyError = () => {
  return dispatch => {
    dispatch(apiDispatch(USER_API_ERROR, []));
  }
}