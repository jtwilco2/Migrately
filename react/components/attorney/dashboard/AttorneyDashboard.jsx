import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CaseStats from "./CaseStats";
import RecentCases from "./RecentCases";
import AttorneyLicense from "./AttorneyLicense";
import Calendar from "./Calendar";
import AttorneyAppointments from "./AttorneyAppointments";
import appointmentService from "../../../services/appointmentService";
import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("AttorneyDashboard");

function AttorneyDashboard(props) {
  const { currentUser } = props;

  const [schedule, setSchedule] = useState({
    schedules: [],
  });

  useEffect(() => {
    let userInfo = { pageIndex: 0, pageSize: 10, id: currentUser.id };
    appointmentService
      .getByCreatedById(userInfo)
      .then(onGetApptSuccess)
      .catch(onGetApptError);
  }, []);

  const onGetApptSuccess = (response) => {
    let apptsArray = response.item.pagedItems;

    setSchedule((prevState) => {
      const pd = { ...prevState };
      pd.schedules = apptsArray.map((appt) => {
        return {
          title: `${appt.client.firstName} ${appt.client.lastName}`,
          date: appt.appointmentStart.split("T", 1).join(),
        };
      });
      return pd;
    });
  };

  const onGetApptError = (err) => {
    _logger(err);
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} xs={12} className="mb-4">
          <div
            className="d-lg-flex
                align-items-center justify-content-between"
          >
            <div className="mb-2 mb-lg-0">
              <h1 className="mb-0 h2 fw-bold">Attorney Dashboard</h1>
            </div>
          </div>
        </Col>
      </Row>
      <CaseStats />
      <Row className="mt-4">
        <Col lg={5} md={12} xs={12} className="mb-4 d-flex flex-column">
          <Calendar
            appointments={schedule.schedules}
            currentUser={currentUser}
          />
          <AttorneyAppointments currentUser={currentUser} />
        </Col>
        <Col lg={7} md={12} xs={12} className="mb-4 d-flex flex-column">
          <RecentCases />
          <AttorneyLicense currentUser={currentUser} />
        </Col>
      </Row>
    </Fragment>
  );
}

export default AttorneyDashboard;

AttorneyDashboard.propTypes = {
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
