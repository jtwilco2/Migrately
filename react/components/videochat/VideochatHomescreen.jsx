import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../videochat/videochatstyles.css";
import debug from "sabio-debug";
import VideochatHeader from "./VideochatHeader";
import PropTypes, { string } from "prop-types";
import { useState } from "react";

const _logger = debug.extend("VideochatHomescreen");

export default function VideochatHomeScreen(props) {
  const createCall = props.createCall;
  const startHairCheck = props.startHairCheck;
  const currentUser = props.currentUser;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    _logger(currentUser.roles.includes("Admin"));
    if (currentUser.roles.includes("Admin") === true) {
      setIsAdmin(true);
    }
  }, []);

  _logger(currentUser);

  const navigate = useNavigate();

  const onHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onStatisticsClick = (e) => {
    e.preventDefault();
    navigate("/videochat/statistics");
  };

  const startCall = () => {
    createCall().then((url) => {
      _logger(url);
      startHairCheck(url);
    });
  };

  return (
    <React.Fragment>
      <header>
        <VideochatHeader />
      </header>
      {isAdmin && (
        <div className="home-screen">
          <h1>Customer Support Video Chat</h1>
          <p>Start the video chat by clicking the button below.</p>
          <button className="btn btn-primary" onClick={startCall}>
            Start Call
          </button>
          <p className="small">
            Select Allow to use your camera and mic for this call if prompted!
          </p>
          {""}
          {""}
          <div className="row">
            <div className="col">
              <button className="btn btn-secondary" onClick={onHomeClick}>
                Home
              </button>
            </div>
            <div className="col">
              <button className="btn btn-warning" onClick={onStatisticsClick}>
                Statistics
              </button>
            </div>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="home-screen">
          <h1>Customer Support Video Chat</h1>
          <p>
            In order to receive the best available help please message one of
            our customer support specialists.
          </p>
          <div className="row">
            <div className="col">
              <button className="btn btn-secondary" onClick={onHomeClick}>
                Back To Home
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

VideochatHomeScreen.propTypes = {
  createCall: PropTypes.func.isRequired,
  startHairCheck: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(string).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
  }),
};
