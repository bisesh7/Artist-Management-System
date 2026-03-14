import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../helpers/NewUserValidationSchema";

const SignUpComponent = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h1>Create Your Account</h1>

      <Form noValidate onSubmit={formik.handleSubmit}>
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
                isInvalid={formik.touched.password && formik.errors.password}
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

        <div class="d-grid gap-2">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpComponent;
