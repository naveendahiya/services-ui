import {
    GET_TASK,
    GET_TASK_PENDING,
    GET_TASK_ALL,
    GET_TASK_ALL_PENDING,
    CREATE_TASK,
    CREATE_TASK_PENDING, 
    DELETE_TASK,
    DELETE_TASK_PENDING,
    UPDATE_TASK,
    UPDATE_TASK_PENDING,
    TASK_API_ERROR, 
} from '../actions/taskActionType';

const initialPendingState = {
    createTaskPending: false,
    deleteTaskPending: false, 
    getTaskPending: false, 
    getAllTaskPending: false, 
    updateTaskPending: false,
};

const initialState = {
    ...initialPendingState,
    tasks: [],
    error: null,
    addedTask: null,
    selectedTask: null, 
}

export default function taskReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case CREATE_TASK:
            return {...state, addedTask: payload};
        case GET_TASK:
            return {...state, selectedTask: payload};
        case GET_TASK_PENDING:
            return {...state, getTaskPending: payload, addedTask: null};
        case GET_TASK_ALL:
            return {...state, tasks: payload};
        case GET_TASK_ALL_PENDING:
            return {...state, getAllTaskPending: payload};
        case CREATE_TASK_PENDING:
            return {...state, createTaskPending: payload};
        case UPDATE_TASK_PENDING:
            return {...state, updateTaskPending: payload};
        case DELETE_TASK:
            return {...state, createTaskPending: payload};
        case DELETE_TASK_PENDING:
            return {...state, deleteTaskPending: payload};
        case TASK_API_ERROR:
            return {
                ...state,
                error: error,
            };
        default:
            return state;
    }
}