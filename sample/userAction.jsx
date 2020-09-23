import { stringify } from 'query-string';

import {
  LOGIN,
  LOGIN_PENDING,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_PENDING,
  RESET_PASSWORD,
  RESET_PASSWORD_PENDING,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_PENDING,
  COMPLETE_SIGNUP,
  COMPLETE_SIGNUP_PENDING,
  RESEND_VERIFY_MAIL,
  RESEND_VERIFY_MAIL_PENDING,
  VERIFY_SIGNUP_REQUEST,
  VERIFY_SIGNUP_REQUEST_PENDING,
  VERIFY_RESET_REQUEST,
  VERIFY_RESET_REQUEST_PENDING,
  GET_USER,
  GET_USER_PENDING,
  LOGIN_CHECK,
  LOGOUT,
  VERIFY,
  REQ_SUPPORT_CALL_SUCCESS,
  UPDATE_USER_DETAILS,
  USER_API_PENDING,
  USER_API_SUCCESS,
  AUTH_VIEW_INDEX_CHANGE,
  FORGET_PASSWORD_VIEW_INDEX_CHANGE,
  COMPLETE_SIGNUP_INDEX_CHANGE,
  USER_API_ERROR,
  SEND_USER_OTP,
  SEND_USER_OTP_PENDING,
  VERIFY_OTP,
  VERIFY_OTP_PENDING,
  EDIT_USER_DISPLAYNAME_PENDING,
  GET_USER_ORGS_PENDING,
  GET_USER_ORGS,
  OTP_ERROR,
} from './userActionType';
import apiClient from '../helpers/apiclient';
import {
  USER_PROJECT_APIS,
  USER_APIS,
  ONBOARDING_APIS,
} from '../routes.constant';
import { toastSuccessMessage, toastErrorMessage } from './toastactions';
import { setLocalStorage } from './baseactions';
import { clearDocStdate } from './documentActions';
import { track, initMixpanel } from './mixpanelActions';
import { USER_MIXPANEL } from '../constants/mixpanel_contants';

const LOGIN_URL = 'login';
const FORGOT_PASSWORD_URL = 'forgotpassword';
const RESET_PASSWORD_URL = 'resetpassword';
const COMPLETE_SIGNUP_URL = 'complete-signup';
const RESEND_VERIFY_MAIL_URL = 'resendtoken';
const REQ_SUPPORT_CALL_URL = 'support-request';

const VERIFY_URL = 'verification';

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data,
  };
};

const apiError = error => {
  const err = { type: USER_API_ERROR };
  if (error.response) {
    err.error = {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    };
  } else if (error.request) {
    err.error = {
      data: error.request,
    };
  } else {
    err.error = {
      data: error,
    };
  }

  return err;
};

const apiSuccess = () => {
  return dispatch => {
    dispatch({ type: USER_API_SUCCESS, payload: { pending: false } });
  };
};

const apiPending = () => {
  return dispatch => {
    dispatch({ type: USER_API_PENDING, payload: { pending: true } });
  };
};

export const login = data => {
  return dispatch => {
    dispatch(apiDispatch(LOGIN_PENDING, true));

    apiClient
      .post(LOGIN_URL, data)
      .then(response => {
        dispatch(apiDispatch(LOGIN_PENDING, false));
        const { data } = response;
        const role = data.email === 'master@master.com' ? 'master' : 'common';
        let requiredData = { ...data };
        delete requiredData.token;

        const payload = {
          ...requiredData,
          _id: data.user_id,
          isAuth: true,
          role,
        };
        initMixpanel(data);
        dispatch(track(USER_MIXPANEL.LOGIN_SUCCESS));
        setLocalStorage({ role, token: data.token, exp: data.exp });
        dispatch(apiDispatch(LOGIN, payload));
      })
      .catch(error => {
        dispatch(apiDispatch(LOGIN_PENDING, false));
        dispatch(apiError(error));

        if (error.response.status === 401) {
          dispatch(toastErrorMessage('User is not verified'));
        } else if (error.response.status === 404) {
          dispatch(toastErrorMessage('Error in logging in'));
        } else if (error.response.status === 400) {
          dispatch(toastErrorMessage('Invalid credentials'));
        } else {
          dispatch(toastErrorMessage('Error in logging in'));
        }
      });
  };
};

