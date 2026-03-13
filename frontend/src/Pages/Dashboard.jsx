import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { FaPencilAlt, FaSearch, FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import UsersTable from "../Components/UsersTable";
import styles from "../Styles/nav.module.scss";
import classNames from "classnames";
import UsersComponent from "../Components/UsersComponent";

const Dashboard = () => {
  return (
    <Row>
      <Col md="3" className={styles.sideNav}>
        <h4 className="text-center mt-3 text-white">AMS</h4>
        <div className="d-flex justify-content-center text-white">
          <span> Artist Management System</span>
        </div>
        <Nav defaultActiveKey="/home" className="flex-column mt-3">
          <Nav.Link
            className={classNames(styles.navLink, {
              "text-white": true,
            })}
            eventKey="/users"
          >
            <FaUsers className="ms-5" />
            &nbsp;Users
          </Nav.Link>
          <Nav.Link
            className={classNames(styles.navLink, {
              "text-white": true,
            })}
            eventKey="/artists"
          >
            <FaPencilAlt className="ms-5" />
            &nbsp;Artists
          </Nav.Link>
          <Nav.Link
            className={classNames(styles.navLink, {
              "text-white": true,
            })}
            eventKey="/logout"
          >
            <MdLogout className="ms-5" />
            &nbsp;Logout
          </Nav.Link>
        </Nav>
      </Col>

      <Col>
        <UsersComponent />
      </Col>
    </Row>
  );
};

export default Dashboard;
