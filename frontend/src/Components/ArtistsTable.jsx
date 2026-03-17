import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditArtistModal from "./EditArtistModal";
import axios from "axios";
import DeleteArtistModal from "./DeleteArtistModal";

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

  const [artistToBeEdited, setArtistToBeEdited] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState(null);
  const handleShowDeleteModal = (artist) => {
    setArtistToDelete(artist);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setArtistToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteArtist = async (artistId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/api/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchArtists(currentPage);
    } catch (err) {
      console.log("Error deleting artist", err.response?.data || err.message);
    }
  };

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
              <td>
                <a href={`/dashboard/music/${artist.id}`}>{artist.name}</a>
              </td>
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
                    onClick={() => {
                      setArtistToBeEdited(artist);
                      handleShowEditArtistModal();
                    }}
                  >
                    <FaUserEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-1"
                    onClick={() => handleShowDeleteModal(artist)}
                  >
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
        artist={artistToBeEdited}
        fetchArtists={fetchArtists}
      />
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
      <DeleteArtistModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        artistToDelete={artistToDelete}
        handleDeleteArtist={deleteArtist}
      />
    </>
  );
}

export default TableComponent;