export const forgotPassword = data => {
  return dispatch => {
    dispatch(apiDispatch(FORGOT_PASSWORD_PENDING, true));

    apiClient
      .post(FORGOT_PASSWORD_URL, data)
      .then(response => {
        dispatch(apiDispatch(FORGOT_PASSWORD_PENDING, false));
        dispatch(
          apiDispatch(FORGOT_PASSWORD, {
            ...response.data,
            forgotPassEmailSent: true,
          })
        );
        dispatch(changeAuthViewIndex(2));

        dispatch(toastSuccessMessage('Password reset mail sent.'));
      })
      .catch(error => {
        dispatch(apiDispatch(FORGOT_PASSWORD_PENDING, false));
        dispatch(changeAuthViewIndex(2));
        dispatch(
          apiDispatch(FORGOT_PASSWORD, {
            email: data.email,
            forgotPassEmailSent: true,
          })
        );
        dispatch(apiError(error));
      });
  };
};

export const updateUserDetails = (data, ifReload = false) => {
  return dispatch => {
    apiClient
      .put(USER_PROJECT_APIS.updateUserDetails, data)
      .then(response => {
        delete response.data.token;
        let role =
          response.data.email === 'master@master.com' ? 'master' : 'common';
        dispatch({
          type: UPDATE_USER_DETAILS,
          payload: { ...response.data, updateUserDetailsSuccess: true },
        });
        dispatch(clearDocState());
        setLocalStorage(response.data, role);
        if (ifReload) {
          window.location.reload();
        } else {
          dispatch(toastSuccessMessage('User details updated successfully'));
        }
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch({
          type: UPDATE_USER_DETAILS,
          payload: { updateUserDetailsErr: true },
        });
      });
  };
};

export const updateUserGuide = data => {
  return dispatch => {
    apiClient
      .put(USER_PROJECT_APIS.guideInfo, data)
      .then(response => {
        dispatch({
          type: USER_API_SUCCESS,
          payload: response.data,
        });
      })
      .catch(() => {});
  };
};

export const resetPassword = data => {
  return dispatch => {
    dispatch(apiDispatch(RESET_PASSWORD_PENDING, true));

    apiClient
      .post(RESET_PASSWORD_URL, data)
      .then(() => {
        dispatch(apiDispatch(RESET_PASSWORD_PENDING, false));
        dispatch(changeForgetPasswordViewIndex(1));

        dispatch(
          apiDispatch(RESET_PASSWORD, {
            resetPassSuccess: true,
          })
        );
      })
      .catch(error => {
        dispatch(apiDispatch(RESET_PASSWORD_PENDING, false));
        dispatch(toastErrorMessage('Invalid credentials'));
        dispatch(apiError(error));
      });
  };
};

export const changePassword = data => {
  return dispatch => {
    dispatch(apiDispatch(CHANGE_PASSWORD_PENDING, true));

    apiClient
      .put(USER_PROJECT_APIS.changePassword, data)
      .then(() => {
        dispatch(apiDispatch(CHANGE_PASSWORD_PENDING, false));
        dispatch(apiDispatch(CHANGE_PASSWORD, { changePassSuccess: true }));
        dispatch({
          type: CHANGE_PASSWORD,
          payload: { changePassSuccess: true },
        });
        dispatch(toastSuccessMessage('Password changed successfully'));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(apiDispatch(CHANGE_PASSWORD_PENDING, false));
        dispatch(toastErrorMessage('Unable to change the password'));
      });
  };
};

export const completeSignup = data => {
  return dispatch => {
    dispatch(apiDispatch(COMPLETE_SIGNUP_PENDING, true));

    apiClient
      .put(COMPLETE_SIGNUP_URL, data)
      .then(response => {
        const { data } = response;
        const role = data.email === 'master@master.com' ? 'master' : 'common';
        let requiredData = { ...data };
        delete requiredData.token;

        const payload = {
          ...requiredData,
          isAuth: true,
          role,
        };
        initMixpanel(data);
        dispatch(track(USER_MIXPANEL.SIGNUP_SUCCESS));
        setLocalStorage({ role, token: data.token, exp: data.exp });
        dispatch(apiDispatch(LOGIN, payload));
        dispatch(apiDispatch(COMPLETE_SIGNUP_PENDING, false));
        dispatch(toastSuccessMessage('Registration successful'));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(apiDispatch(COMPLETE_SIGNUP_PENDING, false));
        dispatch(changeCompleteSignupViewIndex('errorSignup'));
      });
  };
};

