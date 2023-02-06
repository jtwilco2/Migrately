import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { addAttorneySchema } from "../../../schemas/addAttorneySchema";

function AttorneyBio(props) {
  const { values, onBack, backLabel, onNext, nextLabel, isSubmitting } = props;

  const handleSubmit = () => {
    onNext(values);
  };
  return (
    <Card.Body>
      <Row className="mb-5 d-flex justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Form onSubmit={handleSubmit}>
            <h4 className="mb-5">BIO</h4>
            <div className="form-group mb-3">
              <Field
                as="textarea"
                rows={8}
                name="bio"
                placeholder="Enter Bio"
                className="form-control mb-1"
                value={values.bio}
              ></Field>
              <ErrorMessage
                name="bio"
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
    bio: props.attorneyInfo.bio,
  }),
  validationSchema: addAttorneySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(AttorneyBio);

AttorneyBio.propTypes = {
  values: PropTypes.shape({
    bio: PropTypes.string,
  }),
  data: PropTypes.shape({
    bio: PropTypes.string,
  }),
  attorneyInfo: PropTypes.shape({
    bio: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
