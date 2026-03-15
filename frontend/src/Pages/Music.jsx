import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState } from "react";
import MusicTable from "../Components/MusicTable";
import AddMusicModal from "../Components/AddMusicModal";
import styles from "../Styles/nav.module.scss";
import NavComponent from "../Components/NavComponent";

const MusicComponent = () => {
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);
  const handleCloseAddMusicModal = () => setShowAddMusicModal(false);
  const handleShowAddMusicModal = () => setShowAddMusicModal(true);

  return (
    <Row>
      <Col md="3" className={styles.sideNav}>
        <NavComponent />
      </Col>

      <Col>
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
              <Col className="d-flex justify-content-end ps-0">
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
      </Col>
    </Row>
  );
};

export default MusicComponent;
