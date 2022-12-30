import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { postTransction } from "../../../helpers/axiosHelper";

const initalState = {
  name: "",
  type: "",
  amount: "",
};

// why do we need to destructure the props
export const CustomForm = ({ fetchingTransaction, checkTotalExpense }) => {
  const [loginUser, setLoginUser] = useState(initalState);
  useEffect(() => {
    const getUser = sessionStorage.getItem("user");

    if (getUser) {
      setLoginUser(JSON.parse(getUser));
    }
    console.log(loginUser._id);
  }, []);

  const [tarnsaction, setTransaction] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { status, message } = await postTransction(tarnsaction);

    // console.log(result);
    toast[status](message);

    console.log(status);
    if (status === "success") {
      fetchingTransaction();
      setTransaction(initalState);
    }
    checkTotalExpense();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setTransaction({
      ...tarnsaction,
      [name]: value,
    });

    // console.log(tarnsaction);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row className="gap-3">
        <Col className="md gap-2">
          <Form.Select
            onChange={handleOnChange}
            name="type"
            defaultValue="Choose..."
            required
            value={tarnsaction.type}
          >
            <option>Choose...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            onChange={handleOnChange}
            required
            placeholder="Transaction Name"
            name="name"
            value={tarnsaction.name}
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Amount"
            type="number"
            name="amount"
            required
            onChange={handleOnChange}
            value={tarnsaction.amount}
          />
        </Col>
        <Col>
          <div className="d-grid">
            <Button variant="success" type="submit">
              Add Transaction
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
