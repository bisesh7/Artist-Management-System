import LoginComponent from "../Components/LoginComponent";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../Styles/login.module.scss";
import classNames from "classnames";

const Login = () => {
  return (
    <Row className="vh-100">
      <Col className="d-flex justify-content-center align-items-center">
        <div
          className={classNames(styles.loginBox, {
            "align-center": true,
          })}
        >
          <div className="d-flex">
            <h1>AMS</h1>
            <BsPersonCircle size={32} className="mt-2" />
          </div>

          <span>Artist Management System</span>
          <LoginComponent />
        </div>
      </Col>
      <Col>
        <Container>
          <h2>New Admin Registration</h2>
          <span>
            Access the powerful tools for artist and song collection management.
            Complete the registration form.
          </span>{" "}
          <br />
          <Button>Register New Account</Button>
        </Container>
      </Col>
    </Row>
  );
};

export default Login;
