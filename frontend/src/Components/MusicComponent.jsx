import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import UsersTable from "./UsersTable";
import { useState } from "react";
import AddUserModal from "./AddUserModal";
import MusicTable from "./MusicTable";
import AddMusicModal from "./AddMusicModal";

const MusicComponent = () => {
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);
  const handleCloseAddMusicModal = () => setShowAddMusicModal(false);
  const handleShowAddMusicModal = () => setShowAddMusicModal(true);

  return (
    <>
      <h1 className="my-3">Music Management</h1>

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
            <div>
              <Button onClick={handleShowAddMusicModal}>
                <FaPlus /> Add Music{" "}
              </Button>
              <AddMusicModal
                show={showAddMusicModal}
                handleClose={handleCloseAddMusicModal}
              />
            </div>
          </Col>
        </Row>

        <MusicTable />
      </div>
    </>
  );
};

export default MusicComponent;
