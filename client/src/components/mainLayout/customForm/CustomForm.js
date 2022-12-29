import React from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const CustomForm = () => {
  return (
    <Form>
      <Row className="gap-3">
        <Col md gap-2>
          <Form.Select name="type" defaultValue="Choose..." required>
            <option>Choose...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control required placeholder="Transaction Name" name="name" />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Amount"
            type="number"
            name="amount"
            required
          />
        </Col>
        <Col>
          <div className="d-grid">
            <Button variant="success">Add Transaction</Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
