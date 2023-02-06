import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { useState, useEffect } from "react";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import * as locationService from "services/location/locationService";
import lookUpService from "services/lookUpService";
import toastr from "toastr";
import debug from "sabio-debug";
import locationSchema from "schema/locationSchema";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/migrately/migrately-logo.png";
import "./location.css";
import * as containerStyle from "../usciscenters/uscisCentersGoogleMapCoordinates";
const _logger = debug.extend("Location");

const API_GOOGLE_AUTOCOMPLTE = process.env.REACT_APP_GOOGLE_AUTO_COMPLETE;

function Location() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userFormData, setUserFormData] = useState({
    lineOne: "",
    lineTwo: "",
    zip: "",
    city: "",
    stateId: 0,
    latitude: "",
    longitude: "",
    locationTypeId: 0,
    createdBy: 0,
    modifiedBy: 0,
  });

  const [autoComplete, setAutoComplete] = useState({});

  const [stateOptions, setStateOptions] = useState([]);

  const [locationTypeOptions, setLocationTypeOptions] = useState([]);

  const [latLngMarker, setLatLngMarker] = useState({
    lat: 38,
    lng: -104,
  });
  const [zoom, setZoom] = useState(4);

  const onLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autoComplete) {
      const addressObject = autoComplete.getPlace();
      const address = addressObject.address_components;
      const lat = addressObject.geometry.location.lat();
      const lng = addressObject.geometry.location.lng();
      const place = autoComplete.getPlace();
      const addressComponents = place["address_components"] || [];

      const postalCode = extractFromAddress(addressComponents, "postal_code");
      const streetNumber = extractFromAddress(
        addressComponents,
        "street_number"
      );
      const streetAddress = extractFromAddress(addressComponents, "route");
      const city = extractFromAddress(
        addressComponents,
        "locality" || "political"
      );
      const stateName = extractFromAddress(
        addressComponents,
        "administrative_area_level_1"
      );

      function extractFromAddress(components, type) {
        return (
          components
            .filter((component) => component.types.indexOf(type) === 0)
            .map((item) => item.short_name)
            .pop() || null
        );
      }
      setUserFormData({
        ...userFormData,
        lineOne: `${streetNumber}  ${streetAddress}`,
        lineTwo: streetNumber,
        city: city,
        stateId: stateOptions.find((state) => state.name === stateName).id,
        zip: postalCode,
        latitude: lat,
        longitude: lng,
      });

      setLatLngMarker({
        ...latLngMarker,
        lat: lat,
        lng: lng,
      });
      setZoom(15);

      return address;
    }
  };

  const onSumbitClick = (values) => {
    values.locationTypeId = parseInt(values.locationTypeId);
    values.stateId = parseInt(values.stateId);

    if (state?.type === "Address_Edit") {
      locationService
        .updateLocation(values, state.payload.id)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      locationService
        .logLocation(values)
        .then(onLogLocationSuccess)
        .catch(onLogLocationError);
    }
  };

  const onUpdateSuccess = (response) => {
    toastr["success"]("Location Updated  ");
    navigate(`/location/mylist`);
    _logger(response, "Location Updated");
  };

  const onUpdateError = (errResponse) => {
    toastr["error"]("Failed to Update");
    _logger(errResponse, "Failed to Update");
  };

  const onLogLocationSuccess = (response) => {
    toastr["success"]("Location Added ");
    navigate(`/location/mylist`);
    _logger(response, "onLogLocationSuccess");
  };

  const onLogLocationError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "onLogLocationError");
  };

  useEffect(() => {
    lookUpService
      .LookUp(["States"])
      .then(onStatesApiSuccess)
      .catch(onStatesApiSuccessError);

    lookUpService
      .LookUp(["LocationTypes"])
      .then(onLocationTypeApiSuccess)
      .catch(onLocationTypeApiSuccessError);

    if (state?.type === "Address_Edit") {
      const updating = state.payload;

      setUserFormData({
        lineOne: updating.lineOne,
        lineTwo: updating.lineTwo,
        city: updating.city,
        zip: updating.zip,
        latitude: updating.latitude,
        longitude: updating.longitude,
        locationTypeId: updating.locationType.id,
        stateId: updating.state.id,
        id: updating.id,
      });

      setLatLngMarker({
        lat: updating.latitude,
        lng: updating.longitude,
      });
      setZoom(15);
    }
  }, []);

  const onStatesApiSuccess = (response) => {
    var target = response.item;

    setStateOptions(() => {
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

    setLocationTypeOptions(() => {
      return arrayOfLocationTypes.locationTypes;
    });
  };

  const onStatesApiSuccessError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "err");
  };

  const onLocationTypeApiSuccessError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "err");
  };

  return (
    <React.Fragment>
      <Row className="location-container pb-5 pt-10 migrately-theme-background">
        <LoadScript
          googleMapsApiKey={API_GOOGLE_AUTOCOMPLTE}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle.containerStyle}
            center={latLngMarker}
            zoom={zoom}
          >
            <Marker
              title="Address"
              position={latLngMarker}
              animation="drop"
            ></Marker>
          </GoogleMap>

          <Formik
            enableReinitialize={true}
            initialValues={userFormData}
            onSubmit={onSumbitClick}
            validationSchema={locationSchema}
          >
            <Form className="col-5  form-control-lg location-form">
              <div src={logo}></div>
              <Row>
                <Col>
                  <label htmlFor="Address" className="form-label ">
                    Address Line 1
                  </label>

                  <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                    <Field
                      size="sm"
                      type="text"
                      placeholder="1234 Main St "
                      className="form-control form-control-sm "
                      name="lineOne"
                    />
                  </Autocomplete>

                  <ErrorMessage
                    className="location-errorMsg"
                    name="lineOne"
                    component="div"
                  ></ErrorMessage>
                </Col>
                <Col>
                  <label htmlFor="Address2" className="form-label">
                    Address Line 2
                  </label>
                  <Field
                    size="sm"
                    type="text"
                    placeholder="Apartment, studio, or floor "
                    className="form-control form-control-sm "
                    name="lineTwo"
                  />{" "}
                  <ErrorMessage
                    className="location-errorMsg"
                    name="lineTwo"
                    component="div"
                  ></ErrorMessage>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <Field
                    size="sm"
                    type="text"
                    placeholder="city"
                    className="form-control form-control-sm "
                    id="city"
                    name="city"
                  />{" "}
                  <ErrorMessage
                    className="location-errorMsg"
                    name="city"
                    component="div"
                  ></ErrorMessage>
                </Col>
                <Col>
                  <label htmlFor="stateId" className="form-label">
                    State
                  </label>
                  <Field
                    className="form-select col-5  "
                    id="stateId"
                    name="stateId"
                    as="select"
                  >
                    <option>Select State</option>
                    {stateOptions.length > 0 &&
                      stateOptions.map(mapStateOption)}
                  </Field>
                  <ErrorMessage
                    className="location-errorMsg"
                    name="stateId"
                    component="div"
                  ></ErrorMessage>
                </Col>
                <Col>
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <Field
                    size="sm"
                    type="text"
                    placeholder="zip"
                    className="form-control form-control-sm "
                    id="zip"
                    name="zip"
                  />{" "}
                  <ErrorMessage
                    className="location-errorMsg"
                    name="zip"
                    component="div"
                  ></ErrorMessage>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label htmlFor="latitude" className="form-label">
                    Latitude
                  </label>
                  <Field
                    size="sm"
                    type="number"
                    placeholder=" 34.0522 "
                    className="form-control form-control-sm "
                    id="latitude"
                    name="latitude"
                    disabled
                  />{" "}
                  <ErrorMessage
                    className="location-errorMsg"
                    name="latitude"
                    component="div"
                  ></ErrorMessage>
                </Col>
                <Col>
                  <label htmlFor="longitude" className="form-label">
                    Longitude
                  </label>
                  <Field
                    size="sm"
                    type="text"
                    placeholder="-118.2437 "
                    className="form-control form-control-sm "
                    id="longitude"
                    name="longitude"
                    disabled
                  />{" "}
                  <ErrorMessage
                    className="location-errorMsg"
                    name="longitude"
                    component="div"
                  ></ErrorMessage>
                </Col>
              </Row>
              <br></br>
              <Row>
                <label htmlFor="locationTypeId" className="form-label">
                  Address Type
                </label>
                <Field
                  className="form-select col-5 form-control-location"
                  id="locationTypeId"
                  name="locationTypeId"
                  as="select"
                >
                  <option>Select Location Type</option>
                  {locationTypeOptions.length > 0 &&
                    locationTypeOptions.map(mapLocationTypeOption)}
                </Field>
                <ErrorMessage
                  className="location-errorMsg"
                  name="locationTypeId"
                  component="div"
                ></ErrorMessage>
              </Row>

              <Row>
                <Col>
                  <br></br>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>{" "}
              </Row>
            </Form>
          </Formik>
        </LoadScript>
      </Row>
    </React.Fragment>
  );
}

export default React.memo(Location);
