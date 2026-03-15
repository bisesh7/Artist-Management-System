import { Col, Row } from "react-bootstrap";
import styles from "../Styles/nav.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavComponent from "../Components/NavComponent";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artistId } = useParams();

  return (
    <Row>
      <Col md="3" className={styles.sideNav}>
        <NavComponent />
      </Col>

      <Col>
        <div className="d-flex justify-content-center">
          <h1>Artist Management System</h1>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
