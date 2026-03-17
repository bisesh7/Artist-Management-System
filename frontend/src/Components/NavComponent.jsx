import { Nav } from "react-bootstrap";
import { FaPencilAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/nav.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

const NavComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, email: payload.email });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <h4 className="text-center mt-3 text-white">AMS</h4>
      <div className="d-flex justify-content-center text-white">
        <span> Artist Management System</span>
      </div>
      <Nav defaultActiveKey="/home" className="flex-column mt-3">
        <Nav.Link
          className={classNames(styles.navLink, {
            "text-white": true,
          })}
        >
          <FaUser className="ms-5" />
          &nbsp;{user ? user.email : "Profile"}
        </Nav.Link>
        <Nav.Link
          className={classNames(styles.navLink, {
            "text-white": true,
          })}
          eventKey="/users"
          onClick={() => {
            navigate("/dashboard/users");
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
            navigate("/dashboard/artists");
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
          onClick={() => {
            handleLogout();
          }}
        >
          <MdLogout className="ms-5" />
          &nbsp;Logout
        </Nav.Link>
      </Nav>
    </>
  );
};

export default NavComponent;
