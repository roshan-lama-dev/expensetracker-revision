import React from "react";

import Form from "react-bootstrap/Form";

export const CustomField = ({ label, ...rest }) => {
  return (
    <div>
      {" "}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{label}</Form.Label>
          <Form.Control {...rest} />
        </Form.Group>
      </Form>
    </div>
  );
};
