import "rc-pagination/assets/index.css";
import * as fileManagerService from "../../services/fileManagerService";
import {
  Card,
  Table,
  Form,
  Col,
  Row,
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-feather";
import File from "./File";
import { Link } from "react-router-dom";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import lookUpService from "services/lookUpService";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import toastr from "toastr";

const FileManager = () => {
  const [pageData, setPageData] = useState({
    arrayOfFiles: [],
    fileComponents: [],
    totalCount: 0,
    pageSize: 10,
    pageIndex: 1,
    pageLoaded: false,
  });

  const [paginationTracker, setPaginationTracker] = useState({
    queriedActive: false,
    queriedValue: "",
    filterActive: false,
    filteredValue: "",
    idQueriedActive: false,
    idQueriedValue: "",
    uploaderQueriedActive: false,
    uploaderQueriedValue: "",
    sortingActive: false,
    sortingValue: "",
  });

  const [viewingDeleted, setViewingDeleted] = useState({
    deletedSelected: false,
    deleteViewButtonText: "View Deleted",
    deleteTypeText: "DELETE",
    deleteTitleText: "Viewing Current Files",
    permanentDeleteText: "DELETE FOREVER",
  });

  const [fileQueryValue, setFileQueryValue] = useState({
    query: "",
    idQuery: "",
    uploaderQuery: "",
  });

  const [fileTypes, setFileTypes] = useState({
    fileTypes: [],
    mappedTypes: [],
  });

  const [initialPageLoaded, setInitialPageLoaded] = useState({
    initialPageLoad: true,
  });

  const onQueryFieldChange = (event) => {
    const target = event.target;
    const newQueryValue = target.value;
    const nameOfField = target.name;
    setFileQueryValue((prevState) => {
      const newQueryObject = {
        ...prevState,
      };
      newQueryObject[nameOfField] = newQueryValue;
      return newQueryObject;
    });
  };

  useEffect(() => {
    if (initialPageLoaded.initialPageLoad) {
      setInitialPageLoaded((prevState) => {
        const pd = { ...prevState };
        pd.initialPageLoad = false;
        return pd;
      });

      fileManagerService
        .getAllExpired()
        .then(onGetExpiredSuccess)
        .catch(onGetExpiredError);

      lookUpService
        .LookUp(["FileTypes"])
        .then(onLookUpSuccess)
        .catch(onLookUpError);
    }

    if (paginationTracker.queriedActive) {
      fileManagerService
        .queryFilesWithDeleteStatus(
          pageData.pageIndex - 1,
          pageData.pageSize,
          paginationTracker.queriedValue,
          viewingDeleted.deletedSelected
        )
        .then(onQueryFileSuccess)
        .catch(onQueryFileError);
    } else if (paginationTracker.filterActive) {
      fileManagerService
        .queryFileTypeWithDeleteStatus(
          pageData.pageIndex - 1,
          pageData.pageSize,
          paginationTracker.filteredValue,
          viewingDeleted.deletedSelected
        )
        .then(onTypeQuerySuccess)
        .catch(onTypeQueryError);
    } else if (paginationTracker.idQueriedActive) {
      fileManagerService
        .queryFileIdWithDeleteStatus(
          pageData.pageIndex - 1,
          pageData.pageSize,
          paginationTracker.idQueriedValue,
          viewingDeleted.deletedSelected
        )
        .then(onIdQueryFileSuccess)
        .catch(onIdQueryFileError);
    } else if (paginationTracker.uploaderQueriedActive) {
      fileManagerService
        .queryUploaderNameWithDeleteStatus(
          pageData.pageIndex - 1,
          pageData.pageSize,
          paginationTracker.uploaderQueriedValue,
          viewingDeleted.deletedSelected
        )
        .then(onUploaderQueryFileSuccess)
        .catch(onUploaderQueryFileError);
    } else if (paginationTracker.sortingActive) {
      fileManagerService
        .getAllSorted(
          pageData.pageIndex - 1,
          pageData.pageSize,
          paginationTracker.sortingValue,
          viewingDeleted.deletedSelected
        )
        .then(onGetSortFileSuccess)
        .catch(onGetSortFileError);
    } else {
      fileManagerService
        .getFilesByDeleteStatus(
          pageData.pageIndex - 1,
          pageData.pageSize,
          viewingDeleted.deletedSelected
        )
        .then(onGetFileSuccess)
        .catch(onGetFileError);
    }
    return () => {};
  }, [
    pageData.pageIndex,
    paginationTracker.queriedValue,
    paginationTracker.filteredValue,
    paginationTracker.idQueriedValue,
    paginationTracker.uploaderQueriedValue,
    paginationTracker.sortingValue,
  ]);

  const onLookUpSuccess = (response) => {
    const fileTypes = response.item.fileTypes;

    setFileTypes((prevState) => {
      const newTypes = { ...prevState };
      newTypes.fileTypes = fileTypes;
      newTypes.mappedTypes = fileTypes.map(mapTypes);

      return newTypes;
    });
  };
  const onLookUpError = () => {
    toastr["error"]("Unable To Load File Types");
  };

  const mapTypes = (item) => {
    return (
      <Dropdown.Item
        key={item.id}
        to="#"
        className="d-flex align-items-center"
        label={item.name}
        value={item.id}
        onClick={() => typeQueryHandler(item.id)}
      >
        {item.name}
      </Dropdown.Item>
    );
  };

  const onGetFileSuccess = (data) => {
    let arrayOfDocs = data.value.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onGetFileError = (error) => {
    toastr.error("Load error", error);
  };

  const mapFile = (aFile) => {
    return (
      <>
        <File
          mappedFile={aFile}
          key={"ListA-" + aFile.id}
          onDeleteClicked={onDeleteRequested}
          onPermanentDeleteClicked={onPermanentDeleteRequested}
        ></File>
      </>
    );
  };

  const onDeleteRequested = useCallback((thisFile) => {
    const payload = {
      id: thisFile.id,
      isDeleted: !thisFile.isDeleted,
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteHandler = onDeleteSuccessHandler(thisFile.id);

        fileManagerService
          .editFile(payload, thisFile.id)
          .then(deleteHandler)
          .catch(onDeleteError);
      }
    });
  }, []);

  const onDeleteSuccessHandler = (idToBeDeleted) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      const idxOf = pd.arrayOfFiles.pagedItems.findIndex((file) => {
        let result = false;
        if (file.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });

      if (idxOf >= 0) {
        pd.arrayOfFiles.pagedItems.splice(idxOf, 1);
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
      }
      return pd;
    });
  };

  const onDeleteError = (error) => {
    toastr.error(error);
  };

  const onPermanentDeleteRequested = useCallback((thisFile) => {
    Swal.fire({
      title: "Permanently delete file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteHandler = onPermanentDeleteSuccessHandler(thisFile.id);

        fileManagerService
          .deleteById(thisFile.id)
          .then(deleteHandler)
          .catch(onPermanentDeleteError);
      }
    });
  }, []);

  const onPermanentDeleteSuccessHandler = (idToBeDeleted) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      const idxOf = pd.arrayOfFiles.pagedItems.findIndex((file) => {
        let result = false;
        if (file.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });

      if (idxOf >= 0) {
        pd.arrayOfFiles.pagedItems.splice(idxOf, 1);
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
      }
      return pd;
    });
  };

  const onPermanentDeleteError = (error) => {
    toastr.error(error);
  };

  const resetQueries = () => {
    setFileQueryValue((prevState) => {
      const pd = { ...prevState };
      pd.query = "";
      pd.idQuery = "";
      pd.uploaderQuery = "";
      return pd;
    });
  };

  const onQueryEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      resetQueries();
      setPageData({ ...pageData, pageIndex: 1 });

      setPaginationTracker((prevState) => {
        const pd = { ...prevState };
        pd.queriedActive = true;
        pd.queriedValue = fileQueryValue.query;
        pd.filterActive = false;
        pd.filteredValue = "";
        pd.idQueriedActive = false;
        pd.idQueriedValue = "";
        pd.uploaderQueriedActive = false;
        pd.uploaderQueriedValue = "";
        pd.sortingActive = false;
        pd.sortingValue = "";

        return pd;
      });
    }
  };

  const onQueryFileSuccess = (data) => {
    let arrayOfDocs = data.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onQueryFileError = () => {
    toastr.error("No results");
  };

  const onIdQueryEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      resetQueries();
      setPageData({ ...pageData, pageIndex: 1 });

      setPaginationTracker((prevState) => {
        const pd = { ...prevState };
        pd.queriedActive = false;
        pd.queriedValue = "";
        pd.filterActive = false;
        pd.filteredValue = "";
        pd.idQueriedActive = true;
        pd.idQueriedValue = fileQueryValue.idQuery;
        pd.uploaderQueriedActive = false;
        pd.uploaderQueriedValue = "";
        pd.sortingActive = false;
        pd.sortingValue = "";

        return pd;
      });
    }
  };

  const onIdQueryFileSuccess = (data) => {
    let arrayOfDocs = data.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onIdQueryFileError = () => {
    toastr.error("No results");
  };

  const onGetExpiredSuccess = (data) => {
    if (data?.items) {
      let arrayOfFiles = data.items;

      for (let i = 0; i < arrayOfFiles.length; i++) {
        let idToDelete = arrayOfFiles[i].id;
        fileManagerService
          .deleteById(idToDelete)
          .then(expiredDeleteHandler)
          .catch(expiredDeleteError);
      }
    }
  };

  const onGetExpiredError = (error) => {
    return "nothing to delete " + error;
  };

  const expiredDeleteHandler = (response) => {
    return "expired file deleted " + response;
  };

  const expiredDeleteError = (error) => {
    toastr.error("Expired files not deleted", error);
  };

  const onUploaderQueryEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      resetQueries();
      setPageData({ ...pageData, pageIndex: 1 });

      setPaginationTracker((prevState) => {
        const pd = { ...prevState };
        pd.queriedActive = false;
        pd.queriedValue = "";
        pd.filterActive = false;
        pd.filteredValue = "";
        pd.idQueriedActive = false;
        pd.idQueriedValue = "";
        pd.uploaderQueriedActive = true;
        pd.uploaderQueriedValue = fileQueryValue.uploaderQuery;
        pd.sortingActive = false;
        pd.sortingValue = "";

        return pd;
      });
    }
  };

  const onUploaderQueryFileSuccess = (data) => {
    let arrayOfDocs = data.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onUploaderQueryFileError = () => {
    toastr.error("No results");
  };

  const typeQueryHandler = (id) => {
    resetQueries();
    setPageData({ ...pageData, pageIndex: 1 });

    setPaginationTracker((prevState) => {
      const pd = { ...prevState };
      pd.queriedActive = false;
      pd.queriedValue = "";
      pd.filterActive = true;
      pd.filteredValue = id;
      pd.idQueriedActive = false;
      pd.idQueriedValue = "";
      pd.uploaderQueriedActive = false;
      pd.uploaderQueriedValue = "";
      pd.sortingActive = false;
      pd.sortingValue = "";
      return pd;
    });
  };

  const onTypeQuerySuccess = (data) => {
    let arrayOfDocs = data.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onTypeQueryError = () => {
    toastr.error("No results");
  };

  const changePageClicked = (page) => {
    setPageData({ ...pageData, pageIndex: page });
  };

  const onClickToggleDeleted = (selectId) => {
    setPageData({ ...pageData, pageIndex: 1 });
    resetQueries();

    setPaginationTracker((prevState) => {
      const pd = { ...prevState };
      pd.queriedActive = false;
      pd.queriedValue = "";
      pd.filterActive = false;
      pd.filteredValue = "";
      pd.idQueriedActive = false;
      pd.idQueriedValue = "";
      pd.uploaderQueriedActive = false;
      pd.uploaderQueriedValue = "";
      pd.sortingActive = false;
      pd.sortingValue = "";
      return pd;
    });

    if (selectId === 1) {
      setViewingDeleted((prevState) => {
        const pd = { ...prevState };
        pd.deletedSelected = true;
        pd.deleteViewButtonText = "View Current";
        pd.deleteTitleText = "Viewing Deleted Files";
        pd.deleteTypeText = "RESTORE";
        return pd;
      });
      fileManagerService
        .getFilesByDeleteStatus(0, pageData.pageSize, true)
        .then(onGetFileSuccess)
        .catch(onGetFileError);
    } else {
      setViewingDeleted((prevState) => {
        const pd = { ...prevState };
        pd.deletedSelected = false;
        pd.deleteViewButtonText = "View Deleted";
        pd.deleteTitleText = "Viewing Current Files";
        pd.deleteTypeText = "DELETE";
        return pd;
      });
      fileManagerService
        .getFilesByDeleteStatus(0, pageData.pageSize, false)
        .then(onGetFileSuccess)
        .catch(onGetFileError);
    }
  };

  const onClickToggleSort = (sortBy) => {
    setPageData({ ...pageData, pageIndex: 1 });
    resetQueries();

    setPaginationTracker((prevState) => {
      const pd = { ...prevState };
      pd.queriedActive = false;
      pd.queriedValue = "";
      pd.filterActive = false;
      pd.filteredValue = "";
      pd.idQueriedActive = false;
      pd.idQueriedValue = "";
      pd.uploaderQueriedActive = false;
      pd.uploaderQueriedValue = "";
      pd.sortingActive = true;
      pd.sortingValue = sortBy;
      return pd;
    });
  };

  const onGetSortFileSuccess = (data) => {
    let arrayOfDocs = data.value.item;

    if (arrayOfDocs?.pagedItems) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFiles = arrayOfDocs;
        pd.fileComponents = pd.arrayOfFiles.pagedItems.map(mapFile);
        pd.totalCount = arrayOfDocs.totalCount;
        return pd;
      });
    }
  };

  const onGetSortFileError = () => {
    toastr.error("No results");
  };

  return (
    <Row>
      <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
        <Card>
          <Card.Header>
            <h4 className="mb-0">Searches & Filters</h4>
          </Card.Header>
          <Card.Body className="border-top">
            <span className="dropdown-header px-0 mt-5 mt-lg-0 ms-lg-3">
              QUERY BY FILE NAME
            </span>
            <Form className="mt-5 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="query"
                name="query"
                className="ps-6"
                value={fileQueryValue.query}
                onKeyDown={onQueryEnterPress}
                onChange={onQueryFieldChange}
              />
            </Form>
            <br />
            <span className="dropdown-header px-0 mt-5 mt-lg-0 ms-lg-3 ">
              QUERY BY FILE ID
            </span>
            <Form className="mt-5 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="idQuery"
                name="idQuery"
                className="ps-6"
                value={fileQueryValue.idQuery}
                onKeyDown={onIdQueryEnterPress}
                onChange={onQueryFieldChange}
              />
            </Form>
            <br />
            <span className="dropdown-header px-0 mt-5 mt-lg-0 ms-lg-3 ">
              QUERY BY FILE UPLOADER NAME
            </span>
            <Form className="mt-5 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="uploaderQuery"
                name="uploaderQuery"
                className="ps-6"
                value={fileQueryValue.uploaderQuery}
                onKeyDown={onUploaderQueryEnterPress}
                onChange={onQueryFieldChange}
              />
            </Form>
            <br />
          </Card.Body>
        </Card>
        <br />
        <Navbar className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav">
          <Navbar.Collapse>
            <Nav className="me-auto flex-column" as="ul">
              <Nav.Item className="navbar-header" as="li">
                TOGGLE CURRENT/DELETED
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  as="li"
                  className="nav-link d-flex align-items-center mb-1"
                  to="#"
                  onClick={() => onClickToggleDeleted(2)}
                >
                  <i className="dropdown-item-icon fe fe-check-square text-link"></i>
                  {"View All Current"}
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  as="li"
                  className="nav-link d-flex align-items-center mb-1"
                  to="#"
                  onClick={() => onClickToggleDeleted(1)}
                >
                  <i className="dropdown-item-icon fe fe-trash-2 text-link"></i>
                  {"View All Deleted"}
                </Link>
              </Nav.Item>
              <Nav.Item className="navbar-header" as="li">
                SELECT BY FILE TYPE
              </Nav.Item>

              <Dropdown className="d-flex align-items-center mb-1 ms-lg-2 dropup">
                <Dropdown.Toggle>
                  <i className="fe fe-more-horizontal"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu align="ul">
                  <Dropdown.Header>FILE TYPES</Dropdown.Header>
                  {fileTypes.mappedTypes}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>

      <Col xl={9} lg={9} md={7} sm={20} className="mb-4 mb-lg-0">
        <Card className="border-0">
          <Card.Header>
            <div className="mb-3 mb-lg-0">
              <h3 className="mb-0">
                File Manager: {viewingDeleted.deleteTitleText}
              </h3>
              {viewingDeleted.deletedSelected === true && (
                <p className="mb-0">
                  *Deleted files are permanently deleted after 4 months.
                </p>
              )}
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-invoice table-responsive border-0">
              <Table className="table mb-0 text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="border-bottom-0">
                      FILE ID
                      {paginationTracker?.sortingValue !== "id desc" &&
                        paginationTracker?.sortingValue !== "id asc" && (
                          <Link to="#">
                            <ChevronDown
                              size="16px"
                              className="ms-lg-1"
                              onClick={() => onClickToggleSort("id asc")}
                            ></ChevronDown>
                          </Link>
                        )}
                      {paginationTracker?.sortingValue === "id asc" && (
                        <Link to="#">
                          <ChevronUp
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("id desc")}
                          ></ChevronUp>
                        </Link>
                      )}
                      {paginationTracker?.sortingValue === "id desc" && (
                        <Link to="#">
                          <ChevronDown
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("id asc")}
                          ></ChevronDown>
                        </Link>
                      )}
                    </th>
                    <th scope="col" className="border-bottom-0 ">
                      NAME
                      {paginationTracker?.sortingValue !== "name desc" &&
                        paginationTracker?.sortingValue !== "name asc" && (
                          <Link to="#">
                            <ChevronDown
                              size="16px"
                              className="ms-lg-1"
                              onClick={() => onClickToggleSort("name asc")}
                            ></ChevronDown>
                          </Link>
                        )}
                      {paginationTracker?.sortingValue === "name asc" && (
                        <Link to="#">
                          <ChevronUp
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("name desc")}
                          ></ChevronUp>
                        </Link>
                      )}
                      {paginationTracker?.sortingValue === "name desc" && (
                        <Link to="#">
                          <ChevronDown
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("name asc")}
                          ></ChevronDown>
                        </Link>
                      )}
                    </th>
                    <th scope="col" className="border-bottom-0">
                      TYPE
                      {paginationTracker?.sortingValue !== "fileType desc" &&
                        paginationTracker?.sortingValue !== "fileType asc" && (
                          <Link to="#">
                            <ChevronDown
                              size="16px"
                              className="ms-lg-1"
                              onClick={() => onClickToggleSort("fileType asc")}
                            ></ChevronDown>
                          </Link>
                        )}
                      {paginationTracker?.sortingValue === "fileType asc" && (
                        <Link to="#">
                          <ChevronUp
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("fileType desc")}
                          ></ChevronUp>
                        </Link>
                      )}
                      {paginationTracker?.sortingValue === "fileType desc" && (
                        <Link to="#">
                          <ChevronDown
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("fileType asc")}
                          ></ChevronDown>
                        </Link>
                      )}
                    </th>
                    <th scope="col" className="border-bottom-0 ">
                      CREATED BY
                      {paginationTracker?.sortingValue !== "createdBy desc" &&
                        paginationTracker?.sortingValue !== "createdBy asc" && (
                          <Link to="#">
                            <ChevronDown
                              size="16px"
                              className="ms-lg-1"
                              onClick={() => onClickToggleSort("createdBy asc")}
                            ></ChevronDown>
                          </Link>
                        )}
                      {paginationTracker?.sortingValue === "createdBy asc" && (
                        <Link to="#">
                          <ChevronUp
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("createdBy desc")}
                          ></ChevronUp>
                        </Link>
                      )}
                      {paginationTracker?.sortingValue === "createdBy desc" && (
                        <Link to="#">
                          <ChevronDown
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("createdBy asc")}
                          ></ChevronDown>
                        </Link>
                      )}
                    </th>
                    <th scope="col" className="border-bottom-0 ">
                      CREATED DATE
                      {paginationTracker?.sortingValue !== "createdDate desc" &&
                        paginationTracker?.sortingValue !==
                          "createdDate asc" && (
                          <Link to="#">
                            <ChevronDown
                              size="16px"
                              className="ms-lg-1"
                              onClick={() =>
                                onClickToggleSort("createdDate asc")
                              }
                            ></ChevronDown>
                          </Link>
                        )}
                      {paginationTracker?.sortingValue ===
                        "createdDate asc" && (
                        <Link to="#">
                          <ChevronUp
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() =>
                              onClickToggleSort("createdDate desc")
                            }
                          ></ChevronUp>
                        </Link>
                      )}
                      {paginationTracker?.sortingValue ===
                        "createdDate desc" && (
                        <Link to="#">
                          <ChevronDown
                            size="16px"
                            className="ms-lg-1"
                            color="#19cb98"
                            onClick={() => onClickToggleSort("createdDate asc")}
                          ></ChevronDown>
                        </Link>
                      )}
                    </th>
                    <th scope="col" className="border-bottom-0">
                      DOWNLOAD
                    </th>
                    <th scope="col" className="border-bottom-0">
                      {viewingDeleted.deleteTypeText}
                    </th>
                    {viewingDeleted.deletedSelected === true && (
                      <th scope="col" className="border-bottom-0">
                        {viewingDeleted.permanentDeleteText}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>{pageData.fileComponents}</tbody>
              </Table>
            </div>
          </Card.Body>
          <Pagination
            locale={locale}
            onChange={changePageClicked}
            current={pageData.pageIndex}
            total={pageData.totalCount}
            pageSize={pageData.pageSize}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default FileManager;
