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
    VERIFY,
    REQ_SUPPORT_CALL_SUCCESS,
    UPDATE_USER_DETAILS,
    USER_API_PENDING,
    USER_API_SUCCESS,
    AUTH_VIEW_INDEX_CHANGE,
    FORGET_PASSWORD_VIEW_INDEX_CHANGE,
    COMPLETE_SIGNUP_INDEX_CHANGE,
    USER_API_ERROR,
    LOGOUT,
    SEND_USER_OTP,
    SEND_USER_OTP_PENDING,
    VERIFY_OTP,
    VERIFY_OTP_PENDING,
    EDIT_USER_DISPLAYNAME_PENDING,
    GET_USER_ORGS,
    GET_USER_ORGS_PENDING,
    OTP_ERROR,
  } from '../actions/userActionType';
  
  const initialPendingState = {
    loginPending: false,
    forgotPasswordPending: false,
    resetPasswordPending: false,
    changePasswordPending: false,
    completeSignupPending: false,
    resendEmailPending: false,
    resendVerEmailPending: false,
    verifyResetRequestPending: true,
    verifySignupCompleteRequestPending: true,
    getUserPending: true,
    otpPending: false,
    verifyOtpPending: false,
    editUserDisplaynamePending: false,
    getUserOrgsPending: false,
  };
  
  const initialForgetPasswordState = {
    forgotPassEmailSent: false,
    forgotPassConfirm: false,
    resetPassSuccess: false,
    changePassSuccess: false,
  };
  
  const initialCompleteSignupState = {
    signUpVerfied: false,
  };
  
  const initialState = {
    ...initialPendingState,
    ...initialForgetPasswordState,
    ...initialCompleteSignupState,
    _id: null,
    isAuth: false,
    isVerified: false,
    exists: true,
    error: null,
    confirming: true,
    updateUserDetailsSuccess: false,
    updateUserDetailsErr: false,
    pending: false,
    callRequestSuccess: false,
    registerResponse: null,
    role: 'common',
    email: '',
    displayName: '',
    is_mobile_verified: false,
    org_id: '',
    org_name: '',
    user_type: 'admin',
    photo_url: '',
    mobile_number: '',
    guide: {
      work_category: 0,
      project_plan: 0,
      work_category_detail: 0,
      manage_task: 0,
    },
    authViewIndex: 0,
    forgetPasswordViewIndex: 0,
    completeSignupViewIndex: 0,
    phoneNumber: '',
    userOrgs: [],
    user: {},
    otpError: null,
  };
  
  export default function userreducer(
    state = initialState,
    { type, payload, error }
  ) {
    switch (type) {
      case LOGIN:
        return { ...state, ...payload };
      case LOGIN_PENDING:
        return {
          ...state,
          loginPending: payload,
        };
      case GET_USER:
        return {
          ...state,
          ...payload,
          user: payload,
        };
      case GET_USER_PENDING:
        return {
          ...state,
          getUserPending: payload,
        };
      case USER_API_ERROR:
        return { ...state, error };
      case FORGOT_PASSWORD:
        return { ...state, ...payload };
      case FORGOT_PASSWORD_PENDING:
        return {
          ...state,
          forgotPasswordPending: payload,
        };
      case RESET_PASSWORD:
        return { ...state, ...payload };
      case RESET_PASSWORD_PENDING:
        return {
          ...state,
          resetPasswordPending: payload,
        };
      case CHANGE_PASSWORD:
        return { ...state, ...payload };
      case CHANGE_PASSWORD_PENDING:
        return {
          ...state,
          changePasswordPending: payload,
        };
      case RESEND_VERIFY_MAIL_PENDING:
        return {
          ...state,
          resendEmailPending: payload,
        };
      case LOGIN_CHECK:
        return { ...state, ...payload };
      case UPDATE_USER_DETAILS:
        return {
          ...state,
          displayName: payload.displayName,
          photo_url: payload.photo_url,
          email: payload.email,
        };
  
      case VERIFY:
        return { ...state, ...payload };
      case VERIFY_RESET_REQUEST:
        return { ...state, ...payload };
      case VERIFY_RESET_REQUEST_PENDING:
        return { ...state, verifyResetRequestPending: payload };
      case VERIFY_SIGNUP_REQUEST:
        return { ...state, ...payload };
      case VERIFY_SIGNUP_REQUEST_PENDING:
        return { ...state, verifySignupCompleteRequestPending: payload };
      case COMPLETE_SIGNUP: {
        return { ...state, ...payload };
      }
      case COMPLETE_SIGNUP_PENDING:
        return {
          ...state,
          completeSignupPending: payload,
        };
      case USER_API_PENDING:
        return { ...state, ...payload };
      case USER_API_SUCCESS:
        return { ...state, ...payload };
      case REQ_SUPPORT_CALL_SUCCESS:
        return { ...state, callRequestSuccess: true };
      case AUTH_VIEW_INDEX_CHANGE:
        return {
          ...state,
          authViewIndex: payload,
        };
      case FORGET_PASSWORD_VIEW_INDEX_CHANGE:
        return {
          ...state,
          forgetPasswordViewIndex: payload,
        };
      case COMPLETE_SIGNUP_INDEX_CHANGE:
        return {
          ...state,
          completeSignupViewIndex: payload,
        };
      case LOGOUT:
        return initialState;
      case SEND_USER_OTP:
        return { ...state, phoneNumber: payload.mobile_number };
      case SEND_USER_OTP_PENDING:
        return { ...state, otpPending: payload };
      case VERIFY_OTP:
        return { ...state, ...payload };
      case VERIFY_OTP_PENDING:
        return { ...state, verifyOtpPending: payload };
      case EDIT_USER_DISPLAYNAME_PENDING:
        return { ...state, editUserDisplaynamePending: payload };
      case GET_USER_ORGS_PENDING:
        return { ...state, getUserOrgsPending: payload };
      case GET_USER_ORGS: {
        let data = [];
        if (payload.length) {
          data = payload.map(org => {
            return { label: org.org_id.org_name, value: org.org_id._id };
          });
        }
        return { ...state, userOrgs: data };
      }
      case OTP_ERROR:
        return { ...state, otpError: payload };
      default:
        return state;
    }
  }