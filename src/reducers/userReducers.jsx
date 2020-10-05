import {
    LOGIN, 
    LOGIN_PENDING, 
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_PENDING,
    GET_USER,
    GET_USER_PENDING,
    LOGIN_CHECK,
    COMPLETE_SIGNUP,
    COMPLETE_SIGNUP_PENDING,
    USER_API_ERROR,
    SET_TOKEN,
    LOGOUT,
} from '../actions/userActionType';

const initialPendingState = {
    loginPending: false,
    forgotPasswordPending: false,
    completeSignupPending: false,
    getUserPending: false,
}

const initialState = {
    ...initialPendingState,
    _id: null,
    isAuth: false,
    error: [],
    errorCode: 0,
    user: [],
    key: '',
}


export default function userReducer(
    state = initialState,
    { type, payload,  error }
){
    switch(type){
        case LOGIN:
            return {...state, isAuth: true, key: payload};
        case LOGIN_PENDING:
            return {...state, loginPending: payload};
        case GET_USER:
            return {...state, user: payload};
        case GET_USER_PENDING:
            return {...state, getUserPending: payload};
        case COMPLETE_SIGNUP_PENDING:
            return {...state, completeSignupPending: payload};
        case COMPLETE_SIGNUP:
            return {...state, key: payload, isAuth: true};
        case USER_API_ERROR:
            return {...state, error: payload[0], errorCode: payload[1]};
        case SET_TOKEN:
            return {...state, key: payload, isAuth: true};
        case LOGOUT:
            return {...state, key: '', isAuth: false};
        default:
            return state;
    }

}