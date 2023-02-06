import React, { Fragment, useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Table, Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Edit, MoreVertical } from "react-feather";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useTable, useSortBy, usePagination } from "react-table";
import PropTypes from "prop-types";
import appointmentService from "../../../services/appointmentService";
import debug from "sabio-debug";

const _logger = debug.extend("AttorneyAppointments");

function AttorneyAppointments(props) {
  const { currentUser } = props;

  const [apptData, setApptData] = useState({
    appointments: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = { pageIndex: 0, pageSize: 10, id: currentUser.id };
    appointmentService
      .getByCreatedById(userInfo)
      .then(onGetApptSuccess)
      .catch(onGetApptError);
  }, []);

  const onGetApptSuccess = (response) => {
    _logger("success", response);
    let apptsArray = response.item.pagedItems;
    setApptData((prevState) => {
      const pd = { ...prevState };
      pd.appointments = apptsArray.map((appt) => {
        const start = new Date(appt.appointmentStart);
        const end = new Date(appt.appointmentEnd);
        _logger("start", start);
        return {
          id: appt.id,
          clientName: `${appt.client.firstName} ${appt.client.lastName}`,
          appointmentDate: start.toLocaleDateString(),
          appointmentStart: start.toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"}),
          appointmentEnd: end.toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"})
        };
      });
      return pd;
    });
  };

  const onGetApptError = (err) => {
    _logger(err);
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

      navigate("/appointments", {
        state: { values },
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
        accessor: "clientName",
        Header: "Client Name",
      },
      {
        accessor: "appointmentDate",
        Header: "Date",
      },

      {
        accessor: "appointmentStart",
        Header: "Start Time",
      },
      {
        accessor: "appointmentEnd",
        Header: "End Time",
      },
      {
        accessor: "createdBy",
        Header: "Created By",
        show: false,
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

  const data = apptData.appointments;

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
      <Card className="h-100 mb-4">
        <Card.Header className="card-header">
          <h4 className="mb-0">Upcoming Appointments</h4>
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

export default AttorneyAppointments;

AttorneyAppointments.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
};
