import React from "react";
import { MainLayout } from "../components/mainLayout/MainLayout";
import Container from "react-bootstrap/esm/Container";
import { Form, Button } from "react-bootstrap";
import { CustomField } from "../components/mainLayout/customField/CustomField";
// import { Button } from "bootstrap";
const Login = () => {
  const fields = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      name: "name",
      required: true,
    },
    {
      label: "Password",
      placeholder: "Enter your Password",
      name: "password",
      required: true,
      type: "password",
    },
  ];
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
              {fields.map((item, index) => (
                <CustomField {...item} />
              ))}
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Login;
