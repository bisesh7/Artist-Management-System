import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import UsersTable from "../Components/UsersTable";
import { useState } from "react";
import AddUserModal from "../Components/AddUserModal";
import styles from "../Styles/nav.module.scss";
import NavComponent from "../Components/NavComponent";
import axios from "axios";

const UsersComponent = () => {
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const handleCloseAddUsersModal = () => setShowAddUsersModal(false);
  const handleShowAddUsersModal = () => setShowAddUsersModal(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [users, setUsers] = useState([]);

  const fetchUsers = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5002/api/users?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

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
                    fetchUsers={fetchUsers}
                  />
                </div>
              </Col>
            </Row>

            <UsersTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              fetchUsers={fetchUsers}
              users={users}
            />
          </div>
        </>
      </Col>
    </Row>
  );
};

export default UsersComponent;
