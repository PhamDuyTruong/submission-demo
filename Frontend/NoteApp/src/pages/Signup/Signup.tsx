import React, { useState } from "react";
import "./signup.css";
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {registerUser} from '../../actions/authAction'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function Signup() {
  const [user, setUser] = useState({});

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch : any = useDispatch();

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters")
        .max(20, "Username must not exceed 20 characters"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    });
  };

  interface userRegister {
    username: string;
    email: string;
    phone: string;
    password: string;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };


  const handleSubmit = (value: userRegister) => {
    const data = {
      username: value.username,
      email: value.email,
      phone: value.phone,
      password: value.password,
    };
    dispatch(registerUser(data))
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-holder">
              <Field
                name="username"
                type="text"
                className={
                  "signup-form-control" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
                placeholder="Input username"
                onKeyUp={handleChange}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
                
              />
            </div>

            <div className="form-holder">
              <Field
                name="email"
                type="email"
                className={
                  "signup-form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
                placeholder="Input email"
                onKeyUp={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-holder">
              <Field
                name="phone"
                type="text"
                className={
                  "signup-form-control" +
                  (errors.phone && touched.phone ? " is-invalid" : "")
                }
                placeholder="Input phone"
                onKeyUp={handleChange}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-holder">
              <Field
                name="password"
                type="password"
                className={
                  "signup-form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                placeholder="Input password"
                onKeyUp={handleChange}
              />

              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-login">
              <button className="registerButton" type="submit">
                Sign up
              </button>
              <button className="registerLoginButton">
                <Link
                  className="link"
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Sign in
                </Link>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
