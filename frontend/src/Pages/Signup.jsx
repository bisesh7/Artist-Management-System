import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../Styles/auth.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import SignUpComponent from "../Components/SignUpComponent";

const SignUp = () => {
  const navigate = useNavigate();
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
          <SignUpComponent />
        </div>
      </Col>
      <Col md="3" className="d-flex justify-content-center align-items-center">
        <div>
          <h2>Login</h2>
          <span>Already have an account? Click below to login.</span>
          <br />
          <div class="d-grid gap-2 mt-2">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
