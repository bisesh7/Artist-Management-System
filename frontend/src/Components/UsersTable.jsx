import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditUserModal from "./EditUserModal";

function TableComponent() {
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);

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
          <tr>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleShowEditUserModal}
              >
                <FaUserEdit />
              </Button>
              <Button variant="outline-danger" size="sm" className="ms-1">
                <AiOutlineDelete />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <FaUserEdit />
              </Button>
              <Button variant="outline-danger" size="sm" className="ms-1">
                <AiOutlineDelete />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Button variant="outline-primary" size="sm">
                <FaUserEdit />
              </Button>
              <Button variant="outline-danger" size="sm" className="ms-1">
                <AiOutlineDelete />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <EditUserModal
        show={showEditUserModal}
        handleClose={handleCloseEditUserModal}
      />
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default TableComponent;
