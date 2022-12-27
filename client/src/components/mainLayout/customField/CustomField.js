import React from "react";

import Form from "react-bootstrap/Form";

export const CustomField = ({ label, forwaredref, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control ref={forwaredref} {...rest} />
      </Form.Group>
    </div>
  );
};