export const verifyResetRequest = data => {
  return dispatch => {
    dispatch(apiDispatch(VERIFY_RESET_REQUEST_PENDING, true));
    apiClient
      .get(`${RESET_PASSWORD_URL}?email=${data.email}&token=${data.token}`)
      .then(() => {
        dispatch(
          apiDispatch(VERIFY_RESET_REQUEST, { forgotPassConfirm: true })
        );
        dispatch(apiDispatch(VERIFY_RESET_REQUEST_PENDING, false));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(changeForgetPasswordViewIndex(2));
        dispatch(
          apiDispatch(VERIFY_RESET_REQUEST, { forgotPassConfirm: false })
        );
        dispatch(apiDispatch(VERIFY_RESET_REQUEST_PENDING, false));
      });
  };
};

export const verifySignupCompleteRequest = data => {
  return dispatch => {
    dispatch(apiDispatch(VERIFY_SIGNUP_REQUEST_PENDING, true));
    apiClient
      .get(`${COMPLETE_SIGNUP_URL}?email=${data.email}&token=${data.token}`)
      .then(() => {
        dispatch(apiDispatch(VERIFY_SIGNUP_REQUEST_PENDING, false));
        dispatch(
          apiDispatch(VERIFY_SIGNUP_REQUEST, {
            signUpVerfied: true,
          })
        );
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(apiDispatch(VERIFY_SIGNUP_REQUEST_PENDING, false));
        apiDispatch(VERIFY_SIGNUP_REQUEST, {
          signUpVerfied: false,
        });
        dispatch(changeCompleteSignupViewIndex('errorSignup'));
      });
  };
};

