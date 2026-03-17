import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import EditMusicModal from "./EditMusicModal";
import axios from "axios";
import DeleteMusicModal from "./DeleteMusicModal";

function MusicTable({
  currentPage,
  setCurrentPage,
  totalPages,
  fetchMusics,
  musics,
}) {
  const [showEditMusicModal, setShowEditMusicModal] = useState(false);
  const handleCloseEditMusicModal = () => setShowEditMusicModal(false);
  const handleShowEditMusicModal = () => setShowEditMusicModal(true);

  useEffect(() => {
    fetchMusics(currentPage);
  }, [currentPage]);

  const [musicToBeEdited, setMusicToBeEdited] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [musicToDelete, setMusicToDelete] = useState(null);
  const handleShowDeleteModal = (music) => {
    setMusicToDelete(music);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setMusicToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteMusic = async (musicId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/api/music/${musicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMusics(currentPage);
    } catch (err) {
      console.log("Error deleting music", err.response?.data || err.message);
    }
  };

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
          {musics.map((music) => (
            <tr>
              <td>{music.artist_id}</td>
              <td>{music.title}</td>
              <td>{music.album_name}</td>
              <td>{music.genre}</td>
              <td>{music.created_at}</td>
              <td>{music.updated_at}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setMusicToBeEdited(music);
                      handleShowEditMusicModal();
                    }}
                  >
                    <FaUserEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-1"
                    onClick={() => handleShowDeleteModal(music)}
                  >
                    <AiOutlineDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditMusicModal
        show={showEditMusicModal}
        handleClose={handleCloseEditMusicModal}
        music={musicToBeEdited}
        fetchMusics={fetchMusics}
      />
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />

      <DeleteMusicModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        musicToDelete={musicToDelete}
        handleDeleteMusic={deleteMusic}
      />
    </>
  );
}

export default MusicTable;
