import LoginComponent from "../Components/LoginComponent";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../Styles/login.module.scss";
import classNames from "classnames";

const Login = () => {
  return (
    <Row className="vh-100">
      <Col md="8" className="d-flex justify-content-center align-items-center">
        <div
          className={classNames(styles.loginBox, {
            "align-center": true,
          })}
        >
          <div className="d-flex">
            <h1>AMS</h1>
            <BsPersonCircle size={32} className="mt-2 ms-2" />
          </div>

          <span className="mb-2">Artist Management System</span>
          <LoginComponent />
        </div>
      </Col>
      <Col md="3" className="d-flex justify-content-center align-items-center">
        <div>
          <h2>New User Registration</h2>
          <span>
            Don't have an account? Complete the registration form to get
            started.
          </span>
          <br />
          <div class="d-grid gap-2 mt-2">
            <Button>Register New Account</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
