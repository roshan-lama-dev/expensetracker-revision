import React, { useRef } from "react";
import { MainLayout } from "../components/mainLayout/MainLayout";
import Container from "react-bootstrap/esm/Container";
import { Form, Button, Row, Col } from "react-bootstrap";
import { CustomField } from "../components/mainLayout/customField/CustomField";
import { Link } from "react-router-dom";
import { getUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { Button } from "bootstrap";
const Login = () => {
  // we use useRef to retain the data even after the component rerenders
  const emailRef = useRef("");
  const pinRef = useRef("");
  const navigate = useNavigate();
  // let resilt = "";
  //WE GET the login details only after the submit button is clicked
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // WE ARE CREATING AN OBJECT THAT STORES THE VALUE FROM THE USEREF
    const loginObj = {
      email: emailRef.current.value,
      pin: pinRef.current.value,
    };

    // we  further destructure the data from the axioshelper
    // WE are destrucuting the status, message and result
    const { status, message, result } = await getUser(loginObj);
    toast[status](message);
    // the result is then used to add to the session storage.

    if (status === "success" && result?._id) {
      sessionStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    }
    // resilt = sessionStorage.getItem("user");
  };

  const fields = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      name: "email",
      required: true,
      forwaredref: emailRef,
    },
    {
      label: "Password",
      placeholder: "Enter your Password",
      name: "password",
      required: true,
      type: "password",
      forwaredref: pinRef,
    },
  ];

  return (
    <MainLayout>
      <Container className="mt-5">
        <Row>
          <Col className="col bg-success text-center text-light p-5 m-1 d-flex direction-column justify-content-center align-items-center d-xs">
            <h3> Welcome back to the Expenses Tracker System</h3>
          </Col>
          <Col className="col m-1">
            <Form onSubmit={handleOnSubmit}>
              {fields.map((item, index) => (
                <CustomField {...item} key={index} />
              ))}

              <div className="d-grid">
                {" "}
                <Button variant="success" type="submit">
                  LOGIN
                </Button>
              </div>
              <div className="text-end md">
                <Link to="/register">Don't have an account?</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Login;
