import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import signUpServies from "../services/signUpApi";

const initialErrorState = { error: false, message: "" };

const SignUpFrom = (props) => {
  const { modelhandler, setFormType, setModalIsOpen, formType } = props;

  const [userCred, setUserCred] = useState(null);
  const [errors, setErrors] = useState(initialErrorState);

  const submitHandler = async (e) => {
    e.preventDefault();

    await signUpServies(userCred)
      .then((res) => {
        alert("Sign Up successfully , Now you can login.");
        modelhandler();
      })
      .catch((err) => {
        setErrors({
          ...errors,
          error: true,
          message: "Somthing went wroung try agian.",
        });
      });
  };

  const loginModelhandler = () => {
    setFormType({ ...formType, signUpForm: false, loginForm: true });
    setModalIsOpen(true);
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
        <h2>Sign Up</h2>
      </div>
      <div className="m-auto w-50">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name."
              onChange={onchangeHandler}
            />
          </Form.Group>

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
          <Button className="border-0 bg-white text-body pb-3 px-0" onClick={loginModelhandler}>
            Already have an account, Please login
          </Button>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUpFrom;
