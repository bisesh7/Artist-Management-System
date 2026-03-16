import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

function EditUserModal({ show, handleClose, user, fetchUsers }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(1, "First name needs to be at least 1 character")
      .required("First name is required."),
    lname: Yup.string()
      .min(1, "Last name needs to be at least 1 character")
      .required("Last name is required."),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords need to match",
    ),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string()
      .oneOf(["m", "f", "o"], "Gender needs to be m, f or o.")
      .required("Gender is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: user?.fname || "",
      lname: user?.lname || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      dateOfBirth: user?.dob || "",
      gender: user?.gender || "",
      address: user?.address || "",
      phoneNumber: user?.phone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      editUser({ ...values, id: user.id });
    },
  });

  const editUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const newUser = user;

      if (!newUser.password) {
        delete newUser.password;
        delete newUser.confirmPassword;
      }

      const response = await axios.put(
        `http://localhost:5002/api/users/${user.id}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage("User edited successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error editing user");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error editing user", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
              Edit User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditUserModal;
