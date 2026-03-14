import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import ArtistsTable from "./ArtistsTable";

const ArtistsComponent = () => {
  return (
    <>
      <h1 className="my-3">Artist Management</h1>

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

        <ArtistsTable />
      </div>
    </>
  );
};

export default ArtistsComponent;
