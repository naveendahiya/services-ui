/* eslint-disable no-unused-vars */
import apiClient from '../helpers/apiclient';
import { stringify } from 'query-string';
import { DATE } from '../constants';

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
  TOTAL_TASK_TO_BOQ_COUNT,
  TASK_TO_BOQ_COUNT_PENDING,
  TASK_TO_BOQ_COUNT_RESET,
  TASK_API_ERROR,
  RESET_TASK_REDUCER,
  CREATE_TASK,
  CLEAR_TASKS,
  DELETE_TASK_LOG_PENDING,
  ADD_TASK_LOG_PENDING,
  UPDATE_TASK_LOG_PENDING,
  SET_FILTER_VALUES,
  SET_IF_FILTER,
  UPLOAD_TASK_LOG_FILES,
  UPLOAD_TASK_LOG_FILES_PENDING,
} from './taskActionType';

import { SYNC_PROJECT_PLAN_VIEW, SYNC_TASK_PROFILE } from './refreshActionType';

import { getPackageById, getPackageDetailsRequest } from './packageActions';
import { setRefreshView } from './refreshAction';

import { toastSuccessMessage, toastErrorMessage } from './toastactions';
import { TASK_APIS, COMMENT_APIS } from '../routes.constant';
import {
  TASK_MIXPANNEL,
  TASK_LOG_MIXPANNEL,
  MANAGE_TASK_MIXPANNEL,
  THREAD_MIXPANNEL,
} from '../constants/mixpanel_contants';
import { track } from './mixpanelActions';

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data,
  };
};

const apiError = error => {
  return {
    type: TASK_API_ERROR,
    error,
  };
};

