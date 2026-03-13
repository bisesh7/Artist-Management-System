import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { FaPencilAlt, FaSearch, FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import NavbarComponent from "../Components/NavbarComponent";
import { FaPlus } from "react-icons/fa6";
import UsersTable from "../Components/UsersTable";

const Dashboard = () => {
  return (
    <Row>
      <Col md="3">
        <h4 className="text-center mt-3">AMS</h4>
        <div className="d-flex justify-content-center">
          <span> Artist Management System</span>
        </div>
        <Nav defaultActiveKey="/home" className="flex-column ms-5 mt-3">
          <Nav.Link eventKey="/users">
            <FaUsers />
            &nbsp;Users
          </Nav.Link>
          <Nav.Link eventKey="/artists">
            <FaPencilAlt />
            &nbsp;Artists
          </Nav.Link>
          <Nav.Link eventKey="/logout">
            <MdLogout />
            &nbsp;Logout
          </Nav.Link>
        </Nav>
      </Col>

      <Col>
        <NavbarComponent />
        <h1>User Management</h1>
        <span>List of users:</span>

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
      </Col>
    </Row>
  );
};

export default Dashboard;
