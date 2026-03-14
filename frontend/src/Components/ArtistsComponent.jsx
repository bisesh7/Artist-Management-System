import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import ArtistsTable from "./ArtistsTable";
import { IoDownload } from "react-icons/io5";
import { useState } from "react";
import AddArtistModal from "./AddArtistModal";

const ArtistsComponent = () => {
  const [showAddArtistsModal, setShowAddArtistsModal] = useState(false);
  const handleCloseAddArtistsModal = () => setShowAddArtistsModal(false);
  const handleShowAddArtistsModal = () => setShowAddArtistsModal(true);

  return (
    <>
      <h1 className="my-3">Artist Management</h1>

      <div className="me-3">
        <Row>
          <Col md="">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control placeholder="Search" />
            </InputGroup>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="me-2">
              <Button variant="outline-dark">
                <IoDownload /> Import CSV
              </Button>
            </div>
            <div className="me-2">
              <Button variant="outline-dark">
                <IoDownload /> Export CSV
              </Button>
            </div>
            <div>
              <Button onClick={handleShowAddArtistsModal}>
                <FaPlus /> Add Artists{" "}
              </Button>
              <AddArtistModal
                show={showAddArtistsModal}
                handleClose={handleCloseAddArtistsModal}
              />
            </div>
          </Col>
        </Row>

        <ArtistsTable />
      </div>
    </>
  );
};

export default ArtistsComponent;
