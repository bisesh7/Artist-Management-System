import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

function AddArtistModal({ show, handleClose, fetchArtists }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(1, "Name needs to be at least 1 character")
      .required("Name is required."),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string()
      .oneOf(["m", "f", "o"], "Gender needs to be m, f or o.")
      .required("Gender is required"),
    address: Yup.string().required("Address is required"),
    firstReleaseYear: Yup.number(),
    noOfAlbumsReleased: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      firstReleaseYear: "",
      noOfAlbumsReleased: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      createArtist(values);
      console.log(values);
    },
  });

  const createArtist = async (artistData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5002/api/artists",
        artistData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage("Artist created successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      fetchArtists();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating artist");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error creating artist", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Artist</Modal.Title>
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
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
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
            </Row>
            <Row>
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
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="First release year"
                    name="firstReleaseYear"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstReleaseYear}
                    isInvalid={
                      formik.touched.firstReleaseYear &&
                      formik.errors.firstReleaseYear
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstReleaseYear}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Number of albums"
                    name="noOfAlbumsReleased"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.noOfAlbumsReleased}
                    isInvalid={
                      formik.touched.noOfAlbumsReleased &&
                      formik.errors.noOfAlbumsReleased
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.noOfAlbumsReleased}
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
              Create Artist
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddArtistModal;
