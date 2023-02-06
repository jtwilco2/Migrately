import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import migratelyLogo from "../../assets/images/migrately/migrately-logo.png";
import FileUpload from "components/fileUpload/FileUpload";
import PropTypes from "prop-types";
import "./userstyles.css";

import debug from "sabio-debug";
import { Card, Col, Row, Image, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as validation from "../../schemas/userSchema";
import userService from "services/userService";
import toastr from "toastr";
import Swal from "sweetalert2";

const _logger = debug.extend("User Change Form");

const UserSettingsChange = (props) => {
  const currentUser = props.currentUser;
  _logger(currentUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userExistingData, setUserExistingData] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
  });

  const getUser = (userId) => {
    userService.getCurrentUser(userId).then(getUserSuccess).catch(getUserError);
  };

  const getUserById = (id) => {
    userService
      .getUserById(id)
      .then(getUserByIdSuccess)
      .catch(getUserByIdError);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUserByIdSuccess = (userResponse) => {
    toastr.success("Success! User Data Retrieved!", "Success");
    setUserExistingData((prevState) => {
      _logger("userData Response--->", userResponse);
      const userData = { ...prevState, ...userResponse.data.item };
      return userData;
    });
  };

  const getUserByIdError = (response) => {
    toastr.error("Something's wrong! Error retrieving User Id", "Error");
    _logger("User Data Error", response);
  };

  const getUserSuccess = (userResponse) => {
    toastr.success("Success! User Data Retrieved!", "Success");
    const userId = userResponse.data.item.id;
    getUserById(userId);
  };

  const getUserError = (response) => {
    toastr.error("Something's wrong! Error retrieving User data", "Error");
    _logger("User Data Error", response);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Would you like to change your password?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result["isConfirmed"]) {
        toastr.info("On the move!", "Redirecting", "Info");
        navigate("/resetpassword");
      }
    });
  };

  const handleSubmit = (values) => {
    Swal.fire({
      title: "Update your information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result["isConfirmed"]) {
        userService
          .updateUserData(id, values)
          .then(onUpdateSuccess)
          .catch(onUpdateError);
      } else if (result["isDenied"]) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const onUpdateSuccess = (response) => {
    setUserExistingData((prevstate) => {
      const prevUserData = { ...prevstate };
      _logger("update response--->", response);
      return prevUserData;
    });
    Swal.fire("Awesome!", "You updated your info!!", "success");
  };

  const onUpdateError = (e, response) => {
    e.preventDefault();
    toastr.error("Something's wrong! Can't Update", "Error");
    _logger(response);
  };

  const uploadFile = (file, setFieldValue) => {
    setFieldValue("imageUrl", file[0].url);
  };

  return (
    <React.Fragment>
      <div className="row py-6 px-12 migrately-theme-background">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col lg={7} md={5} className="py-8 py-xl-0">
            <Card>
              <Card.Body className="p-6">
                <div className="mb-4">
                  <div className="user-align-center">
                    <Link to="/">
                      <Image
                        src={migratelyLogo}
                        className="mb-4 user-align-center"
                        alt="Migrately Logo"
                      />
                    </Link>
                  </div>
                  <h2 className="fw-bold user-align-center">
                    User Settings Change Form
                  </h2>
                </div>

                <Formik
                  enableReinitialize={true}
                  initialValues={userExistingData}
                  onSubmit={(onPasswordChange, handleSubmit)}
                  validationSchema={validation.validationChangeUserSettings}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="firstName"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="firstName"
                            className="user-form-label-text"
                          >
                            First Name
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="firstName"
                          />
                        </Col>
                        <Col lg={6} md={12} className="mb-3">
                          <label
                            htmlFor="lastName"
                            className="user-form-label-text"
                          >
                            Last Name
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="lastName"
                          />
                        </Col>
                        <div className="mb-3">
                          <ErrorMessage
                            name="avatarUrl"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="avatarUrl"
                            className="user-form-label-text"
                          >
                            Avatar Image
                          </label>
                          <FileUpload
                            onFileSubmitSuccess={(file) =>
                              uploadFile(file, setFieldValue)
                            }
                            name="avatarUrl"
                          ></FileUpload>
                        </div>
                        <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                          <Button
                            type="route"
                            onClick={onPasswordChange}
                            variant="warning"
                          >
                            Change Password
                          </Button>
                        </Col>
                        &nbsp;
                        <div>
                          <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                            <Button
                              type="submit"
                              onClick={handleSubmit}
                              variant="primary"
                            >
                              Save Changes
                            </Button>
                          </Col>
                        </div>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

UserSettingsChange.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserSettingsChange;
