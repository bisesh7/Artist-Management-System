import { Button, Modal } from "react-bootstrap";

const DeleteUserModal = ({
  showDeleteModal,
  handleCloseDeleteModal,
  userToDelete,
  handleDeleteUser,
}) => {
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {userToDelete?.fname}{" "}
          {userToDelete?.lname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await handleDeleteUser(userToDelete.id);
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

export default DeleteUserModal;
