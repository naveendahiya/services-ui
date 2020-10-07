import React, {useState,  useEffect} from "react";
import {
  Button,
  Form,
  Input
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/signupform.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {signup, getUser,signupState, toastSuccess, setError,toastError, emptyError} from '../../actions/userAction';
import axios from "axios";
import {SIGNUP_URL} from '../../config/url';


const SignUpForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let error = useSelector(state => state.userReducer.error);
  let key = useSelector(state => state.userReducer.key);
  let isAuth = useSelector((state) => state.userReducer.isAuth);


  useEffect(() => {
    localStorage.removeItem('token');

    if(isAuth == true){
      dispatch(
        getUser()
      )

      history.push({
        pathname: `/app/`,
      });
    }
  }, [isAuth]);


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validationSchema: Yup.object({
        username: Yup.string()
            .max(20, 'Please enter at least 6 characters and maximum of 20')
            .min(6, 'Please enter at least 6 characters and maximum of 20')
            .required('Required'),
        email: Yup.string().email()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        passwordConfirmation: Yup.string()
            .required('Required'),
    }),

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      let data = {
        username: formik.values.username,
        email: formik.values.email,
        password1: formik.values.password,
        password2: formik.values.passwordConfirmation,
      };
      data = JSON.stringify(data);
      localStorage.removeItem('token');

      dispatch(
        signupState(true)
      )

      await axios({
        method: 'post',
        url: SIGNUP_URL,
        data: data,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then(response => {
            dispatch(
              signupState(false)
            );
            const data = response.data;
            localStorage.setItem('token', data.key);
            dispatch(
              signup(data.key)
            );
            dispatch(
              signupState(false)
            )
            dispatch(
              toastSuccess('ACCOUNT CREATED')
            );
        })
        .catch(error => {
          dispatch(
            signupState(false)
          );  
          let status = error.response.status;
          switch(status){
            case 401: 
                dispatch(
                  setError(status, "Athorization required")
                )
                break;
            case 500:
                dispatch(
                  setError(status, "Internal Server Error")
                )
                break;
            case 400:
                dispatch(
                  setError(status, "You've sent a bad request")
                )
                dispatch(
                  toastError('Check your Credentials')
                )
                break;
            default:
                dispatch(
                  setError(0, '')
                )
                break;
          }

        })
    },
  });

  return (
    <>
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <Form.Field
        name="username"
        id="form-input-control-username"
        value={formik.values.username}
        onChange={formik.handleChange}
        control={Input}
        placeholder="Username"
        className="username"
      />
      <div className="error">{error.username != undefined ? error.username : ''}</div>
      <div className="error">{formik.errors.username}</div>
      <Form.Field
        name="email"
        id="form-input-control-email"
        value={formik.values.email}
        onChange={formik.handleChange}
        control={Input}
        placeholder="Email"
        className="email"
      />
      <div className="error">{error.email != undefined ? error.email : ''}</div>
      <div className="error">{formik.errors.email}</div>
      <Form.Field
        name="password"
        type="password"
        id="form-input-control-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        control={Input}
        placeholder="PASSWORD"
        className="password"
      />
      <div className="error">{error.password1 != undefined ? error.password1.join(', ') : ''}</div>
      <div className="error">{formik.errors.password}</div>
      <Form.Field
        name="passwordConfirmation"
        type="text"
        id="form-input-control-password"
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        control={Input}
        placeholder="PASSWORD CONFIRMATION"
        className="password"
      />
        <div className="error">{formik.errors.passwordConfirmation}</div>
      <div className="form-controls">
        <Button
          name='submit'
          type="submit"
          content="CREATE ACCOUNT"
          positive
          className="create-account"
        />
      </div>
    </form>
    </>
  );
};

export default SignUpForm;
