import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../attorney.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("preview");
function PreviewData(props) {
  const {
    values,
    onBack,
    backLabel,
    onNext,
    nextLabel,
    isSubmitting,
    attorneyInfo,
    locationTypes,
    states,
  } = props;

  const handleSubmit = () => {
    onNext(values);
  };

  const languageMap = (lang) => {
    return lang?.name;
  };

  _logger(attorneyInfo?.languages);
  _logger("locationTypes", locationTypes);
  _logger("states", states);

  const locationName = locationTypes.find(
    (lt) => Number(lt.id) === Number(attorneyInfo?.locationTypeId)
  )?.name;
  const stateName = states.find(
    (st) => Number(st.id) === Number(attorneyInfo?.stateId)
  )?.name;

  return (
    <Fragment>
      <h2 className="mt-5 d-flex justify-content-center">Attorney Info</h2>
      <Card.Body className="p-10 m-5 border rounded attorney-pv">
        <Row className="mb-7 d-flex justify-content-center">
          <Col lg={6} md={12}>
            <Card.Title>PRACTICE NAME</Card.Title>
            <Card.Text className="mb-5">{attorneyInfo?.practiceName}</Card.Text>
            <Card.Title>LOCATION</Card.Title>
            <Card.Subtitle>Address Type</Card.Subtitle>
            <Card.Text>{locationName}</Card.Text>
            <Card.Subtitle>Address Line One</Card.Subtitle>
            <Card.Text>{attorneyInfo?.lineOne}</Card.Text>
            <Card.Subtitle>Address Line Two</Card.Subtitle>
            <Card.Text>{attorneyInfo?.lineTwo}</Card.Text>
            <Card.Subtitle>City</Card.Subtitle>
            <Card.Text>{attorneyInfo?.city}</Card.Text>
            <Card.Subtitle>State</Card.Subtitle>
            <Card.Text>{stateName}</Card.Text>
            <Card.Subtitle>Zip</Card.Subtitle>
            <Card.Text className="mb-5">{attorneyInfo?.zip}</Card.Text>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Card.Title>CONTACT</Card.Title>
            <Card.Subtitle>Phone</Card.Subtitle>
            <Card.Text>{attorneyInfo?.phone}</Card.Text>
            <Card.Subtitle>Email</Card.Subtitle>
            <Card.Text>{attorneyInfo?.email}</Card.Text>
            <Card.Subtitle>Website</Card.Subtitle>
            <Card.Text className="mb-5">{attorneyInfo?.website}</Card.Text>
            <Card.Title>LANGUAGES</Card.Title>
            <Card.Text>
              {attorneyInfo?.languages.map(languageMap).join(", ")}
            </Card.Text>
          </Col>
        </Row>
        <Col>
          <Card.Title>BIO</Card.Title>
          <Card.Text className="mb-5">{attorneyInfo?.bio}</Card.Text>
        </Col>
      </Card.Body>
      <Row md={12}>
        <div className="attorney-Loki-actions d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary d-flex justify-content-center w-20"
            onClick={onBack}
            disabled={isSubmitting}
          >
            {backLabel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary d-flex justify-content-center w-20"
          >
            {nextLabel}
          </button>
        </div>
      </Row>
    </Fragment>
  );
}

export default PreviewData;

PreviewData.propTypes = {
  values: PropTypes.shape({
    practiceName: PropTypes.string,
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateId: PropTypes.number.isRequired,
    zip: PropTypes.string.isRequired,
    bio: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
  }),
  attorneyInfo: PropTypes.shape({
    practiceName: PropTypes.string,
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateId: PropTypes.number.isRequired,
    zip: PropTypes.string.isRequired,
    bio: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
  }),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  locationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  states: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
