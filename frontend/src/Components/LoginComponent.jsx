import React from "react";
import { Button, Form } from "react-bootstrap";
import classNames from "classnames";
import styles from "../Styles/auth.module.scss";

const LoginComponent = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control type="email" placeholder="Email Address" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div class="d-grid gap-2">
          <Button variant="primary">Login</Button>
        </div>
        <div className="d-flex justify-content-end">
          <span className={styles.link}>Forgot Password</span>
        </div>
      </Form>
    </div>
  );
};

export default LoginComponent;