export const resendVerEmail = data => {
  return dispatch => {
    dispatch(apiDispatch(RESEND_VERIFY_MAIL_PENDING, true));
    apiClient
      .post(RESEND_VERIFY_MAIL_URL, data)
      .then(response => {
        dispatch(apiDispatch(RESEND_VERIFY_MAIL_PENDING, false));
        dispatch(apiDispatch(RESEND_VERIFY_MAIL, response));
        dispatch(toastSuccessMessage('Verification Link sent'));
      })
      .catch(error => {
        dispatch(apiError(error));
        dispatch(apiDispatch(RESEND_VERIFY_MAIL_PENDING, false));
        dispatch(toastErrorMessage('Error in sending verification link'));
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch(track(USER_MIXPANEL.LOGOUT_SUCCESS));
    return dispatch({
      type: LOGOUT,
      payload: {},
    });
  };
};

export const loginCheck = payload => {
  return dispatch => {
    if (payload.isAuth) {
      dispatch(getUser());
    }
    dispatch({ type: LOGIN_CHECK, payload });
  };
};

export const verify = data => {
  return dispatch => {
    const { email, token } = data;
    apiClient
      .get(`${VERIFY_URL}?token=${token}&email=${email}`)
      .then(res => {
        if (res.data.isVerified) {
          dispatch({ type: VERIFY, payload: { confirming: false } });
        }
      })
      .catch(err => {
        if (err && err.response && err.response.status === 400) {
          dispatch({ type: VERIFY, payload: { confirming: false } });
        } else {
          dispatch({ type: VERIFY, payload: { verifyErr: true } });
        }
      });
  };
};

export const requestSupportCall = data => {
  return dispatch => {
    dispatch(apiPending());
    apiClient
      .post(REQ_SUPPORT_CALL_URL, data)
      .then(() => {
        dispatch(apiSuccess());
        dispatch({ type: REQ_SUPPORT_CALL_SUCCESS });
      })
      .catch(err => {
        dispatch(apiSuccess());
        dispatch(apiError(err));
        dispatch(
          toastErrorMessage(
            'Support call could not be requested at the moment, please try again'
          )
        );
      });
  };
};

export const changeAuthViewIndex = step => {
  return dispatch => {
    dispatch(apiDispatch(AUTH_VIEW_INDEX_CHANGE, step));
  };
};

export const changeForgetPasswordViewIndex = step => {
  return dispatch => {
    dispatch(apiDispatch(FORGET_PASSWORD_VIEW_INDEX_CHANGE, step));
  };
};

export const changeCompleteSignupViewIndex = step => {
  return dispatch => {
    dispatch(apiDispatch(COMPLETE_SIGNUP_INDEX_CHANGE, step));
  };
};

export const sendOTP = data => {
  const apiUrl = ONBOARDING_APIS.sendUserOtp;
  return dispatch => {
    dispatch(apiDispatch(SEND_USER_OTP_PENDING, true));
    apiClient
      .post(apiUrl, data)
      .then(response => {
        dispatch(apiDispatch(SEND_USER_OTP_PENDING, false));
        dispatch(apiDispatch(SEND_USER_OTP, response.data));
        dispatch(changeAuthViewIndex(1));
        dispatch(apiDispatch(OTP_ERROR, null));
        dispatch(toastSuccessMessage('OTP sent successfully'));
      })
      .catch(error => {
        dispatch(apiDispatch(SEND_USER_OTP_PENDING, false));
        dispatch(toastErrorMessage('Error in sending OTP'));
      });
  };
};

export const verifyOtp = data => {
  const apiUrl = ONBOARDING_APIS.verifyUserOtp;
  return (dispatch, getState) => {
    const phoneNumber = getState().userreducer.phoneNumber;
    dispatch(apiDispatch(VERIFY_OTP_PENDING, true));
    apiClient
      .post(apiUrl, data)
      .then(response => {
        const { data } = response;
        const role = data.email === 'master@master.com' ? 'master' : 'common';
        let requiredData = { ...data };
        delete requiredData.token;

        const payload = {
          ...requiredData,
          _id: data.user_id,
          isAuth: true,
          role,
        };

        dispatch(apiDispatch(VERIFY_OTP_PENDING, false));
        setLocalStorage({ token: data.token, exp: data.exp });
        dispatch(apiDispatch(VERIFY_OTP, data));
        dispatch(apiDispatch(LOGIN, payload));
        dispatch(toastSuccessMessage('OTP verified successfully'));
        if (
          data.displayName == phoneNumber ||
          data.displayName == '' ||
          !data.displayName
        ) {
          dispatch(changeAuthViewIndex(2));
        } else {
          dispatch(getUser());
        }
      })
      .catch(error => {
        dispatch(apiDispatch(VERIFY_OTP_PENDING, false));
        if (error.response.status === 400) {
          dispatch(apiDispatch(OTP_ERROR, error.response.data.message));
        } else {
          dispatch(toastErrorMessage('Error in verifying OTP'));
        }
      });
  };
};

export const editDisplayName = name => {
  const apiUrl = ONBOARDING_APIS.user;
  return (dispatch, getState) => {
    dispatch(apiDispatch(EDIT_USER_DISPLAYNAME_PENDING, true));
    apiClient
      .put(apiUrl, name)
      .then(response => {
        dispatch(apiDispatch(EDIT_USER_DISPLAYNAME_PENDING, false));
        dispatch(getUser());
      })
      .catch(error => {
        dispatch(apiDispatch(EDIT_USER_DISPLAYNAME_PENDING, false));
        dispatch(toastErrorMessage('Error!'));
      });
  };
};

export const getUser = () => {
  const apiUrl = ONBOARDING_APIS.userSelf;
  return dispatch => {
    dispatch(apiDispatch(GET_USER_PENDING, true));
    apiClient
      .get(apiUrl)
      .then(response => {
        const { data } = response;
        dispatch(apiDispatch(GET_USER_PENDING, false));

        dispatch(apiDispatch(GET_USER, data));
        if (!data.org_id || data.org_id == '') {
          dispatch(changeAuthViewIndex(3));
        } else {
          dispatch(changeAuthViewIndex(4));
          dispatch(getUserOrgs({ user_id: data._id }));
        }
      })
      .catch(error => {
        dispatch(apiDispatch(GET_USER_PENDING, false));
      });
  };
};

export const getUserOrgs = params => {
  const apiUrl = `${USER_APIS.getUserOrgs}/?${stringify(params)}`;
  return dispatch => {
    dispatch(apiDispatch(GET_USER_ORGS_PENDING, true));
    apiClient
      .get(apiUrl)
      .then(response => {
        dispatch(apiDispatch(GET_USER_ORGS_PENDING, true));
        dispatch(apiDispatch(GET_USER_ORGS, response.data));
      })
      .catch(error => {
        dispatch(apiDispatch(GET_USER_ORGS_PENDING, false));
      });
  };
};