import {
    GET_ALL_TASKS,
    GET_ALL_TASKS_PENDING,
    GET_TASK,
    GET_TASK_PENDING,
    GET_TASK_LOGS,
    GET_TASK_WITH_LOGS,
    GET_TASK_LOGS_PENDING,
    CREATE_TASK_PENDING,
    UPDATE_TASK_PENDING,
    DELETE_TASK,
    DELETE_TASK_PENDING,
    TOTAL_TASK_COUNT,
    TASK_COUNT_PENDING,
    TASK_COUNT_RESET,
    TASK_API_ERROR,
    RESET_TASK_REDUCER,
    TOTAL_TASK_TO_BOQ_COUNT,
    TASK_TO_BOQ_COUNT_PENDING,
    TASK_TO_BOQ_COUNT_RESET,
    CREATE_TASK,
    CLEAR_TASKS,
    DELETE_TASK_LOG_PENDING,
    SET_FILTER_VALUES,
    SET_IF_FILTER,
    UPLOAD_TASK_LOG_FILES,
    UPLOAD_TASK_LOG_FILES_PENDING,
  } from './../actions/taskActionType';
  
  const initialPendingState = {
    createTaskPending: false,
    getTaskPending: false,
    getTaskLogsPending: false,
    getAllTasksPending: false,
    updateTaskPending: false,
    deleteTaskPending: false,
    getTaskCountPending: true,
    taskToBoqCountPending: false,
    deleteTaskLogPending: false,
    uploadTaskLogFilesPending: false,
  };
  
  const initialState = {
    ...initialPendingState,
    tasks: [],
    filterValues: {},
    ifFilter: false,
    images: [],
    error: null,
    uploadError: [],
    taskLogs: [],
    selectedTask: null,
    count: 0,
    taskToBoqCount: 0,
    addedTask: null,
    taskWithLogs: [],
    selectedTaskLogFiles: [],
  };
  
  export default function taskReducer(
    state = initialState,
    { type, payload, error }
  ) {
    switch (type) {
      case CREATE_TASK:
        return { ...state, addedTask: payload };
      case GET_TASK:
        return { ...state, selectedTask: payload };
      case GET_TASK_PENDING:
        return { ...state, getTaskPending: payload, addedTask: null };
      case GET_TASK_LOGS:
        return { ...state, taskLogs: payload };
      case GET_TASK_WITH_LOGS:
        return { ...state, taskWithLogs: payload };
      case GET_TASK_LOGS_PENDING:
        return { ...state, getTaskLogsPending: payload };
      case GET_ALL_TASKS:
        return { ...state, tasks: payload };
      case GET_ALL_TASKS_PENDING:
        return { ...state, getAllTasksPending: payload };
      case CREATE_TASK_PENDING:
        return { ...state, createTaskPending: payload };
      case UPDATE_TASK_PENDING:
        return { ...state, updateTaskPending: payload };
      case DELETE_TASK:
        return { ...state, createTaskPending: payload };
      case DELETE_TASK_PENDING:
        return { ...state, deleteTaskPending: payload };
      case DELETE_TASK_LOG_PENDING:
        return { ...state, deleteTaskLogPending: payload };
      case TOTAL_TASK_COUNT:
        return {
          ...state,
          count: payload,
          getTaskCountPending: false,
        };
      case TASK_COUNT_PENDING:
        return { ...state, getTaskCountPending: true };
      case TASK_COUNT_RESET:
        return { ...state, count: 0 };
      case TOTAL_TASK_TO_BOQ_COUNT:
        return {
          ...state,
          taskToBoqCount: payload,
          taskToBoqCountPending: false,
        };
      case TASK_TO_BOQ_COUNT_PENDING:
        return { ...state, taskToBoqCountPending: true };
      case TASK_TO_BOQ_COUNT_RESET:
        return { ...state, taskToBoqCount: 0 };
      case TASK_API_ERROR:
        return {
          ...state,
          error: error,
        };
      case SET_FILTER_VALUES:
        return {
          ...state,
          filterValues: payload,
        };
      case SET_IF_FILTER:
        return {
          ...state,
          ifFilter: payload,
        };
      case RESET_TASK_REDUCER:
        return initialState;
      case CLEAR_TASKS:
        return { ...state, tasks: [] };
      case UPLOAD_TASK_LOG_FILES:
        return { ...state, selectedTaskLogFiles: payload };
      case UPLOAD_TASK_LOG_FILES_PENDING:
        return { ...state, uploadTaskLogFilesPending: payload };
      default:
        return state;
    }
  }