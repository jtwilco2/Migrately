import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import debug from "sabio-debug";
import * as licenseService from "../../services/licenseService";
import toastr from "toastr";
import { useNavigate, useLocation } from "react-router-dom";
import licenseFormSchema from "schemas/licenseFormSchema";
import lookUpService from "../../services/lookUpService";
import "./license.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const _logger = debug.extend("LicenseForm");

const LicenseForm = () => {
  const [formData, setFormData] = useState({
    licenseState: "",
    licenseNumber: "",
    dateAdmitted: new Date(),
    createdBy: "",
    isActive: false,
    id: 0,
  });
  const [states, setStates] = useState([]);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setFormData((prevState) => {
        const editData = { ...prevState };
        const updateLicense = state.payload.values;
        editData.licenseState = updateLicense.licenseState;
        editData.licenseNumber = updateLicense.licenseNumber;
        editData.dateAdmitted = new Date(updateLicense.dateAdmitted);
        editData.createdBy = updateLicense.createdBy;
        editData.isActive = updateLicense.isActive;
        editData.id = updateLicense.id;
        return editData;
      });
    }

    if (state?.type === "LICENSE_EDIT" && state.payload) {
      setFormData((prevState) => {
        const update = {
          ...prevState,
          ...state.payload,
        };
        return update;
      });
    }
  }, []);

  const handleSubmit = (values) => {
    _logger(values, "values");
    const licensePayload = {
      licenseState: values?.licenseState,
      licenseNumber: values?.licenseNumber,
      dateAdmitted: values?.dateAdmitted,
      isActive: values?.isActive,
      id: values?.id,
    };
    if (formData.id > 0) {
      licenseService
        .editLicense(formData.id, licensePayload)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      _logger("add");
      licenseService
        .addLicense(licensePayload)
        .then(onAddLicense)
        .catch(onAddLicenseError);
    }
  };

  const onUpdateSuccess = () => {
    setFormData((prevState) => {
      const update = {
        ...prevState,
      };
      _logger(update);
      return update;
    });
    navigate("/licenses");
    toastr.success("You've updated the license successfully!");
  };

  const onUpdateError = (error) => {
    _logger("license update unsuccessful", error);
    toastr.error("Unable to update license.");
  };

  const onAddLicense = (response) => {
    setFormData((prevState) => {
      const update = {
        ...prevState,
      };
      _logger(update);
      return update;
    });
    _logger(response.data.item, formData);

    navigate("/licenses");
    toastr.success("A new license was added.");
  };

  const onAddLicenseError = (error) => {
    toastr.error("Failed to add license.");
    _logger(error);
  };

  const navToLicenses = () => {
    navigate("/licenses");
  };

  useEffect(() => {
    lookUpService
      .LookUp(["States"])
      .then(onStatesApiSuccess)
      .catch(onStatesApiSuccessError);
  }, []);

  const onStatesApiSuccess = (response) => {
    var target = response.item;
    setStates(() => {
      return target.states;
    });
  };

  const onStatesApiSuccessError = (error) => {
    _logger(error);
  };

  const mapStateOption = (state) => {
    return (
      <option value={state.id} key={state.id}>
        {state.name}
      </option>
    );
  };

  const handleDateChange = (dateAdmitted, setFieldValue) => {
    setFieldValue("dateAdmitted", dateAdmitted);
  };

  return (
    <React.Fragment>
      <Col>
        <Button variant="btn-light" onClick={navToLicenses}>
          Back to Attorney Licenses
        </Button>
      </Col>
      <Container>
        <Card className="licenseForm">
          <Card.Body>
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              validationSchema={licenseFormSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Row>
                    <div className="form-group mb-5">
                      <Field
                        as="select"
                        className="form-control"
                        id="states"
                        name="licenseState"
                        value={values.licenseState}
                      >
                        <option>Select State</option>
                        {states.length > 0 && states.map(mapStateOption)}
                      </Field>
                      <ErrorMessage
                        name="licenseState"
                        component="div"
                        className="license-has-error"
                      />
                      <br />
                      <Col xs={12} className="mb-3">
                        <label htmlFor="licenseNumber">License Number</label>
                        <Field
                          type="text"
                          name="licenseNumber"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="licenseNumber"
                          component="div"
                          className="license-has-error"
                        />
                      </Col>
                      <Row>
                        <Col md={6} xs={12} className="mb-3">
                          <label htmlFor="dateAdmitted"> Date Admitted</label>
                          <DatePicker
                            selected={values.dateAdmitted}
                            name="dateAdmitted"
                            onChange={(newDate) =>
                              handleDateChange(newDate, setFieldValue)
                            }
                            className="d-block text-bg-white licenseDatePicker"
                            data-page="/licenses"
                            id="datePicker"
                          />
                        </Col>

                        <Col md={6} xs={12} className="mb-3">
                          <ErrorMessage
                            name="isActive"
                            className="user-form-error"
                            component="div"
                          />
                          <label className="user-form-label-text ">
                            {values.isActive ? "Active" : "Inactive"}
                          </label>
                          <div className="form-check form-switch ms-2">
                            <Field
                              type="checkbox"
                              className="form-check-input"
                              name="isActive"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <Button
                      variant="btn btn-dark"
                      type="submit"
                      className="licenseSubmit"
                    >
                      Submit
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default LicenseForm;
