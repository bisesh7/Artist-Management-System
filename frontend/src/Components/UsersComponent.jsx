import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import UsersTable from "./UsersTable";

const UsersComponent = () => {
  return (
    <>
      <h1 className="my-3">User Management</h1>

      <div className="me-3">
        <Row>
          <Col md="">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control placeholder="Search" />
            </InputGroup>
          </Col>
          <Col className="d-flex justify-content-end">
            <div>
              <Button>
                <FaPlus /> Add User{" "}
              </Button>
            </div>
          </Col>
        </Row>

        <UsersTable />
      </div>
    </>
  );
};

export default UsersComponent;
