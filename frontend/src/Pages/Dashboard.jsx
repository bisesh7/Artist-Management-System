import { Col, Nav, Row } from "react-bootstrap";
import { FaPencilAlt, FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import styles from "../Styles/nav.module.scss";
import classNames from "classnames";
import UsersComponent from "../Components/UsersComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArtistsComponent from "../Components/ArtistsComponent";
import MusicComponent from "../Components/MusicComponent";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artistId } = useParams();

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
            onClick={() => {
              navigate("/users");
            }}
          >
            <FaUsers className="ms-5" />
            &nbsp;Users
          </Nav.Link>
          <Nav.Link
            className={classNames(styles.navLink, {
              "text-white": true,
            })}
            onClick={() => {
              navigate("/artists");
            }}
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
        {location.pathname === "/dashboard" && <UsersComponent />}
        {location.pathname === "/users" && <UsersComponent />}
        {location.pathname === "/artists" && <ArtistsComponent />}
        {artistId && <MusicComponent />}
      </Col>
    </Row>
  );
};

export default Dashboard;
