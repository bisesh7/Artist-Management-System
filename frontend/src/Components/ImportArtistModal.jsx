import { useState } from "react";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import axios from "axios";

const ImportArtistModal = ({ show, handleClose, fetchArtists }) => {
  const [file, setFile] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImport = async () => {
    if (!file) {
      setAlertMsg("Please select a csv file to upload");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5002/api/artists/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAlertMsg(res.data.message || "CSV imported successfully");
      setAlertVariant("success");
      setShowAlert(true);
      fetchArtists();
      setFile(null);
    } catch (err) {
      setAlertMsg(err.response?.data?.error || "Error importing CSV file");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Artists CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMsg}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Select CSV File</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleImport}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportArtistModal;
