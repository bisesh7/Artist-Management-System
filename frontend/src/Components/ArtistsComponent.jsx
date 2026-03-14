import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import ArtistsTable from "./ArtistsTable";
import { IoDownload } from "react-icons/io5";

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
            <div className="me-2">
              <Button variant="outline-dark">
                <IoDownload /> Import CSV
              </Button>
            </div>
            <div className="me-2">
              <Button variant="outline-dark">
                <IoDownload /> Export CSV
              </Button>
            </div>
            <div>
              <Button>
                <FaPlus /> Add Artists{" "}
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
