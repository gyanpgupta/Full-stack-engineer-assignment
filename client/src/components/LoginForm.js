import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import loginServies from "../services/loginApi";
import UserContext from "./hooks.js/userContext";

const initialUserCredState = {
  email: "",
  password: "",
};

const initialErrorState = {
  error: false,
  message: "",
};

const LoginForm = (props) => {
  const { modelhandler, setFormType, setModalIsOpen, formType } = props;

  const [userCred, setUserCred] = useState(initialUserCredState);
  const [errors, setErrors] = useState(initialErrorState);

  const user = useContext(UserContext);

  const signUpHandler = () => {
    setFormType({ ...formType, signUpForm: true, loginForm: false });
    setModalIsOpen(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginServies(userCred)
      .then((res) => {
        if (res?.status === 1) {
          setErrors(initialErrorState);
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("name", res.userName);
          user.setUserData({ name: res.userName, token: res.token });
          modelhandler();
        } else {
          setErrors({ error: true, message: res?.message });
        }
      })
      .catch((err) => {
        setErrors({
          error: true,
          message: "Somthing went wrong ,Please try again.",
        });
      });
  };

  const onchangeHandler = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
  };

  return (
    <>
      {errors.error && (
        <div>
          <ul className="list-group">
            <li className="list-group-item list-group-item-danger">
              {errors.message}
            </li>
          </ul>
        </div>
      )}
      <div className="text-center">
        <h2>Login</h2>
      </div>
      <div className="m-auto w-50">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={onchangeHandler}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={onchangeHandler}
            />
          </Form.Group>
          <Button
            className="border-0 bg-white text-body pb-3 px-0 "
            onClick={signUpHandler}
          >
            Doesn't have an account, create one
          </Button>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
