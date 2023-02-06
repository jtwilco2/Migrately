import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Col,
  Row,
  Card,
  Table,
  Badge,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import * as licenseService from "../../services/licenseService";
import toastr from "toastr";
import debug from "sabio-debug";
import Pagination from "rc-pagination";
import { useTable, usePagination, useSortBy } from "react-table";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import PropTypes, { string } from "prop-types";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { Edit, MoreVertical, Trash } from "react-feather";
import Swal from "sweetalert2";
import "./license.css";

const _logger = debug.extend("License");

function License(props) {
  const [licenseData, setLicenseData] = useState({
    licenses: [],
    licenseComponents: [],
    totalCount: 0,
    pageSize: 10,
    pageIndex: 0,
  });
  const [query, setQuery] = useState("");
  const [licenseNumberQuery, setLicenseNumberQuery] = useState("");
  const [role, setRole] = useState(false);

  const currentUser = props.currentUser;

  useEffect(() => {
    if (
      currentUser.roles.includes("Admin") ||
      currentUser.roles.includes("Attorney")
    ) {
      setRole(true);
    }
  }, []);

  useEffect(() => {
    if (query && !licenseNumberQuery) {
      licenseService
        .searchLicenseState(licenseData.pageIndex, licenseData.pageSize, query)
        .then(onGetLicensesSuccess)
        .catch(onSearchError);
    } else if (licenseNumberQuery && !query) {
      licenseService
        .searchLicenseNumber(
          licenseData.pageIndex,
          licenseData.pageSize,
          licenseNumberQuery
        )
        .then(onGetLicensesSuccess)
        .catch(onSearchError);
    } else if (query && licenseNumberQuery) {
      licenseService
        .searchByNumberAndState(
          licenseData.pageIndex,
          licenseData.pageSize,
          query,
          licenseNumberQuery
        )
        .then(onGetLicensesSuccess)
        .catch(onSearchError);
    } else
      licenseService
        .getLicenses(licenseData.pageIndex, licenseData.pageSize)
        .then(onGetLicensesSuccess)
        .catch(onGetLicensesError);
  }, [licenseData.pageIndex, licenseData.pageSize, query, licenseNumberQuery]);

  const onGetLicensesSuccess = (data) => {
    let licensesArray = data.item.pagedItems;

    setLicenseData((prevState) => {
      const pd = { ...prevState };
      pd.licenses = licensesArray.map((license) => {
        return {
          id: license.id,
          licenseStateId: license.licenseState.name,
          licenseNumber: license.licenseNumber,
          dateAdmitted: new Date(license.dateAdmitted)
            .toISOString()
            .split("T")[0],
          createdBy: license.createdBy,
          user: `${license.user.firstName} ${license.user.lastName}`,
          dateCreated: license.dateCreated.split("T", 1),
          isActive: license.isActive,
        };
      });
      pd.totalCount = data.item.totalCount;
      return pd;
    });
  };

  const onGetLicensesError = (errResponse) => {
    toastr["error"]("get licenses error");
    _logger(errResponse);
  };

  const onLicenseStateFieldChange = (event) => {
    const target = event.target;
    const newQueryValue = target.value;
    setQuery(newQueryValue);
  };

  const onLicenseNumberFieldChange = (event) => {
    const target = event.target;
    const newQueryValue = target.value;
    setLicenseNumberQuery(newQueryValue);
  };

  const onEnterClicked = () => {
    if (query !== "") {
      licenseService
        .searchLicenseState(0, licenseData.pageSize, query)
        .then(onGetLicensesSuccess)
        .catch(onSearchError);
    } else if (licenseNumberQuery !== "") {
      licenseService
        .searchLicenseNumber(0, licenseData.pageSize, licenseNumberQuery)
        .then(onGetLicensesSuccess)
        .catch(onSearchError);
    } else {
      licenseService
        .getLicenses(licenseData.pageIndex, licenseData.pageSize)
        .then(onGetLicensesSuccess)
        .catch(onGetLicensesError);
    }
  };

  const onSearchError = (errResponse) => {
    toastr["error"]("search error");
    _logger(errResponse);
  };

  const navigate = useNavigate();

  const LicenseForm = () => {
    navigate("/licenses/new");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = (values) => {
    const onEditClicked = (e) => {
      _logger(e.target.id, values, "edit was clicked");
      e.preventDefault();

      navigate(`/licenses/${values.values.id}`, {
        state: { payload: values, type: "LICENSE_EDIT" },
      });
    };

    const onDelete = useCallback((values) => {
      _logger("The License id coming from table...", values);
      licenseService
        .deleteLicense(values)
        .then(onDeleteSuccess)
        .catch(onGetLicensesError);
    }, []);

    const onDeleteSuccess = (idToBeDeleted) => {
      Swal.fire({
        title: "Delete Successful.",
        text: "You have successfully deleted this license.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
      setLicenseData((prevState) => {
        const state = { ...prevState };
        state.licenses = [...state.licenses];

        const idxOf = state.licenses.findIndex(
          (values) => values.id === idToBeDeleted
        );
        if (idxOf >= 0) {
          state.licenses.splice(idxOf, 1);
          state.licenseComponents = licenseData.licenses;
        }
        return state;
      });
    };

    const onDeleteClicked = (e) => {
      if (e.target.id === "delete") {
        Swal.fire({
          title: "Confirm",
          text: "Are you sure you want to delete this license?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it.",
        }).then((result) => {
          if (result.isConfirmed) {
            _logger(
              "License being deleted...",
              values.values.id,
              values.values.name
            );
            return onDelete(values.values.id);
          }
        });
      }
    };

    if (
      currentUser.roles.includes("Admin") ||
      currentUser.roles.includes("Attorney")
    ) {
      return (
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <MoreVertical size="15px" className="text-secondary" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="edit" onClick={onEditClicked} id="edit">
              {" "}
              <Edit size="18px" className="dropdown-item-icon" /> Edit
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="delete"
              id="delete"
              onClick={onDeleteClicked}
            >
              {" "}
              <Trash
                size="18px"
                color="red"
                className="dropdown-item-icon"
              />{" "}
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "id",
        show: false,
      },
      {
        accessor: "licenseStateId",
        Header: "License State",
      },
      {
        accessor: "licenseNumber",
        Header: "License Number",
      },

      {
        accessor: "dateAdmitted",
        Header: "Date Admitted",
      },
      {
        accessor: "createdBy",
        Header: "Created By",
        show: false,
      },
      {
        accessor: "user",
        Header: "Created By",
      },
      {
        accessor: "dateCreated",
        Header: "Date Created",
      },
      {
        accessor: "isActive",
        Header: "Status",
        Cell: ({ value }) => {
          const isActive = value === true;
          return (
            <Badge bg={isActive ? "success" : "danger"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        accessor: "action",
        Header: "",
        Cell: (data) => {
          const { values } = data.cell.row;
          return <ActionMenu values={values} />;
        },
      },
    ],
    []
  );

  const data = licenseData.licenses;

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: licenseData.pageSize,
          hiddenColumns: columns.map((column) => {
            if (column.show === false) return column.accessor || column.id;
            else return false;
          }),
        },
      },
      useSortBy,
      usePagination
    );
  const changePageClicked = (page) => {
    setLicenseData((prev) => {
      let pd = { ...prev };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  return (
    <Fragment>
      <Card className="border-0">
        <Card.Header>
          <Row>
            <Col sm>
              <h2 className="mb-0">Attorney Licenses</h2>
            </Col>
            <Col sm>
              {role && (
                <Button
                  variant="btn btn-dark"
                  type="submit"
                  style={{ float: "right" }}
                  className="addLicense"
                  onClick={LicenseForm}
                >
                  Add License
                </Button>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm>
              <span className="dropdown-header px-0 mt-5 mt-lg-0 ms-lg-3 ">
                Search License State
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
                  onChange={onLicenseStateFieldChange}
                  onKeyDown={onEnterClicked}
                />{" "}
              </Form>
            </Col>
            <Col sm>
              <span className="dropdown-header px-0 mt-5 mt-lg-0 ms-lg-3 ">
                Search License Number
              </span>
              <Form className="mt-5 mt-lg-0 ms-lg-3 d-flex align-items-center">
                <span className="position-absolute ps-3 search-icon">
                  <i className="fe fe-search"></i>
                </span>
                <Form.Control
                  type="Search"
                  id="licenseNumber"
                  name="licenseNumber"
                  className="ps-6"
                  onChange={onLicenseNumberFieldChange}
                  onKeyDown={onEnterClicked}
                />{" "}
              </Form>
            </Col>
          </Row>
        </Card.Body>
        <Card.Body className="p-0 pb-5">
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className="table-responsive ">
                <Table {...getTableProps()} className="text-nowrap">
                  <thead className="table-light">
                    {headerGroups.map((headerGroup) => (
                      <tr key={1} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            key={1}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <BsChevronDown
                                    size="16px"
                                    className="ms-lg-1"
                                    color="#19cb98"
                                  />
                                ) : (
                                  <BsChevronUp
                                    size="16px"
                                    className="ms-lg-1"
                                    color="#19cb98"
                                  />
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={1} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            _logger(cell, "cell");
                            return (
                              <td key={1} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <center>
            <Pagination
              locale={locale}
              onChange={changePageClicked}
              current={licenseData.pageIndex + 1}
              total={licenseData.totalCount}
              pageSize={licenseData.pageSize}
            />
          </center>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default License;

License.propTypes = {
  value: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.element,
  license: PropTypes.shape({
    id: PropTypes.number.isRequired,
    licenseState: PropTypes.number.isRequired,
    licenseNumber: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }),
  values: PropTypes.func,
  data: PropTypes.func,
  onDelete: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(string).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
  }),
};
