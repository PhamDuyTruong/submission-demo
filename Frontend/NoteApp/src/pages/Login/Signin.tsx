import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./Signin.css";
import {useDispatch} from 'react-redux';
import {loginUser} from '../../actions/authAction'
const Signin = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const distpatch: any = useDispatch();
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  interface userLogin {
    email: string;
    password: string;
  }

  const handleSubmit = (value: userLogin) => {
    const data = {
      email: value.email,
      password: value.password,
    };
    distpatch(loginUser(data))
  };

  return (
    <div className="login">
      <span className="loginTitle" style={{ marginBottom: "10px" }}>
        Login
      </span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-holder">
              <Field
                name="email"
                type="text"
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
              <button className="signin-btn" type="submit">
                Sign in
              </button>
            </div>
            <div>
              <p>
                Don't have account ?{" "}
                <span>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", fontSize: "20px", color: "#F45050", fontWeight: "700"}}
                  >
                    Sign up
                  </Link>
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
