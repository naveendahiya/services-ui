import {
    TOAST_ERROR,
    TOAST_SUCCESS, 
    TOAST_MESSAGE,
} from '../actions/toastActionType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState ={
    error: '',
    success: '',
    message: '',
}

export default function toastReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case TOAST_ERROR:
            toast.error(`${payload}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-container',
                });
            return {...state, error: payload}
        case TOAST_SUCCESS:
            toast.success(`${payload}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-container',
                });
            return {...state, success: payload}
        case TOAST_MESSAGE:
            toast.info(`${payload}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-container',
                });
            return {...state, message: payload}
        default:
            return state;
    }
}