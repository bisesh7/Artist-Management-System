import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

function EditMusicModal({ show, handleClose, music, fetchMusics }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(1, "Title needs to be at least 1 character")
      .required("Title is required."),
    albumName: Yup.string().required("Album name is required"),
    genre: Yup.string()
      .oneOf(
        ["rnb", "country", "classic", "rock", "jazz"],
        "Genre needs to be rnb, country, classic, rock, jazz.",
      )
      .required("Genre is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: music?.title,
      albumName: music?.album_name,
      genre: music?.genre,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      editMusic({ ...music, ...values });
    },
  });

  const editMusic = async (music) => {
    try {
      const token = localStorage.getItem("token");
      const newUser = music;

      const response = await axios.put(
        `http://localhost:5002/api/music/${music.id}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage("Music edited successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      fetchMusics();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error editing music");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error editing music", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Music</Modal.Title>
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
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Album Name"
                name="albumName"
                onChange={formik.handleChange}
                value={formik.values.albumName}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.albumName && formik.errors.albumName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.albumName}
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-2">
                  <Form.Select
                    name="genre"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                    isInvalid={formik.touched.genre && formik.errors.genre}
                  >
                    <option>Genre</option>
                    <option value="rnb">RnB</option>
                    <option value="country">Country</option>
                    <option value="classic">Classic</option>
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.genre}
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
              Edit Music
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditMusicModal;
