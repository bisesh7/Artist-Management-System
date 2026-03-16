import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditUserModal from "./EditUserModal";
import axios from "axios";

function TableComponent({
  currentPage,
  setCurrentPage,
  totalPages,
  fetchUsers,
  users,
}) {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const [userToBeEdited, setUserToBeEdited] = useState(null);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setUserToBeEdited(user);
                    handleShowEditUserModal();
                  }}
                >
                  <FaUserEdit />
                </Button>
                <Button variant="outline-danger" size="sm" className="ms-1">
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditUserModal
        show={showEditUserModal}
        handleClose={handleCloseEditUserModal}
        user={userToBeEdited}
        fetchUsers={fetchUsers}
      />
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default TableComponent;
