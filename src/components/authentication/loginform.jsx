import React from "react";
import {
  Button,
  Form,
  Input
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../../config/apiclient";
import "../../styles/loginform.scss";

const LogInForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
        email: Yup.string().email()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    }),

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      let data = {
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password,
      };
      data = JSON.stringify(data);
    //   await apiClient.post(`/bids/`, data).then((res) => {
    //     console.log(res);
    //   });
    },
  });

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
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
        <Button
          type="submit"
          content="LOGIN"
          positive
          className="login"
        />
      </div>
    </form>
  );
};

export default LogInForm;
