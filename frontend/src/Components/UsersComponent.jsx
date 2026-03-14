import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import UsersTable from "./UsersTable";
import { useState } from "react";
import AddUserModal from "./AddUserModal";

const UsersComponent = () => {
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const handleCloseAddUsersModal = () => setShowAddUsersModal(false);
  const handleShowAddUsersModal = () => setShowAddUsersModal(true);

  return (
    <>
      <h1 className="my-3">User Management</h1>

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
              <Button onClick={handleShowAddUsersModal}>
                <FaPlus /> Add User{" "}
              </Button>
              <AddUserModal
                show={showAddUsersModal}
                handleClose={handleCloseAddUsersModal}
              />
            </div>
          </Col>
        </Row>

        <UsersTable />
      </div>
    </>
  );
};

export default UsersComponent;
