import React, { useState, useEffect } from "react";
import addAdvertisementSchema from "../../schemas/addAdvertisementSchema";
import advertisementService from "../../services/advertisementService";
import FileUpload from "components/fileUpload/FileUpload";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toastr from "toastr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import migratelyLogo from "../../assets/images/migrately/migrately-logo.png";
import swal from "sweetalert2";
import "./userstyles.css";

const Advertisement = () => {
  const [addAdvertisementData, setAdvertisementData] = useState({
    adTierId: 1,
    title: "",
    adMainImage: "",
    details: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    id: 0,
  });

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setAdvertisementData((prevState) => {
        const editData = { ...prevState };
        const updateAdvertisement = state.values.values;
        editData.adTierId = updateAdvertisement.adTierId;
        editData.title = updateAdvertisement.title;
        editData.adMainImage = updateAdvertisement.adMainImage;
        editData.details = updateAdvertisement.details;
        editData.dateStart = updateAdvertisement.dateStart;
        editData.dateEnd = updateAdvertisement.dateEnd;
        editData.id = updateAdvertisement.id;
        return editData;
      });
    }

    if (state?.type === "ADVERTISEMENT_EDIT" && state.payload) {
      setAdvertisementData((prevState) => {
        const update = {
          ...prevState,
          ...state.payload,
        };
        return update;
      });
    }
  }, []);

  const handleSubmit = (values) => {
    const advertisementPayload = {
      adTierId: values.adTierId,
      title: values.title,
      adMainImage: values.adMainImage,
      details: values.details,
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      id: values.id,
    };
    if (addAdvertisementData.id > 0) {
      advertisementService
        .editAdvertisement(addAdvertisementData.id, advertisementPayload)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      advertisementService
        .addAdvertisement(advertisementPayload)
        .then(onAddSuccess)
        .catch(onAddFailure);
    }
  };

  const onUpdateSuccess = () => {
    setAdvertisementData((prevState) => {
      const update = {
        ...prevState,
      };
      return update;
    });
    navigate("/advertisements");
    toastr.success("You've updated the advertisement successfully!");
  };

  const onUpdateError = () => {
    toastr.error("Unable to update advertisement.");
  };

  const onAddSuccess = () => {
    swal.fire("Hooray!", "Advertisement Added Successfully!", "success", {
      button: "Ok",
    });
    navigate("/advertisements");
  };

  const onAddFailure = () => {
    swal.fire("Error", "Advertisement Failed.", "error");
  };

  const uploadFile = (file, setFieldValue) => {
    setFieldValue("adMainImage", file[0].url);
  };

  const onDateStartChange = (newDate, newShortDate, setFieldValue) => {
    setFieldValue("dateStart", newShortDate);
  };

  const onDateEndChange = (newDate, newShortDate, setFieldValue) => {
    setFieldValue("dateEnd", newShortDate);
  };

  return (
    <React.Fragment>
      <div className="user-form-background">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col lg={7} md={5} className="py-8 py-xl-0">
            <Card>
              <Card.Body className="p-6">
                <div className="mb-4">
                  <div className="user-align-center">
                    <Link to="/">
                      <Image
                        src={migratelyLogo}
                        className="mb-4"
                        alt="Migrately Logo"
                      />
                    </Link>
                  </div>
                  <h1 className="mb-1 fw-bold">Add Advertisement</h1>
                </div>

                <Formik
                  enableReinitialize={true}
                  initialValues={addAdvertisementData}
                  onSubmit={handleSubmit}
                  addAdvertisementSchema={addAdvertisementSchema}
                >
                  {({ touched, errors, setFieldValue, values }) => (
                    <Form>
                      <Row>
                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="adTierId"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="adTierId"
                            className="user-form-label-text"
                          >
                            Advertisement Tier Id
                          </label>
                          <Field
                            as="select"
                            className="form-control"
                            name="adTierId"
                          >
                            <option value="1">Tier 1</option>
                            <option value="2">Tier 2</option>
                            <option value="3">Tier 3</option>
                          </Field>
                        </Col>

                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="title"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="title"
                            className="user-form-label-text"
                          >
                            Title
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="title"
                          />
                        </Col>
                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="adMainImage"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="adMainImage"
                            className="user-form-label-text"
                          >
                            Advertisement Main Image
                          </label>
                          <FileUpload
                            onUploadSuccess={(file) =>
                              uploadFile(file, setFieldValue)
                            }
                            name="adMainImage"
                          />
                        </Col>

                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="details"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="details"
                            className="user-form-label-text"
                          >
                            Details
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="details"
                          />
                        </Col>
                        <Col lg={6} md={12} className="mb-3">
                          <ErrorMessage
                            name="dateStart"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="dateStart"
                            className="user-form-label-text"
                          >
                            Date Start
                          </label>
                          <Col lg={6} md={12} className="mb-3">
                            <Flatpickr
                              onChange={(newDate, newShortDate) =>
                                onDateStartChange(
                                  newDate,
                                  newShortDate,
                                  setFieldValue
                                )
                              }
                              name="dateStart"
                            />
                          </Col>
                          <ErrorMessage
                            name="dateEnd"
                            className="user-form-error"
                            component="div"
                          />
                          <label
                            htmlFor="dateEnd"
                            className="user-form-label-text"
                          >
                            Date End
                          </label>
                          <Col lg={6} md={12} className="mb-3">
                            <Flatpickr
                              onChange={(newDate, newShortDate) =>
                                onDateEndChange(
                                  newDate,
                                  newShortDate,
                                  setFieldValue
                                )
                              }
                              name="dateEnd"
                            />
                          </Col>
                        </Col>
                        <Col lg={6} md={12} className="mb-3">
                          <Col>
                            <img src={values.adMainImage} width={350} alt="" />
                          </Col>
                        </Col>
                        <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={
                              Object.keys(errors).length > 0 ||
                              Object.keys(touched).length === 0
                            }
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>

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

export default Advertisement;
