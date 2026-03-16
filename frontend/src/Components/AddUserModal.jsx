import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import validationSchema from "../helpers/NewUserValidationSchema";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

function AddUserModal({ show, handleClose, fetchUsers }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      createUser(values);
      resetForm();
    },
  });

  const createUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5002/api/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage("User created successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating user");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error creating user", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {showAlert && (
              <Alert
                variant={alertVariant}
                onClose={() => setShowAlert(false)}
                dismissible
              >
                {message}
              </Alert>
            )}
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.fname && formik.errors.fname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.fname}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                    isInvalid={formik.touched.lname && formik.errors.lname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lname}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="date"
                    placeholder="Date of birth"
                    name="dateOfBirth"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.dateOfBirth}
                    isInvalid={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    isInvalid={formik.touched.gender && formik.errors.gender}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    isInvalid={formik.touched.address && formik.errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    isInvalid={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddUserModal;
