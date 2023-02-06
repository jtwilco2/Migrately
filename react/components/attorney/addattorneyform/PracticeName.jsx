import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { addAttorneySchema } from "../../../schemas/addAttorneySchema";

function PracticeName(props) {
  const { values, onNext, nextLabel, isSubmitting } = props;

  const handleSubmit = () => {
    onNext(values);
  };

  return (
    <Fragment>
      <Card.Body>
        <Row className="mb-5 d-flex justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <Form onSubmit={handleSubmit}>
              <h4 className="mb-5">PRACTICE NAME</h4>
              <div className="form-group mb-3">
                <Field
                  type="text"
                  className="form-control"
                  name="practiceName"
                  placeholder="Enter Practice Name"
                  value={values.practiceName}
                ></Field>
                <ErrorMessage
                  name="practiceName"
                  component="div"
                  className="attorney-form-error"
                />
              </div>
            </Form>
          </Col>
        </Row>
        <Row md={12} sm={12}>
          <div className="attorney-Loki-actions d-flex justify-content-end">
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
    practiceName: props.attorneyInfo.practiceName,
  }),
  validationSchema: addAttorneySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(PracticeName);

PracticeName.propTypes = {
  values: PropTypes.shape({
    practiceName: PropTypes.string,
  }),
  data: PropTypes.shape({
    practiceName: PropTypes.string,
  }),
  attorneyInfo: PropTypes.shape({
    practiceName: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
