import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import * as newsletterSignup from "../../services/newsLetterSubscriptionsService";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import * as Yup from "yup";
const basicSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Is Required"),
});

const _logger = debug.extend("NewsLetterSignup");

function NewsLetterSignup(props) {
  const [state] = useState({
    email: "",
    isSubscribed: true,
  });
  _logger("State", state);

  const handleSubmit = (values) => {
    _logger("Basic Values", values);
    newsletterSignup
      .addSubscriber(values)
      .then(onSignupSuccess)
      .catch(onSignupError);
  };

  const onSignupSuccess = (response) => {
    _logger("Logged In!...", response);
    Swal.fire({
      title: "Successfully Subscribed!",
      text: "You have successfully subscribed to receive Newsletters.",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
  };

  const onSignupError = (err) => {
    _logger("Error!...", err);
    Swal.fire({
      title: "Signup UnSuccessfull!",
      text: "An error has occured while signing up!",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
  };

  return (
    <React.Fragment>
      <div className="py-3 py-lg-8 pb-14 justify-content-center text-center">
        <Container>
          <Row>
            <Col xl={8} lg={8} md={12} sm={12} className="mb-2"></Col>
            <div className="py-6">
              <div className="text-center mb-2">
                <h2 className="display-4 fw-bold ">
                  {props.language?.newsLetterSignup?.title ??
                    "Newsletter Subscription"}
                </h2>
                <p className="mb-0 lead text-primary">
                  {props.language?.newsLetterSignup?.subTitle ??
                    "Enter Your Email"}
                </p>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={state}
                onSubmit={handleSubmit}
                validationSchema={basicSchema}
              >
                <Form className="row px-md-20">
                  <div className="form-group mb-3 col ps-0 ms-2 ms-md-0">
                    <Field
                      type="email"
                      name="email"
                      placeholder={
                        props.language?.newsLetterSignup?.placeHolder ??
                        "Email Address"
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3 col-auto ps-0">
                    <Button variant="primary" type="submit">
                      {" "}
                      {props.language?.newsLetterSignup?.subButton ??
                        "Subscribe!"}
                    </Button>
                  </div>
                </Form>
              </Formik>
              <div className="text-center mb-6">
                <p className="mb-0 lead">
                  {props.language?.newsLetterSignup?.footer ??
                    "Want the latest on immigration news? Get it in your inbox!"}
                </p>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

NewsLetterSignup.propTypes = {
  language: PropTypes.string,
};

export default NewsLetterSignup;
