import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { withFormik, Form, Field, FieldArray } from "formik";
import PropTypes from "prop-types";
import { addAttorneySchema } from "../../../schemas/addAttorneySchema";
import lookUpService from "services/lookUpService";
import toastr from "toastr";
import debug from "sabio-debug";

const _logger = debug.extend("Languages");

function AttorneyLanguage(props) {
  const { values, onBack, backLabel, onNext, nextLabel, isSubmitting } = props;

  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    _logger("useEffect loading");
    lookUpService
      .LookUp3Col(["Languages"])
      .then(onLanguagesApiSuccess)
      .catch(onLanguagesApiError);
  }, []);

  const onLanguagesApiSuccess = (response) => {
    _logger("languages", response);
    var target = response.items;

    setLanguageOptions(() => {
      return target;
    });
  };

  const onLanguagesApiError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "err");
  };

  const mapLanguageOption = (language) => {
    return (
      <option value={language.name} key={language.id}>
        {language.name}
      </option>
    );
  };

  const handleSubmit = () => {
    _logger(values);
    onNext(values);
  };

  return (
    <Card.Body>
      <Row className="mb-5 d-flex justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Form>
            <h4 className="mb-5 text-uppercase">Languages</h4>
            <FieldArray name="languages">
              {({ remove, push }) => (
                <div>
                  {values.languages.length > 0 &&
                    values.languages.map((language, index) => (
                      <div className="form-group mb-3" key={index}>
                        <Field
                          as="select"
                          className="form-select form-control"
                          name={`languages.${index}.name`}
                        >
                          <option>Select Language</option>
                          {languageOptions.map(mapLanguageOption)}
                        </Field>
                        <div className="mt-2 d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-xs"
                            onClick={() => remove(index)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => push({ name: "" })}
                  >
                    Add Language
                  </button>
                </div>
              )}
            </FieldArray>
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
    languages: props.attorneyInfo.languages,
  }),
  validationSchema: addAttorneySchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(AttorneyLanguage);

AttorneyLanguage.propTypes = {
  values: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
  data: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
  attorneyInfo: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func,
  backLabel: PropTypes.string,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
