import React, {useState} from "react";
import {
  Button,
  Form,
  Input
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import apiClient from "../../config/apiclient";
import "../../styles/signupform.scss";
import Error from '../popup';
import { useHistory } from "react-router-dom";


const SignUpForm = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);

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
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/dj-rest-auth/registration/',
        data: data,
        headers: { "Content-type": "application/json; charset=UTF-8", }
        })
        .then(function (res) {
          console.log(res);
          sessionStorage.setItem("token", res.data.key);
        })
        .catch(function (res) {
            console.log(res);
            setOpen(true);
            setInterval(() => {
              setOpen(false);
            }, 10000);
        });
        await apiClient.get("/dj-rest-auth/user/").then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem("user_id", res.data.pk);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("user_email", res.data.email);
            sessionStorage.setItem("LoggedIn", "true");
            history.push({
              pathname: `/app/`,
            });
          }
        });
    },
  });

  const error = 'Something went wrong!!'
  return (
    <>
    {open == false ? '' : <Error error={error} />}
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
