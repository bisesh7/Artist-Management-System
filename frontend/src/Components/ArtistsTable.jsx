import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditArtistModal from "./EditArtistModal";

function TableComponent({
  currentPage,
  setCurrentPage,
  totalPages,
  fetchArtists,
  artists,
}) {
  const [showEditArtistModal, setShowEditArtistModal] = useState(false);
  const handleCloseEditArtistModal = () => setShowEditArtistModal(false);
  const handleShowEditArtistModal = () => setShowEditArtistModal(true);

  useEffect(() => {
    fetchArtists(currentPage);
  }, [currentPage]);

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
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr>
              <td>{artist.name}</td>
              <td>{artist.dob}</td>
              <td>{artist.gender}</td>
              <td>{artist.address}</td>
              <td>{artist.first_release_year}</td>
              <td>{artist.no_of_albums}</td>
              <td>{artist.created_at}</td>
              <td>{artist.updated_at}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {}}
                  >
                    <FaUserEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="ms-1">
                    <AiOutlineDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditArtistModal
        show={showEditArtistModal}
        handleClose={handleCloseEditArtistModal}
        fetchArtists={fetchArtists}
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
