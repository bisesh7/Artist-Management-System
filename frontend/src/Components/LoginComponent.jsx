import { Alert, Button, Form } from "react-bootstrap";
import styles from "../Styles/auth.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      loginUser(values);
    },
  });

  const loginUser = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        values,
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful! Redirecting to dashboard...");
      setShowAlert(true);
      setAlertVariant("success");
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(err.response.data.error);
        setAlertVariant("danger");
        setShowAlert(true);
      }
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      )}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div class="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <span className={styles.link}>Forgot Password</span>
        </div>
      </Form>
    </div>
  );
};

export default LoginComponent;
