import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/loginform.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, loginState, toastError, toastSuccess, setToken, setError } from "../../actions/userAction";
import {LOGIN_URL} from '../../config/url';
import axios from "axios";
import Cookies from 'js-cookie';



const LogInForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let isAuth = useSelector((state) => state.userReducer.isAuth);


  useEffect(()=>{
    if(Cookies.get('token') != undefined){
      localStorage.setItem('token', Cookies.get('token'))
      dispatch(
        setToken(Cookies.get('token'))
      )

      dispatch(
        getUser()
      )

      history.push({
        pathname: `/app/`,
      });
    }else{
      localStorage.removeItem('token');
    }

  }, [])

  useEffect(() => {
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
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async(values) => {
      let data = {
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password,
      };
      data = JSON.stringify(data);
      localStorage.removeItem("token");

      dispatch(
        loginState(true)
      )

      await axios({
        method: 'post',
        url: LOGIN_URL,
        data: data,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then(response => {
            dispatch(
              loginState(false)
            );
            const data = response.data;
            localStorage.setItem('token', data.key)
            Cookies.set('token', data.key, { expires: 7, path: '/' })
            dispatch(
              login(data.key)
            );
            dispatch(
              loginState(false)
            );
            dispatch(
              toastSuccess('WELCOME BACK!')
            );
        })
        .catch(error => {
            dispatch(
              loginState(false)
            );
            let status = error.response.status;
            switch(status){
              case 401:
                    dispatch(
                      setError(status, "Authorization required")
                    )
                    break;
              case 500:
                    dispatch(
                      setError(status, "Internal Server Error")
                    )
                    break;
              case 400:
                   console.log('hello')
                   dispatch(
                     setError(status,  "You've sent a bad request")
                   )
                   dispatch(
                    toastError('Invalid Credentials')
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
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Field
          name="username"
          id="form-input-control-username"
          value={formik.values.username}
          onChange={formik.handleChange}
          control={Input}
          placeholder="Username"
          className="username"
        />
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
        <div className="error">{formik.errors.password}</div>
        <div className="form-controls">
          <Button type="submit" content="LOGIN" positive className="login" />
        </div>
      </form>
    </>
  );
};

export default LogInForm;
