import apiClient from '../config/apiclient';

import{
    GET_TASK_BIDS, 
    GET_TASK_BIDS_PENDING,
    CREATE_BID,
    CREATE_BID_PENDING,
    BID_API_ERROR, 
} from './bidActionType';


const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: BID_API_ERROR, 
        error,
    }
}

export const getTaskBid = (id, params) => {
    let apiUrl = `/bids/?task=${id}`;

    return dispatch => {
        dispatch(apiDispatch(GET_TASK_BIDS_PENDING, true));

        apiClient
          .get(apiUrl)
          .then(res => {
              dispatch(apiDispatch(GET_TASK_BIDS_PENDING, false));
              dispatch(apiDispatch(GET_TASK_BIDS, res.data));
          })
          .catch(error => {
              dispatch(apiError(error));
          })
    }
}


export const createBid = bidObj => {
    const apiUrl = '';

    return (dispatch, getState) => {
        dispatch(apiDispatch(CREATE_BID_PENDING), true);

        apiClient
          .post(apiUrl, bidObj)
          .then(res => {
              dispatch(apiDispatch(CREATE_BID_PENDING, false));
              dispatch(apiDispatch(CREATE_BID, res.data));
          })
          .catch(error => {
              dispatch(apiError(BID_API_ERROR, error));
          })
    }
}