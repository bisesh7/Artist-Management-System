import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ArtistsTable from "../Components/ArtistsTable";
import { IoDownload } from "react-icons/io5";
import { useState } from "react";
import AddArtistModal from "../Components/AddArtistModal";
import styles from "../Styles/nav.module.scss";
import NavComponent from "../Components/NavComponent";
import axios from "axios";

const ArtistsComponent = () => {
  const [showAddArtistsModal, setShowAddArtistsModal] = useState(false);
  const handleCloseAddArtistsModal = () => setShowAddArtistsModal(false);
  const handleShowAddArtistsModal = () => setShowAddArtistsModal(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [artists, setArtists] = useState([]);

  const fetchArtists = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5002/api/artists?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setArtists(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col md="3" className={styles.sideNav}>
        <NavComponent />
      </Col>

      <Col>
        <>
          <h1 className="my-3">Artist Management</h1>

          <div className="me-3">
            <Row>
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
                  <Button onClick={handleShowAddArtistsModal}>
                    <FaPlus /> Add Artists{" "}
                  </Button>
                  <AddArtistModal
                    show={showAddArtistsModal}
                    handleClose={handleCloseAddArtistsModal}
                    fetchArtists={fetchArtists}
                  />
                </div>
              </Col>
            </Row>

            <ArtistsTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              fetchArtists={fetchArtists}
              artists={artists}
            />
          </div>
        </>
      </Col>
    </Row>
  );
};

export default ArtistsComponent;
