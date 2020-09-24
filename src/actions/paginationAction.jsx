import { ActionTypes } from 'redux-devtools';
import{
    PAGINATION_LOADING,
    PAGINATION_PAGE_NO,
} from './paginationActionType';

const apiDispatch = (actionType = '', data) => {
    return{
        type: actionType,
        payload: data,
    }
};


export const setLoading = (value) => {
    return dispatch => {
        dispatch(apiDispatch(PAGINATION_LOADING, value))
    }
}


export const setPage = (number) => {
    return dispatch => {
        dispatch(apiDispatch(PAGINATION_LOADING, false));
        dispatch(apiDispatch(PAGINATION_PAGE_NO, number));
    }
}

