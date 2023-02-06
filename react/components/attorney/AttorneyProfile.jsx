import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import "./attorney.css";
import attorneyService from "services/attorneyService";
import userService from "services/userService";
import AttorneyImageCard from "./AttorneyImageCard";
import PropTypes from "prop-types";


function AttorneyProfile(props) {
  const { currentUser } = props;
  const [attorneyData, setAttorneyData] = useState({
    id: null,
    practiceName: null,
    locationType: "",
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    state: "",
    bio: null,
    phone: null,
    email: null,
    website: null,
    languages: [],
  });

  const [profile, setProfile] = useState({
    fName: "",
    lName: "",
    avatarUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserById(props.currentUser.id)
      .then(onGetByIdSuccess)
      .catch(onGetByIdErr);
    attorneyService
      .getAttorneyByUserId(props.currentUser.id)
      .then(onGetByUserIdSuccess)
      .catch(onGetByUserIdError);
  }, []);

  const onGetByIdSuccess = (response) => {
    let newProfile = response.data.item;
    setProfile((prevState) => {
      const attorneyProfile = {
        ...prevState,
        fName: newProfile.firstName,
        lName: newProfile.lastName,
        avatarUrl: newProfile.avatarUrl,
      };
      return attorneyProfile;
    });
  };

  const onGetByIdErr = () => {
    navigate("/login");
  };

  const onGetByUserIdSuccess = (response) => {
    let userInfo = response.item;
    let location = response.item.location;
    setAttorneyData((prevState) => {
      const currUser = {
        ...prevState,
        id: userInfo.id,
        practiceName: userInfo.practiceName,
        locationType: location.locationType.name,
        lineOne: location.lineOne,
        lineTwo: location.lineTwo,
        city: location.city,
        zip: location.zip,
        state: location.state.name,
        bio: userInfo.bio,
        phone: userInfo.phone,
        email: userInfo.email,
        website: userInfo.website,
        languages: userInfo.languages.map((lang) => lang.name),
      };
      return currUser;
    });
  };

  const onGetByUserIdError = () => {
    navigate("/addattorney");
  };

  const handleUpdate = () => {
    navigate("/addattorney");
  };

  return (
    <Container className="border-0">
      <Card className="mb-4 pb-1">
        <Card.Header className="border-0 d-flex justify-content-between align-items-center">
          <div className="mb-3 mb-lg-0">
            <h2 className="display-6 mb-0">{attorneyData?.practiceName}</h2>
          </div>
        </Card.Header>
      </Card>
      <Row className="mb-2">
        <Col lg={3} md={4} sm={12}>
          <AttorneyImageCard
            currentUser={currentUser}
            profile={profile}
            attorneyData={attorneyData}
          />
          <Card className="mb-2">
            <Card.Header className="d-flex justify-content-center">
              <h4 className="mb-0">Contact</h4>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="contact-phone">
                <p className="fw-bold mb-1">Phone</p>
                <p>{attorneyData?.phone}</p>
              </div>
              <div className="contact-email">
                <p className="fw-bold mb-1">Email</p>
                {attorneyData.email !== null || "" ? (
                  <p>{attorneyData.email}</p>
                ) : (
                  <p>N/A</p>
                )}
              </div>
              <div className="contact-address">
                <p className="fw-bold mb-1">Address</p>
                <p className="mb-0">{attorneyData?.lineOne}</p>
                <p className="mb-0">{attorneyData?.lineTwo}</p>
                <p>
                  {attorneyData?.city}, {attorneyData?.state}{" "}
                  {attorneyData?.zip}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          lg={9}
          md={8}
          sm={12}
          className="d-flex flex-column justify-content-between"
        >
          <Card className="mb-2">
            <Card.Header>
              <h3 className="h3 mb-0">About</h3>
            </Card.Header>
            <Card.Body>
              <div className="mb-6">{attorneyData?.bio}</div>
              <div className="mb-4">
                <h4 className="mb-1">Services Provided In</h4>
                <p>{attorneyData?.languages.join(", ")}</p>
              </div>
              <div className="contact-website mb-2">
                <h4 className="mb-1">Website</h4>
                <a href={attorneyData?.website} className="mb-0">
                  {attorneyData?.website}
                </a>
              </div>
            </Card.Body>
          </Card>
          <div className="attorney-Loki-actions d-flex justify-content-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="btn profile-update d-flex justify-content-center w-15"
            >
              Update
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AttorneyProfile;

AttorneyProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
};
