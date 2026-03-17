import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { use, useState } from "react";
import MusicTable from "../Components/MusicTable";
import AddMusicModal from "../Components/AddMusicModal";
import styles from "../Styles/nav.module.scss";
import NavComponent from "../Components/NavComponent";
import { useParams } from "react-router-dom";
import axios from "axios";

const MusicComponent = () => {
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);
  const handleCloseAddMusicModal = () => setShowAddMusicModal(false);
  const handleShowAddMusicModal = () => setShowAddMusicModal(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [musics, setMusics] = useState([]);

  const { artistId } = useParams();

  const fetchMusics = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5002/api/music/${artistId}?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMusics(res.data.data);
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
          <h1 className="my-3">Music Management</h1>

          <div className="me-3">
            <Row>
              <Col className="d-flex justify-content-end ps-0">
                <div>
                  <Button onClick={handleShowAddMusicModal}>
                    <FaPlus /> Add Music{" "}
                  </Button>
                  <AddMusicModal
                    show={showAddMusicModal}
                    handleClose={handleCloseAddMusicModal}
                    fetchMusics={fetchMusics}
                    artistId={artistId}
                  />
                </div>
              </Col>
            </Row>

            <MusicTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              fetchMusics={fetchMusics}
              musics={musics}
            />
          </div>
        </>
      </Col>
    </Row>
  );
};

export default MusicComponent;
