import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditMusicModal from "./EditMusicModal";

function MusicTable() {
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;

  const [showEditMusicModal, setShowEditMusicModal] = useState(false);
  const handleCloseEditMusicModal = () => setShowEditMusicModal(false);
  const handleShowEditMusicModal = () => setShowEditMusicModal(true);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Artist Id</th>
            <th>Title</th>
            <th>Album Name</th>
            <th>Genre</th>
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
            <td>@mdo</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleShowEditMusicModal}
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
      <EditMusicModal
        show={showEditMusicModal}
        handleClose={handleCloseEditMusicModal}
      />
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default MusicTable;
