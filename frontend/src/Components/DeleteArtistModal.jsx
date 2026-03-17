import { Button, Modal } from "react-bootstrap";

const DeleteArtistModal = ({
  showDeleteModal,
  handleCloseDeleteModal,
  artistToDelete,
  handleDeleteArtist,
}) => {
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {artistToDelete?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await handleDeleteArtist(artistToDelete.id);
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

export default DeleteArtistModal;
