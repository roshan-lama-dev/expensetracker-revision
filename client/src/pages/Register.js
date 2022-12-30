import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { Toast } from "react-toastify/dist/components";

import { CustomField } from "../components/mainLayout/customField/CustomField";
import { MainLayout } from "../components/mainLayout/MainLayout";
import { postUser } from "../helpers/axiosHelper";

const initalState = {
  name: "",
  email: "",
  pin: "",
  confirmPin: "",
};
const Register = () => {
  const [form, setform] = useState(initalState);
  const resgisterFiled = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      name: "email",
      required: true,
      value: form.email,
    },
    {
      label: "Name",
      placeholder: "Enter your name",
      name: "name",
      required: true,
      value: form.name,
    },
    {
      label: "Pin",
      placeholder: "Enter Pin",
      name: "pin",
      type: "password",
      required: true,
      maxlength: "4",
      minLength: "4",
      value: form.pin,
    },
    {
      label: "Confirm Pin",
      placeholder: "Confirm your Pin",
      name: "confirmPin",
      required: true,
      type: "password",
      minLength: "4",
      maxlength: "4",
      value: form.confirmPin,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPin, ...rest } = form;
    if (confirmPin !== rest.pin) {
      toast.error("The pin must match");
      return;
    }

    const { status, message } = await postUser(form);

    toast[status](message);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // check if there is value and check whether the value can be downcastedh
    if (value && (name === "pin" || name === "confirmPin")) {
      if (!+value) {
        // console.log(value);
        toast.error("The PIN must be number");
      }
    }
    // console.log(name, value);
    setform({
      ...form,
      [name]: value,
    });
  };
  return (
    <MainLayout>
      <Container>
        <Row className="mt-5 p-3">
          <Col className="bg-success text-center text-light p-5">
            <h1>Welcome to Expense Tracker</h1>
            <p className="mt-5">
              Please register with your details to use the expense tracker app
            </p>
          </Col>
          <Col className="p-5">
            {" "}
            <Form onSubmit={handleOnSubmit}>
              {resgisterFiled.map((index, item) => (
                <CustomField {...index} key={item} onChange={handleOnChange} />
              ))}

              <div className="d-grid">
                <Button variant="success" type="submit">
                  REGISTER
                </Button>
              </div>

              <div className="text-end">
                <Link to="/"> Already have an account?</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
export default Register;
