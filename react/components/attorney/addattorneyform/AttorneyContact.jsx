import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { addAttorneySchema } from "../../../schemas/addAttorneySchema";
import "../attorney.css";

function AttorneyContact(props) {
  const { values, onBack, backLabel, onNext, nextLabel, isSubmitting } = props;

  const handleSubmit = () => {
    onNext(values);
  };
  return (
    <Card.Body>
      <Row className="mb-5 d-flex justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Form onSubmit={handleSubmit}>
            <h4 className="mb-5">CONTACT</h4>
            <div className="form-group mb-5">
              <label htmlFor="text">Phone</label>
              <Field
                type="text"
                name="phone"
                className="form-control"
                placeholder="(000)000-0000"
                value={values.phone}
              ></Field>
              <ErrorMessage
                name="phone"
                component="div"
                className="attorney-form-error"
              />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="text">Email</label>
              <Field
                type="text"
                name="email"
                className="form-control"
                placeholder="example@email.com"
                value={values.email}
              ></Field>
              <ErrorMessage
                name="email"
                component="div"
                className="attorney-form-error"
              />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="text">Website</label>
              <Field
                type="text"
                name="website"
                className="form-control"
                placeholder="https://www.example.com"
                values={values.website}
              ></Field>
              <ErrorMessage
                name="website"
                component="div"
                className="attorney-form-error"
              />
            </div>
          </Form>
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
  );
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    phone: props.attorneyInfo.phone,
    email: props.attorneyInfo.email,
    website: props.attorneyInfo.website,
  }),
  validationSchema: addAttorneySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(AttorneyContact);

AttorneyContact.propTypes = {
  values: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }),
  data: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }),
  attorneyInfo: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
