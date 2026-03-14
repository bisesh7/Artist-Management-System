import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditArtistModal from "./EditArtistModal";

function TableComponent() {
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;

  const [showEditArtistModal, setShowEditArtistModal] = useState(false);
  const handleCloseEditArtistModal = () => setShowEditArtistModal(false);
  const handleShowEditArtistModal = () => setShowEditArtistModal(true);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>First Release Year</th>
            <th>Number of albums</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bisesh</td>
            <td>Shakya</td>
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
                onClick={handleShowEditArtistModal}
              >
                <FaUserEdit />
              </Button>
              <Button variant="outline-danger" size="sm" className="ms-1">
                <AiOutlineDelete />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Bisesh</td>
            <td>Shakya</td>
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
            <td>Bisesh</td>
            <td>Shakya</td>
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
      <EditArtistModal
        show={showEditArtistModal}
        handleClose={handleCloseEditArtistModal}
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
