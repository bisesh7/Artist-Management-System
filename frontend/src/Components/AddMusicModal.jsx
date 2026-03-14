import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddMusicModal({ show, handleClose }) {
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
    initialValues: {
      title: "",
      albumName: "",
      genre: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Artist</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
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
              Create Artist
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddMusicModal;
