import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import UsersTable from "../Components/UsersTable";
import { useState } from "react";
import AddUserModal from "../Components/AddUserModal";
import styles from "../Styles/nav.module.scss";
import NavComponent from "../Components/NavComponent";

const UsersComponent = () => {
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const handleCloseAddUsersModal = () => setShowAddUsersModal(false);
  const handleShowAddUsersModal = () => setShowAddUsersModal(true);

  return (
    <Row>
      <Col md="3" className={styles.sideNav}>
        <NavComponent />
      </Col>

      <Col>
        <>
          <h1 className="my-3">User Management</h1>

          <div className="me-3">
            <Row>
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
      </Col>
    </Row>
  );
};

export default UsersComponent;
