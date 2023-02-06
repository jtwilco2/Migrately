import React, { useState, useEffect, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import lookUpService from "services/lookUpService";
import toastr from "toastr";
import { addAttorneySchema } from "../../../schemas/addAttorneySchema";
import debug from "sabio-debug";

const _logger = debug.extend("Location");
const API_GOOGLE_AUTOCOMPLTE = process.env.REACT_APP_GOOGLE_AUTO_COMPLETE;

function AttorneyLocation(props) {
  const {
    values,
    onBack,
    backLabel,
    onNext,
    nextLabel,
    isSubmitting,
    locationTypes,
    setLocationTypes,
    states,
    setStates,
  } = props;

  const [autoComplete, setAutoComplete] = useState({});

  const onLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autoComplete) {
      const addressObject = autoComplete.getPlace();
      const address = addressObject.address_components;
      const lat = addressObject.geometry.location.lat();
      const lng = addressObject.geometry.location.lng();
      props.setAttorneyInfo({
        ...props.attorneyInfo,
        lineOne: `${address[0].long_name} ${address[1].long_name}`,
        lineTwo: address[0].long_name,
        city: address[2].long_name,
        stateId: states.find(
          (state) =>
            state.name === address[5].short_name ||
            state.name === address[4].short_name
        ).id,
        zip: address[7].long_name,
        latitude: lat,
        longitude: lng,
      });

      return address;
    }
  };

  useEffect(() => {
    lookUpService
      .LookUp(["States"])
      .then(onStatesApiSuccess)
      .catch(onStatesApiError);

    lookUpService
      .LookUp(["LocationTypes"])
      .then(onLocationTypeApiSuccess)
      .catch(onLocationTypeApiError);
  }, []);

  const onStatesApiSuccess = (response) => {
    var target = response.item;
    setStates(() => {
      return target.states;
    });
  };

  const mapStateOption = (state) => {
    return (
      <option value={state.id} key={state.id}>
        {state.name}
      </option>
    );
  };

  const mapLocationTypeOption = (locationType) => {
    return (
      <option value={locationType.id} key={locationType.id}>
        {locationType.name}
      </option>
    );
  };

  const onLocationTypeApiSuccess = (response) => {
    var arrayOfLocationTypes = response.item;

    setLocationTypes(() => {
      return arrayOfLocationTypes.locationTypes;
    });
  };

  const onStatesApiError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "err");
  };

  const onLocationTypeApiError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "err");
  };

  const handleSubmit = () => {
    onNext(values);
  };

  return (
    <Fragment>
      <Card.Body>
        <Row className="mb-5 d-flex justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <LoadScript
              googleMapsApiKey={API_GOOGLE_AUTOCOMPLTE}
              libraries={["places"]}
            >
              <Form onSubmit={handleSubmit}>
                <h4 className="mb-5">LOCATION</h4>
                <div className="form-group mb-5">
                  <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                    <Field
                      type="text"
                      name="lineOne"
                      placeholder="Address Line One"
                      className="form-control"
                      value={values.lineOne}
                    />
                  </Autocomplete>
                  <ErrorMessage
                    name="lineOne"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5">
                  <Field
                    type="text"
                    name="lineTwo"
                    placeholder="Address Line Two"
                    className="form-control"
                    value={values.lineTwo}
                  />
                </div>
                <div className="form-group mb-5">
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="form-control"
                    value={values.city}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5">
                  <Field
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    className="form-control"
                    value={values.zip}
                  />
                  <ErrorMessage
                    name="zip"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5 d-none">
                  <Field
                    type="number"
                    name="latitude"
                    placeholder="Latitude"
                    className="form-control"
                    value={values.latitude}
                    disabled
                  />
                  <ErrorMessage
                    name="latitude"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5 d-none">
                  <Field
                    type="number"
                    name="longitude"
                    placeholder="Longitude"
                    className="form-control"
                    value={values.longitude}
                    disabled
                  />
                  <ErrorMessage
                    name="longitude"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5">
                  <Field
                    as="select"
                    className="form-control"
                    id="states"
                    name="stateId"
                    value={values.stateId}
                  >
                    <option>Select State</option>
                    {states.length > 0 && states.map(mapStateOption)}
                  </Field>
                  <ErrorMessage
                    name="stateId"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
                <div className="form-group mb-5">
                  <Field
                    as="select"
                    className="form-select form-control"
                    id="locationTypeId"
                    name="locationTypeId"
                    value={values.locationTypeId}
                  >
                    <option>Select Location Type</option>
                    {locationTypes.length > 0 &&
                      locationTypes.map(mapLocationTypeOption)}
                  </Field>
                  <ErrorMessage
                    name="locationTypeId"
                    component="div"
                    className="attorney-form-error"
                  />
                </div>
              </Form>
            </LoadScript>
          </Col>
        </Row>
        <Row md={12} sm={12}>
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
      </Card.Body>
    </Fragment>
  );
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    locationTypeId: props.attorneyInfo.locationTypeId,
    lineOne: props.attorneyInfo.lineOne,
    lineTwo: props.attorneyInfo.lineTwo,
    city: props.attorneyInfo.city,
    stateId: props.attorneyInfo.stateId,
    zip: props.attorneyInfo.zip,
    latitude: props.attorneyInfo.latitude,
    longitude: props.attorneyInfo.longitude,
  }),
  validationSchema: addAttorneySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(AttorneyLocation);

AttorneyLocation.propTypes = {
  values: PropTypes.shape({
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateId: PropTypes.number.isRequired,
    zip: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  attorneyInfo: PropTypes.shape({
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateId: PropTypes.number.isRequired,
    zip: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  setAttorneyInfo: PropTypes.shape({
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateId: PropTypes.number.isRequired,
    zip: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
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
  setLocationTypes: PropTypes.func,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  setStates: PropTypes.func,
};
