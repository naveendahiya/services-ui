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
    ADD_TASKS,
    SET_COUNT
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
    errorMsg: '',
    errorCode: 0,
    addedTask: null,
    selectedTask: [], 
    count: 0,
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
            return {...state, tasks: payload };
        case SET_COUNT:
            return {...state, count: payload};
        case GET_TASK_ALL_PENDING:
            return {...state, getAllTaskPending: payload};
        case ADD_TASKS:
            return {...state,
             tasks: [
               ...state.tasks,
               ...payload
             ]
    }
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
                errorMsg: payload[0],
                errorCode: payload[1]
            };
        default:
            return state;
    }
}