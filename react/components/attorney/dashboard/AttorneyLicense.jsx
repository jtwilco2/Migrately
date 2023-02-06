import React, { Fragment, useEffect, useState, useMemo } from "react";
import { Col, Row, Card, Table, Badge, Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Edit, MoreVertical } from "react-feather";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useTable, useSortBy, usePagination } from "react-table";
import * as licenseService from "../../../services/licenseService";
import toastr from "toastr";
import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("AttorneyLicense");

function AttorneyLicense(props) {
  const { currentUser } = props;
  const [licenseData, setLicenseData] = useState({
    licenses: [],
  });

  useEffect(() => {
    licenseService
      .getLicenseCreatedBy(currentUser.id)
      .then(onGetSuccess)
      .catch(onGlobalError);
  }, []);

  const onGetSuccess = (data) => {
    _logger("data", data);
    let licensesArray = data.items;
    setLicenseData((prevState) => {
      const pd = { ...prevState };
      pd.licenses = licensesArray.map((license) => {
        return {
          id: license.id,
          licenseStateId: license.licenseState.name,
          licenseNumber: license.licenseNumber,
          dateAdmitted: license.dateAdmitted.split("T", 1).join(),
          createdBy: license.createdBy,
          dateCreated: license.dateCreated.split("T", 1),
          isActive: license.isActive,
        };
      });
      return pd;
    });
  };

  const onGlobalError = (response) => {
    _logger(response, "On Error");
    toastr.error("Error");
  };

  const navigate = useNavigate();

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
        </Dropdown.Menu>
      </Dropdown>
    );
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
          pageSize: 5,
          hiddenColumns: columns.map((column) => {
            if (column.show === false) return column.accessor || column.id;
            else return false;
          }),
        },
      },
      useSortBy,
      usePagination
    );

  return (
    <Fragment>
      <Card className="mb-4">
        <Card.Header className="card-header">
          <h4 className="mb-0">Licenses</h4>
        </Card.Header>
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
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default AttorneyLicense;

AttorneyLicense.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
  value: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
