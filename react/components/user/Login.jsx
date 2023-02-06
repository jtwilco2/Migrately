import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import migratelyLogo from "../../assets/images/migrately/migrately-logo.png";
import "./userstyles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Col, Row, Image, Button } from "react-bootstrap";
import * as validation from "../../schemas/userSchema";
import swal from "sweetalert2";
import logger from "sabio-debug";

const _logger = logger.extend("Login");

const Login = () => {
  const userLoginData = {
    email: "",
    password: "",
  };

  const [currentUser, setCurrentUser] = useState({
    id: 0,
    roles: [],
    email: "",
    isLoggedIn: false,
  });

  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    userService.loginUser(values).then(onLoginSuccess).catch(onLoginFailure);
  };

  const onLoginSuccess = () => {
    userService
      .getCurrentUser()
      .then(onGetCurrentSuccess)
      .catch(onLoginFailure);
  };

  const onGetCurrentSuccess = (response) => {
    const userCurrent = response.data.item;
    if (userCurrent !== null) {
      setCurrentUser((prevState) => {
        let currentUserData = {
          ...prevState,
          id: userCurrent.id,
          email: userCurrent.name,
          roles: userCurrent.roles,
          isLoggedIn: true,
        };
        return currentUserData;
      });
    }
  };

  useEffect(() => {
    if (currentUser.id !== 0 && currentUser.roles !== null) {
      if (currentUser.roles.includes("Admin")) {
        navigate("/analytic");
      } else if (currentUser.roles.includes("Attorney")) {
        navigate("/attorney/profile", { state: currentUser });
      } else if (currentUser.roles.includes("User")) {
        navigate("/");
      } else navigate("/");
    } else if (currentUser.id !== 0) {
      navigate("/");
    }
  }, [currentUser]);

  const onLoginFailure = (error) => {
    _logger(error.response.data.errors[0]);
    const errMsg = error.response.data.errors[0];
    if (errMsg === "One or more errors occurred. (Account has been removed)") {
      swal.fire(
        "UH-OH!",
        "Email is no longer registered. Please contact our IT department at (555) 555-5555.",
        "error"
      );
    } else {
      swal.fire("Error", "Login Failed. Please Try Again.", "error");
    }
  };

  const onEyeClicked = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      <div className="user-form-background">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col lg={5} md={5} className="py-8 py-xl-0">
            <Card>
              <Card.Body className="p-6">
                <div className="mb-4">
                  <Link to="/">
                    <Image
                      src={migratelyLogo}
                      className="mb-4 user-logo"
                      alt=""
                    />
                  </Link>
                  <h1 className="mb-1 fw-bold">Sign in</h1>
                  <span>
                    Don’t have an account?{" "}
                    <Link to="/register" className="ms-1">
                      Sign up
                    </Link>
                  </span>
                </div>

                <Formik
                  enableReinitialize={true}
                  initialValues={userLoginData}
                  onSubmit={handleSubmit}
                  validationSchema={validation.validationLogin}
                >
                  <Form>
                    <div className="mb-3">
                      <ErrorMessage
                        name="email"
                        className="user-form-error"
                        component="div"
                      />
                      <label htmlFor="email" className="user-form-label-text">
                        Email
                      </label>
                      <Field
                        type="email"
                        className="form-control"
                        name="email"
                      />
                    </div>
                    <div className="mb-3">
                      <ErrorMessage
                        name="password"
                        className="user-form-error"
                        component="div"
                      />
                      <label
                        htmlFor="password"
                        className="user-form-label-text"
                      >
                        Password
                      </label>
                      <Field
                        type={showPassword ? "password" : "text"}
                        className="form-control"
                        name="password"
                      />
                      {showPassword ? (
                        <span
                          className="fa fa-eye user-eye-toggle-password me-3"
                          onClick={onEyeClicked}
                        />
                      ) : (
                        <span
                          className="fa fa-eye-slash user-eye-toggle-password me-3"
                          onClick={onEyeClicked}
                        />
                      )}
                    </div>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <Button variant="primary" type="submit">
                        Sign in
                      </Button>
                    </Col>
                  </Form>
                </Formik>
                <span>
                  <br />
                  <Link to="/resetpassword" className="ms-1">
                    Forgot Password?
                  </Link>
                </span>
                <hr className="my-4" />
                <div className="mt-4 text-center">
                  {/* Facebook */}
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-facebook"
                  >
                    <i className="fab fa-facebook"></i>
                  </Link>{" "}
                  {/* Twitter */}
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </Link>{" "}
                  {/* LinkedIn */}
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-linkedin"
                  >
                    <i className="fab fa-linkedin"></i>
                  </Link>{" "}
                  {/* GitHub */}
                  <Link
                    to="#"
                    className="btn-social btn-social-outline btn-github"
                  >
                    <i className="fab fa-github"></i>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Login;
