import React from "react";
import { Card, Col, Button, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import debug from "sabio-debug";
import toastr from "toastr";
import "./translations.css";
import translationScehema from "../../schemas/addTranslationSchema";
import translationService from "../../services/translationService";
import swal from "sweetalert2";
import lookUpService from "services/lookUpService";
import * as Icon from "react-bootstrap-icons";

const _logger = debug.extend("addTranslation");

function AddPageTranslation() {
  const [defaultValues] = useState({
    languageId: "",
    link: "",
    name: "",
    createdBy: 0,
    section: "",
    component: "",
    pageSectionId: null,
    keyName: "",
    text: "",
    pageSectionKeyId: 0,
  });

  const [addTranslationData, setAddTranslationData] = useState({
    id: null,
    languageId: "",
    link: "",
    name: "",
    createdBy: 0,
    section: "",
    component: "",
    pageSectionId: 0,
    keyName: "",
    text: "",
    pageSectionKeyId: 0,
  });

  const [addNewLinkData, setNewLinkData] = useState({
    languageId: null,
    addLink: "",
  });

  const newLinkPayload = {
    languageId: addNewLinkData.languageId,
    link: addNewLinkData.addLink,
    name: addNewLinkData.addLink,
  };

  const [translationIndex, setTranslationIndex] = useState({
    languageArray: [],
    linkArray: [],
    componentArray: [],
    sectionArray: [],
  });

  //------------- Button handlers

  const onNewLinkButtonClick = () => {
    translationService
      .addLink(newLinkPayload)
      .then(addTranslationSuccess)
      .then(formUpdater)
      .catch(onGlobalError);
  };

  // ----- clickHandlers.

  const formUpdater = () => {
    const getLinkByLanguageIdSuccess = (response) => {
      let responseReturn = response?.item;
      responseReturn.map(mapComponentReturn);
      responseReturn.map(mapSectionReturn);
      setTranslationIndex((prevState) => {
        const copy = { ...prevState };
        copy.LinkArray = responseReturn.map(mapLinkReturn);
        return copy;
      });
    };

    translationService
      .getAppByLanguageIdAdd(addTranslationData.languageId)
      .then(getLinkByLanguageIdSuccess)
      .catch(onGlobalError);

    setShow(false);
  };

  const onFormFieldChange = (event) => {
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setNewLinkData((prevState) => {
      const newUserObject = { ...prevState };
      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
  };

  const handleLanguageIdChange = React.useCallback((event) => {
    const value = +event.currentTarget.value;
    if (value !== 0) {
      setAddTranslationData((prevState) => {
        const copy = { ...prevState };
        copy.languageId = value;
        return copy;
      });
      setNewLinkData((prevState) => {
        const copy = { ...prevState };
        copy.languageId = value;
        return copy;
      });
    }
  }, []);

  const handleLinkIdChange = React.useCallback((event) => {
    const id = +event?.target?.attributes?.id?.nodeValue;
    if (id) {
      const link = String(event.target.attributes.value?.nodeValue);
      setAddTranslationData((prevState) => {
        const copy = { ...prevState };
        copy.id = id;
        copy.link = link;
        copy.name = link;
        return copy;
      });
    }
  });

  const handleComponentChange = (event) => {
    if (event.target.value !== "") {
      setAddTranslationData((prevState) => {
        const copy = { ...prevState };
        copy.component = String(event.target.value);
        return copy;
      });
    }
  };

  const onHandlePageSectionChange = (event) => {
    if (event.target.id !== "") {
      setAddTranslationData((prevState) => {
        const copy = { ...prevState };
        copy.section = String(event.target.value);
        copy.pageSectionId = +event.target.id;
        return copy;
      });
    }
  };

  useEffect(() => {
    if (addTranslationData.languageId) {
      formUpdater();
    }
  }, [addTranslationData]);

  //------

  useEffect(() => {
    const getLinkByLanguageIdSuccess = (response) => {
      let LinkReturn = response.item;
      setTranslationIndex((prevState) => {
        const copy = { ...prevState };
        copy.linkArray = LinkReturn.map(mapLinkReturn);
        return copy;
      });
    };

    if (addTranslationData.languageId !== "") {
      translationService
        .getAppByLanguageIdAdd(addTranslationData.languageId)
        .then(getLinkByLanguageIdSuccess)
        .catch(onGlobalError);
    }
  }, [addTranslationData.languageId]);

  useEffect(() => {
    lookUpService
      .LookUp3Col("Languages")
      .then(getLanguageByAllSuccess)
      .catch(onGlobalError);
  }, []);

  const getLanguageByAllSuccess = (response) => {
    let languageReturn = response.items;
    setTranslationIndex((prevState) => {
      const copy = { ...prevState };
      copy.languageArray = languageReturn.map(mapLanguageReturn);
      return copy;
    });
  };

  const onGlobalError = (response) => {
    _logger(response, "On Error");
    toastr.error("Error");
  };

  const handleAddTranslationDataSubmit = (values) => {
    const translationPayLoad = {
      languageId: Number(values.languageId),
      link: values.link,
      name: addTranslationData.link,
      section: values.section,
      component: values.component,
      pageSectionId: addTranslationData.pageSectionId,
      keyName: `${values.section}_${values.keyName}`,
      text: values.text,
      pageSectionKeyId: 1,
    };
    translationService
      .addTranslationComplete(translationPayLoad)
      .then(addTotalTranslationSuccess)
      .catch(onGlobalError);
  };

  const addTranslationSuccess = (response) => {
    _logger(response, "Route Added");
    toastr.success("Route Added");
    swal.fire("Added", "Route has been Added.", "success");
  };

  const addTotalTranslationSuccess = (response) => {
    _logger(response, "Page Translation Added");
    toastr.success("Route Added");
    swal.fire("Added", "Page Translation has been Added.", "success");
  };

  const mapLanguageReturn = (language) => {
    return (
      <option value={language?.id} key={language?.id}>
        {language?.name}
      </option>
    );
  };

  const mapLinkReturn = (linkItem) => {
    return (
      <option value={linkItem?.link} id={linkItem?.id}>
        {linkItem?.link}
      </option>
    );
  };
  const mapComponentReturn = (page) => {
    const uniqueComponents = new Set();
    const mapPageSection = (component) => {
      if (
        component.pageTranslationId === addTranslationData.id &&
        !uniqueComponents.has(component.component)
      ) {
        uniqueComponents.add(component.component);
        return (
          <option value={component.component} id={component.id}>
            {component.component}
          </option>
        );
      }
    };

    if (page?.pageSection !== null) {
      setTranslationIndex((prevState) => {
        const copy = { ...prevState };
        copy.componentArray = Array.from(page.pageSection.map(mapPageSection));
        return copy;
      });
    }
  };

  const mapSectionReturn = (page) => {
    const mapPageSection = (component) => {
      if (component?.component === addTranslationData?.component) {
        return (
          <option value={component.section} id={component.id}>
            {component.section}
          </option>
        );
      }
    };
    setTranslationIndex((prevState) => {
      const copy = { ...prevState };
      copy.sectionArray = Array.from(page?.pageSection?.map(mapPageSection));
      return copy;
    });
  };

  const [show, setShow] = useState(false);

  return (
    <Card className="border-0 ">
      <Card.Header>
        <div className="mb-3 mb-lg-0 translations-centering ">
          <h3 className="mb-0">Add a Translation</h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="mb-5 translations-centering">
          <Col lg={9} md={8} sm={12}>
            <Formik
              enableReinitialize={true}
              initialValues={defaultValues}
              onSubmit={handleAddTranslationDataSubmit}
              validationSchema={translationScehema}
            >
              {({ resetForm }) => (
                <Form>
                  <div
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <h3>Define Page Elements</h3>
                    <div className="w-75">
                      <Field
                        component="select"
                        name="languageId"
                        className="form-select mb-1"
                        onClick={handleLanguageIdChange}
                      >
                        <option value="" disabled selected>
                          Please select the Language
                        </option>
                        {translationIndex.languageArray}
                      </Field>
                      <ErrorMessage
                        name="languageId"
                        component="div"
                        className="translations-form-has-error"
                      />
                    </div>
                    {addTranslationData.languageId !== "" && (
                      <div className="d-flex justify-content-between">
                        <div className="w-75">
                          <Field
                            component="select"
                            name="link"
                            className="form-select mb-1"
                            onClick={handleLinkIdChange}
                          >
                            <option value="" disabled selected>
                              Please select the Route
                            </option>{" "}
                            {translationIndex.linkArray}
                          </Field>
                          <ErrorMessage
                            name="link"
                            component="div"
                            className="translations-form-has-error"
                          />
                        </div>

                        <div>
                          <Button
                            onClick={() => setShow(!show)}
                            type="button"
                            className="btn btn-info float-end"
                            data-toggle="button"
                            aria-pressed="false"
                            autoComplete="off"
                          >
                            <Icon.NodePlusFill />
                          </Button>
                        </div>
                      </div>
                    )}
                    {show && (
                      <div className="form-group mb-3 ">
                        <h3>Add a New Route</h3>
                        <Field
                          type="text"
                          name="AddLink"
                          onChange={onFormFieldChange}
                          placeholder="Example: Home, Landing, Products "
                          className="form-control"
                        ></Field>
                        <Button
                          type="button"
                          onClick={onNewLinkButtonClick}
                          className="btn btn-success"
                        >
                          Create New Route
                        </Button>
                      </div>
                    )}

                    {addTranslationData.id !== null && (
                      <div className="w-75">
                        <Field
                          component="select"
                          name="component"
                          className="form-select mb-1"
                          onClick={handleComponentChange}
                        >
                          <option value="" disabled selected>
                            Please select the Component
                          </option>
                          {translationIndex.componentArray}
                        </Field>
                        <ErrorMessage
                          name="component"
                          component="div"
                          className="translations-form-has-error"
                        />
                      </div>
                    )}
                    {addTranslationData.component !== "" && (
                      <div className="w-75">
                        <Field
                          component="select"
                          name="section"
                          className="form-select mb-1"
                          onClick={onHandlePageSectionChange}
                        >
                          <option value="" disabled selected>
                            Please select the Component Section
                          </option>
                          {translationIndex.sectionArray}
                        </Field>
                      </div>
                    )}
                    <ErrorMessage
                      name="section"
                      component="div"
                      className="translations-form-has-error"
                    />
                  </div>
                  {addTranslationData.pageSectionId !== 0 && (
                    <div>
                      <div className="form-group mb-3 ">
                        <h3>Section Tag</h3>
                        <Field
                          type="text"
                          name="keyName"
                          placeholder="Example: PricingText"
                          className="form-control"
                        ></Field>
                        <ErrorMessage
                          name="keyName"
                          component="div"
                          className="translations-form-has-error"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <h3>Translation Text</h3>
                        <Field
                          as="textarea"
                          rows={8}
                          name="text"
                          placeholder="Translated Text"
                          className="form-control mb-1"
                        ></Field>
                        <ErrorMessage
                          name="text"
                          component="div"
                          className="translations-form-has-error"
                        />
                      </div>
                      {/*  Button  */}
                      <div className="button-forum-container">
                        <hr />
                        <div></div>
                        <Button
                          variant="primary"
                          type="reset"
                          onClick={() => resetForm()}
                        >
                          Clear Form
                        </Button>
                        <Button className="btn btn-primary mx-10" type="submit">
                          Submit Form
                        </Button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default AddPageTranslation;
