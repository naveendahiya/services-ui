import {
    GET_TASK_BIDS, 
    GET_TASK_BIDS_PENDING,
    CREATE_BID,
    CREATE_BID_PENDING,
    BID_API_ERROR, 
} from '../actions/bidActionType';

const initialPendingState = {
    createBidPending: false, 
    getTaskBidsPending: false,
}

const initialState = {
    ...initialPendingState,
    bids: [],
    error: null,
    addedBid: null,
}


export default function bidReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case GET_TASK_BIDS_PENDING:
            return {...state, getTaskBidsPending: payload, addedBid: null};
        case GET_TASK_BIDS:
            return {...state, bids: payload};
        case CREATE_BID_PENDING:
            return {...state, createBidPending: payload};
        case CREATE_BID:
            return {...state, addedBid: payload};
        case BID_API_ERROR:
            return {...state, error: payload};
        case RESET_BID_REDUCER:
            return initialState;
        default:
            return state;
    }
}