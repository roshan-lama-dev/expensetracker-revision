import React from "react";
import { MainLayout } from "../components/mainLayout/MainLayout";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <MainLayout>
      <Container className="mt-5">
        <div className="row">
          <div className="col bg-light text-center text-dark p-5 m-1 d-xs">
            <h3> Welcome back to the Expenses Tracker System</h3>
            <p className="mt-5">Please enter your credentials to login</p>
          </div>
          <div className="col m-1">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Login;