const getDataSuccess = (data, actionType) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const createTask = taskObj => {
  const apiUrl = TASK_APIS.taskItem;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const packageId = getState().packageReducer.selectedPackageDetails._id;
    const projectId = getState().projectreducer.selectedProj.id;
    apiClient
      .post(apiUrl, taskObj)
      .then(res => {
        dispatch(track(TASK_MIXPANNEL.TASK_CREATE_SUCCESS));
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(apiDispatch(CREATE_TASK, res.data));
        dispatch(toastSuccessMessage('Task created successfully'));
        dispatch(getPackageById('package', packageId));
        dispatch(
          getPackageDetailsRequest('packages', { project_id: projectId })
        );
        dispatch(setRefreshView(SYNC_PROJECT_PLAN_VIEW, true));
      })
      .catch(error => {
        dispatch(track(TASK_MIXPANNEL.TASK_CREATE_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in Creating Task'));
      });
  };
};

export const getTask = (id, params) => {
  let apiUrl = params
    ? `${TASK_APIS.taskItem}/${id}?${stringify(params)}`
    : `/${TASK_APIS.taskItem}/${id}`; // TODO: decide query structure

  return dispatch => {
    dispatch(apiDispatch(GET_TASK_PENDING, true));

    apiClient
      .get(apiUrl)
      .then(res => {
        dispatch(apiDispatch(GET_TASK_PENDING, false));
        dispatch(apiDispatch(GET_TASK, res.data));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task'));
      });
  };
};

export const getTaskLogsForTask = (id, params) => {
  let apiUrl = params
    ? `${TASK_APIS.taskLogTaskId}/${id}?${stringify(params)}`
    : `${TASK_APIS.taskLogTaskId}/${id}`; // TODO: decide query structure
  return dispatch => {
    dispatch(apiDispatch(GET_TASK_LOGS_PENDING, true));

    apiClient
      .get(apiUrl)
      .then(res => {
        dispatch(apiDispatch(GET_TASK_LOGS_PENDING, false));
        dispatch(apiDispatch(GET_TASK_LOGS, res.data));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task logs'));
      });
  };
};

export const getTaskLogs = query => {
  let apiUrl = query
    ? `${TASK_APIS.taskLogs}?${stringify(query)}`
    : `${TASK_APIS.taskLogs}`;
  return dispatch => {
    dispatch(apiDispatch(GET_TASK_LOGS_PENDING, true));

    apiClient
      .get(apiUrl)
      .then(res => {
        dispatch(apiDispatch(GET_TASK_LOGS_PENDING, false));
        dispatch(apiDispatch(GET_TASK_LOGS, res.data));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task logs'));
      });
  };
};

export const getTaskWithLogs = query => {
  let apiUrl = query
    ? `${TASK_APIS.taskWithLogs}?${stringify(query)}`
    : `${TASK_APIS.taskWithLogs}`;
  return dispatch => {
    dispatch(apiDispatch(GET_TASK_LOGS_PENDING, true));
    apiClient
      .get(apiUrl)
      .then(res => {
        dispatch(apiDispatch(GET_TASK_LOGS_PENDING, false));
        dispatch(apiDispatch(GET_TASK_WITH_LOGS, res.data));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task logs'));
        dispatch(apiDispatch(GET_TASK_LOGS_PENDING, false));
      });
  };
};

export const getAllTasksRequest = params => {
  const url = TASK_APIS.taskList;
  let apiUrl = params ? `${url}/?${stringify(params)}` : `/${url}`; // TODO: decide query structure

  return dispatch => {
    dispatch(apiDispatch(GET_ALL_TASKS_PENDING, true));

    apiClient
      .get(apiUrl)
      .then(response => {
        dispatch(apiDispatch(GET_ALL_TASKS_PENDING, false));
        dispatch(apiDispatch(GET_ALL_TASKS, response.data));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting all tasks'));
      });
  };
};

export const sendFollowUp = params => {
  const url = TASK_APIS.sendFollowUp;
  let apiUrl = params ? `${url}/${params}` : `${url}`;

  return dispatch => {
    apiClient
      .post(apiUrl)
      .then(response => {
        dispatch(toastSuccessMessage('Follow Up sent successfully'));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(
          toastErrorMessage('Error in sending notification for follow up')
        );
      });
  };
};

export const updateTask = (url, obj) => {
  const taskId = obj._id;
  delete obj._id;

  return (dispatch, getState) => {
    dispatch(apiDispatch(UPDATE_TASK_PENDING, true));
    const packageId = getState().packageReducer.selectedPackageDetails._id;
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .put(url, obj)
      .then(res => {
        // TODO refactor api to send updated task obj
        dispatch(apiDispatch(UPDATE_TASK_PENDING, false));
        dispatch(track(TASK_MIXPANNEL.TASK_EDIT_SUCCESS));
        dispatch(toastSuccessMessage('Successfully updated task'));
        dispatch(getTask(taskId));
        dispatch(getPackageById('package', packageId));
        dispatch(
          getPackageDetailsRequest('packages', { project_id: projectId })
        );
        dispatch(setRefreshView(SYNC_PROJECT_PLAN_VIEW, true));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(track(TASK_MIXPANNEL.TASK_EDIT_ERROR));
        dispatch(toastErrorMessage('Error in updating task'));
      });
  };
};

export const deleteData = id => {
  const url = `${TASK_APIS.taskItem}/${id}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(DELETE_TASK_PENDING, true));
    const packageId = getState().packageReducer.selectedPackageDetails._id;
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .delete(url)
      .then(() => {
        dispatch(track(TASK_MIXPANNEL.TASK_DELETE_SUCCESS));
        dispatch(apiDispatch(DELETE_TASK_PENDING, false));
        dispatch(apiDispatch(DELETE_TASK, {}));
        dispatch(toastSuccessMessage('Successfully deleted Task Item'));
        dispatch(getPackageById('package', packageId));
        dispatch(
          getPackageDetailsRequest('packages', { project_id: projectId })
        );
        dispatch(setRefreshView(SYNC_PROJECT_PLAN_VIEW, true));
      })
      .catch(error => {
        dispatch(track(TASK_MIXPANNEL.TASK_DELETE_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in deleting task'));
      });
  };
};

export const getTaskCount = params => {
  const url = TASK_APIS.taskCount;
  let apiUrl = params ? `${url}/?${stringify(params)}` : `/${url}`;

  return dispatch => {
    dispatch(apiDispatch(TASK_COUNT_PENDING, true));
    apiClient
      .get(apiUrl)
      .then(response => {
        dispatch(apiDispatch(TASK_COUNT_PENDING, false));

        dispatch(apiDispatch(TOTAL_TASK_COUNT, response.data.count));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task count'));
      });
  };
};

export const getTaskToBoqCount = (url, params) => {
  let apiUrl = params ? `${url}/?${stringify(params)}` : `/${url}`;

  return dispatch => {
    dispatch(apiDispatch(TASK_TO_BOQ_COUNT_PENDING, true));
    apiClient
      .get(apiUrl)
      .then(response => {
        dispatch(apiDispatch(TASK_TO_BOQ_COUNT_PENDING, false));

        dispatch(apiDispatch(TOTAL_TASK_TO_BOQ_COUNT, response.data.count));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in getting task to boq count'));
      });
  };
};

export const resetTaskCount = () => {
  return dispatch => {
    dispatch({
      type: TASK_COUNT_RESET,
    });
  };
};

export const resetTaskToBoqCount = () => {
  return dispatch => {
    dispatch({
      type: TASK_TO_BOQ_COUNT_RESET,
    });
  };
};

export const resetTaskReducer = () => {
  return dispatch => {
    dispatch({
      type: RESET_TASK_REDUCER,
    });
  };
};

export const bulkDeleteData = data => {
  const url = `${TASK_APIS.deleteTasks}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(DELETE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .put(url, data)
      .then(() => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_DELETE_SUCCESS));
        dispatch(apiDispatch(DELETE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully deleted Tasks'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_DELETE_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in deleting task'));
      });
  };
};

