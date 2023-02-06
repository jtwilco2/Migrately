import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import Loki from "react-loki";
import {
  BsFillPersonFill,
  BsGeoAltFill,
  BsInfoCircleFill,
  BsTelephoneFill,
  BsChatQuoteFill,
  BsFillCheckSquareFill,
} from "react-icons/bs";
import PracticeName from "./PracticeName";
import AttorneyLocation from "./AttorneyLocation";
import AttorneyBio from "./AttorneyBio";
import AttorneyContact from "./AttorneyContact";
import AttorneyLanguage from "./AttorneyLanguage";
import PreviewData from "./PreviewData";
import attorneyService from "services/attorneyService";
import toastr from "toastr";
import Swal from "sweetalert2";
import "../attorney.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("AttorneyForm");

function AttorneyForm(props) {
  const { currentUser } = props;
  const [attorneyInfo, setAttorneyInfo] = useState({
    practiceName: null,
    locationTypeId: 0,
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: 0,
    latitude: "",
    longitude: "",
    createdBy: 0,
    modifiedBy: 0,
    bio: null,
    phone: null,
    email: null,
    website: null,
    languages: [],
  });
  const [locationTypes, setLocationTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [profileId, setProfileId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    attorneyService
      .getAttorneyByUserId(currentUser.id)
      .then(onGetAttorneySuccess)
      .catch(onGetAttorneyErr);
  }, []);

  const onGetAttorneySuccess = (response) => {
    let info = response.item;
    let attorneyId = info.id;
    setProfileId(attorneyId);
    setAttorneyInfo((prevState) => {
      let profile = {
        ...prevState,
        practiceName: info.practiceName,
        locationTypeId: info.location.id,
        lineOne: info.location.lineOne,
        lineTwo: info.location.lineTwo,
        city: info.location.city,
        zip: info.location.zip,
        stateId: info.location.state.id,
        latitude: info.location.latitude,
        longitude: info.location.longitude,
        createdBy: info.location.createdBy,
        modifiedBy: info.location.modifiedBy,
        bio: info.bio,
        phone: info.phone,
        email: info.email,
        website: info.website,
        languages: info.languages,
      };
      return profile;
    });
  };

  const onGetAttorneyErr = () => {
    _logger("get attorney error");
  };

  const getFormData = (values) => {
    _logger("getFormDataValues", values);
    var languageNames = attorneyInfo.languages.map((lang) => lang.name);
    return {
      practiceName: attorneyInfo.practiceName
        ? attorneyInfo.practiceName
        : null,
      locationTypeId: attorneyInfo.locationTypeId,
      lineOne: attorneyInfo.lineOne,
      lineTwo: attorneyInfo.lineTwo,
      city: attorneyInfo.city,
      zip: attorneyInfo.zip,
      stateId: attorneyInfo.stateId,
      latitude: attorneyInfo.latitude,
      longitude: attorneyInfo.longitude,
      bio: attorneyInfo.bio ? attorneyInfo.bio : null,
      phone: attorneyInfo.phone ? attorneyInfo.phone : null,
      email: attorneyInfo.email ? attorneyInfo.email : null,
      website: attorneyInfo.website ? attorneyInfo.website : null,
      languages: languageNames,
    };
  };

  const onSubmit = (values) => {
    let payload = getFormData(values);
    if (profileId > 0) {
      attorneyService
        .updateAttorney(payload, profileId)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      attorneyService
        .addAttorney(payload)
        .then(onAddAttorneySuccess)
        .catch(onAddAttorneyError);
    }
  };

  const onUpdateSuccess = () => {
    Swal.fire(
      "Attorney Profile Updated!",
      "Please wait to be redirected.",
      "success",
      {
        button: "Ok",
      }
    ).then(navigate("/attorney/profile"));
  };

  const onAddAttorneySuccess = () => {
    Swal.fire(
      "Attorney Profile Created!",
      "Please wait to be redirected.",
      "success",
      {
        button: "Ok",
      }
    ).then(navigate("/attorney/profile"));
  };

  const onUpdateError = () => {
    toastr.error("Update Error");
  };

  const onAddAttorneyError = () => {
    toastr.error("Error");
  };

  const formSteps = [
    {
      label: "Step 1",
      component: <PracticeName attorneyInfo={attorneyInfo} />,
      icon: <BsFillPersonFill />,
    },
    {
      label: "Step 2",
      component: (
        <AttorneyLocation
          attorneyInfo={attorneyInfo}
          setAttorneyInfo={setAttorneyInfo}
          locationTypes={locationTypes}
          setLocationTypes={setLocationTypes}
          states={states}
          setStates={setStates}
        />
      ),
      icon: <BsGeoAltFill />,
    },
    {
      label: "Step 3",
      component: <AttorneyBio attorneyInfo={attorneyInfo} />,
      icon: <BsInfoCircleFill />,
    },
    {
      label: "Step 4",
      component: <AttorneyContact attorneyInfo={attorneyInfo} />,
      icon: <BsTelephoneFill />,
    },
    {
      label: "Step 5",
      component: <AttorneyLanguage attorneyInfo={attorneyInfo} />,
      icon: <BsChatQuoteFill />,
    },
    {
      label: "Step 6",
      component: (
        <PreviewData
          attorneyInfo={attorneyInfo}
          locationTypes={locationTypes}
          states={states}
          onFinish={onSubmit}
        />
      ),
      icon: <BsFillCheckSquareFill />,
    },
  ];

  const mergeValues = (values) => {
    setAttorneyInfo((prevState) => {
      return { ...prevState, ...values };
    });
  };

  return (
    <Container>
      <Card className="border-0 attorney-bg">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h2 className="mb-0 fw-bold">
              {profileId ? "Update Attorney" : "Add Attorney"}
            </h2>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-5">
            <Col lg={12} md={12} sm={12}>
              <Loki
                steps={formSteps}
                onNext={mergeValues}
                onBack={mergeValues}
                onFinish={onSubmit}
                backLabel={"Back"}
                nextLabel={"Next"}
                noActions
              ></Loki>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AttorneyForm;

AttorneyForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};
