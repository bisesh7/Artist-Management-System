import { Col, Nav, Row } from "react-bootstrap";
import { FaPencilAlt, FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import NavbarComponent from "../Components/NavbarComponent";

const Dashboard = () => {
  return (
    <Row>
      <Col md="3">
        <h4 className="text-center">AMS</h4>
        <span className="text-center"> Artist Management System</span>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">
            <MdOutlineDashboard /> Dashboard
          </Nav.Link>
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
      </Col>
    </Row>
  );
};

export default Dashboard;
