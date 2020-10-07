import { ActionTypes } from 'redux-devtools';
import apiClient from '../config/apiclient';

import{
    GET_LOCATION,
    ERROR_LOCATION_API,
} from './locationActionType';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

export const getLocation = (id, params) => {
    let apiUrl = `/tasks/${id}/location/`

    return dispatch => {
        apiClient
         .get(apiUrl)
         .then(res => {
            dispatch(apiDispatch(GET_LOCATION, res.data))
         })
         .catch(error => {
             console.log(error);
            // dispatch(apiDispatch(ERROR_LOCATION_API, error))
         })
    }
}   