import { Button, Modal } from "react-bootstrap";

const DeleteMusicModal = ({
  showDeleteModal,
  handleCloseDeleteModal,
  musicToDelete,
  handleDeleteMusic,
}) => {
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {musicToDelete?.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await handleDeleteMusic(musicToDelete.id);
              handleCloseDeleteModal();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteMusicModal;
