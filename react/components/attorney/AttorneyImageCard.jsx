import React, {Fragment} from "react";
import { Card, Image } from "react-bootstrap";
import { BsCamera } from "react-icons/bs";
import AttorneyImageUpload from "./AttorneyImageUpload";
import PropTypes from "prop-types";


function AttorneyImageCard(props) {

    const {currentUser, profile, attorneyData} = props;

    return (
        <Fragment>
        <Card className="mb-2">
        <Card.Body className="att-img-card d-flex flex-column justify-content-between">
          <div className="text-center d-flex flex-column justify-content-center">
            <div>
              <Image
                src={profile.avatarUrl}
                className="rounded-circle avatar-xxl mb-3 attorney-img"
                alt="attorney profile"
              />
              <div className="att-img-overlay">
                <a href="#" className="update-img-icon" title="User Profile">
                  <i className="BsCamera"><BsCamera/></i>
                </a>
                <div className="att-file-upload">
                  <AttorneyImageUpload profile={profile} currentUser={currentUser}/>
                </div>
              </div>
            </div>
            <h3 className="mb-1">
              {profile.fName} {profile.lName}
            </h3>
            <p className="mb-0 fs-6">
              <i className="fe fe-map-pin me-1"></i>
              {attorneyData.city}, {attorneyData.state}
            </p>
          </div>
        </Card.Body>
      </Card>
      </Fragment>
    )
}

export default AttorneyImageCard;

AttorneyImageCard.propTypes = {
    profile: PropTypes.shape({
      fName: PropTypes.string.isRequired,
      lName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
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
    attorneyData: PropTypes.shape({
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
    })
  };