export const bulkAddTasks = data => {
  const url = `${TASK_APIS.addTasks}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .post(url, data)
      .then(() => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_ADD_SUCCESS));
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully added tasks'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_ADD_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in adding tasks'));
      });
  };
};

export const assignUserToTask = (data, taskId) => {
  const url = `${TASK_APIS.assignUser}/${taskId}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .put(url, data)
      .then(() => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_ASSIGN_USER_SUCCESS));
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully assigned user to task'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_ASSIGN_USER_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in assigning users to task'));
      });
  };
};

export const linkBoqToTask = (data, taskId) => {
  const url = `${TASK_APIS.linkBoq}/${taskId}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .put(url, data)
      .then(() => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_LINK_BOQ_SUCCESS));
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully linked boqs to task'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_LINK_BOQ_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in linking boqs to task'));
      });
  };
};

export const assignUserToTasks = data => {
  const url = `${TASK_APIS.assignUsers}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .post(url, data)
      .then(() => {
        dispatch(
          track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_ASSIGN_USER_SUCCESS)
        );
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully assigned user to tasks'));
      })
      .catch(error => {
        dispatch(
          track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_ASSIGN_USER_ERROR)
        );
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in assigning users to tasks'));
      });
  };
};

export const linkBoqToTasks = data => {
  const url = `${TASK_APIS.linkBoqs}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(CREATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .post(url, data)
      .then(() => {
        dispatch(
          track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_LINK_BOQ_SUCCESS)
        );
        dispatch(apiDispatch(CREATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully linked boqs to tasks'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_BULK_LINK_BOQ_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in linking boqs to tasks'));
      });
  };
};

export const bulkUpdateTasks = data => {
  const url = `${TASK_APIS.updateTasks}`;

  return (dispatch, getState) => {
    dispatch(apiDispatch(UPDATE_TASK_PENDING, true));
    const projectId = getState().projectreducer.selectedProj.id;

    apiClient
      .post(url, data)
      .then(() => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_UPDATE_SUCCESS));
        dispatch(apiDispatch(UPDATE_TASK_PENDING, false));
        dispatch(
          getAllTasksRequest({
            project_id: projectId,
            sort_option: '-createdAt',
          })
        );
        dispatch(toastSuccessMessage('Successfully updated tasks'));
      })
      .catch(error => {
        dispatch(track(MANAGE_TASK_MIXPANNEL.MANAGE_TASK_UPDATE_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in updating tasks'));
      });
  };
};

export const deleteTaskLog = id => {
  const url = `${TASK_APIS.taskLog}/${id}`;

  return dispatch => {
    dispatch(apiDispatch(DELETE_TASK_LOG_PENDING, true));
    apiClient
      .delete(url)
      .then(() => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_DELETE_SUCCESS));
        dispatch(apiDispatch(DELETE_TASK_LOG_PENDING, false));
        dispatch(toastSuccessMessage('Successfully deleted Task Log'));
        dispatch(setRefreshView(SYNC_TASK_PROFILE, true));
      })
      .catch(error => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_DELETE_ERROR));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in deleting Task log'));
      });
  };
};

export const addTaskLog = taskLogObj => {
  const url = `${TASK_APIS.taskLog}`;
  return dispatch => {
    dispatch(apiDispatch(ADD_TASK_LOG_PENDING, true));
    apiClient
      .post(url, taskLogObj)
      .then(() => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_CREATE_SUCCESS));
        dispatch(apiDispatch(ADD_TASK_LOG_PENDING, false));
        dispatch(toastSuccessMessage('Successfully created Task Log'));
        dispatch(setRefreshView(SYNC_TASK_PROFILE, true));
        dispatch(setTaskLogUploadFiles([]));
      })
      .catch(error => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_CREATE_ERROR));
        dispatch(apiDispatch(ADD_TASK_LOG_PENDING, false));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in Creating Task log'));
      });
  };
};

export const updateTaskLog = taskLogObj => {
  const url = `${TASK_APIS.taskLog}/${taskLogObj._id}`;

  return dispatch => {
    dispatch(apiDispatch(UPDATE_TASK_LOG_PENDING, true));
    apiClient
      .put(url, taskLogObj)
      .then(() => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_EDIT_SUCCESS));
        dispatch(apiDispatch(UPDATE_TASK_LOG_PENDING, false));
        dispatch(toastSuccessMessage('Successfully Updated Task Log'));
        dispatch(setRefreshView(SYNC_TASK_PROFILE, true));
        dispatch(setTaskLogUploadFiles([]));
      })
      .catch(error => {
        dispatch(track(TASK_LOG_MIXPANNEL.TASK_LOG_EDIT_ERROR));
        dispatch(apiDispatch(UPDATE_TASK_LOG_PENDING, false));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in Updating Task log'));
      });
  };
};

export const clearTasks = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_TASKS,
    });
  };
};

export const setFilterValues = filterValues => {
  return dispatch => {
    try {
      dispatch(getDataSuccess(filterValues, SET_FILTER_VALUES));
    } catch (error) {
      dispatch(apiError());
    }
  };
};

export const setIfFilter = ifFilter => {
  return dispatch => {
    try {
      dispatch(getDataSuccess(ifFilter, SET_IF_FILTER));
    } catch (error) {
      dispatch(apiError());
    }
  };
};

export const setTaskLogUploadFiles = files => {
  return dispatch => {
    dispatch(apiDispatch(UPLOAD_TASK_LOG_FILES, files));
  };
};

export const uploadFiles = data => {
  let apiUrl = COMMENT_APIS.uploadFiles;
  return dispatch => {
    dispatch(apiDispatch(UPLOAD_TASK_LOG_FILES_PENDING, true));
    apiClient
      .post(apiUrl, data)
      .then(response => {
        dispatch(apiDispatch(UPLOAD_TASK_LOG_FILES, response.data));
        dispatch(track(THREAD_MIXPANNEL.UPLOAD_FILES_SUCCESS));
        dispatch(apiDispatch(UPLOAD_TASK_LOG_FILES_PENDING, false));
      })
      .catch(error => {
        dispatch(track(THREAD_MIXPANNEL.UPLOAD_FILES_ERROR));
        dispatch(apiDispatch(UPLOAD_TASK_LOG_FILES_PENDING, false));
        dispatch(apiError(error));
        dispatch(toastErrorMessage('Error in uploading files'));
      });
  };
};