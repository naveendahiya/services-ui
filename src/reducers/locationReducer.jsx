import{
    GET_LOCATION,
    ERROR_LOCATION_API,
} from '../actions/locationActionType';

const initialState = {
    location: [],
    error: false,
} 

export default function locationReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case GET_LOCATION:
            return {...state, location: payload}
        case ERROR_LOCATION_API:
            return {...state, error: payload}
        default:
            return state
    }
}