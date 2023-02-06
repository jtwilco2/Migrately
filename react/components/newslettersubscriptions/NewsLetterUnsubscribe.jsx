import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row, Button, Container, Card } from "react-bootstrap";
import * as newsletterSignup from "../../services/newsLetterSubscriptionsService";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Letter from "../../assets/images/gif/Letter.gif";

const basicSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Is Required"),
});

const _logger = debug.extend("NewsLetterUnsubscribe");

function NewsLetterUnsubscribe() {
  const [state] = useState({
    email: "",
    isSubscribed: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    _logger("Unsubscribe Values", values);
    newsletterSignup
      .GetSubscriptionUpdate(values)
      .then(onUnsubscribeSuccess)
      .catch(onUnsubscribeError);
  };

  const onUnsubscribeSuccess = (response) => {
    _logger("Unsubscribed!...", response);
    Swal.fire({
      title: "Unsubscribed Successfully",
      text: "You have successfully been unsubscribed from our newsletter.",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
    navigate(`/`);
  };

  const onUnsubscribeError = (err) => {
    _logger("Error!...", err);
    Swal.fire({
      title: "UnSuccessfull!",
      text: "An error has occured while trying to unsubscribe!",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
  };

  return (
    <div className="migrately-theme-background">
      <Row className="py-4 py-lg-8 pb-14 justify-content-center text-center mb-6">
        <Col xl={9} lg={9} md={9} sm={9} className="mb-2">
          <Card>
            <Container>
              <Row>
                <div className="py-12">
                  <img src={Letter} alt="Letter" width={450} height={300} />
                  <div className="text-center mb-2">
                    <h1 className="display-4 fw-bold ">
                      Do you want to unsubscribe?
                    </h1>
                    <h3 className="mb-0 lead text-primary">
                      If you unsubscribe, you will stop recieving our weekly
                      newsletter.
                    </h3>
                  </div>
                  <Formik
                    enableReinitialize={true}
                    initialValues={state}
                    onSubmit={handleSubmit}
                    validationSchema={basicSchema}
                  >
                    <Form className="row px-md-23">
                      <div className="form-group mb-3 col ps-0 ms-2 ms-md-0">
                        <Field
                          type="email"
                          name="email"
                          placeholder="We are sorry to see you go!"
                          className="form-control text-center"
                        />
                      </div>
                      <div className="form-group mb-3 ps-0">
                        <Button variant="primary" type="submit">
                          {" "}
                          Unsubscribe
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </Row>
            </Container>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default NewsLetterUnsubscribe;
