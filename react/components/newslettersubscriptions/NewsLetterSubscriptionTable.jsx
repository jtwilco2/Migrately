import React, { Fragment, useMemo } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { PropTypes } from "prop-types";
import { useTable, usePagination } from "react-table";
import debug from "sabio-debug";
import { Edit3, Delete, MoreVertical } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "components/elements/advancedtable/Pagination";
import { formatDate } from "helper/dateFormater";
import Swal from "sweetalert2";

const NewsLetterSubsTable = ({ subs, update, dataDisplay }) => {
  const _logger = debug.extend("NewsLetterSubscriptionsTable");
  _logger("Table Props...", subs);

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

  const ActionMenu = ({ values }) => {
    const handleUpdateStatus = (e) => {
      _logger("handleSubscribedUpdateStatus", values);

      if (e.target.id === "subscribe" && values.isSubscribed === true) {
        Swal.fire({
          title: "Update UnSuccessfull!",
          text: "This Person Is Already Subscribed",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
        return _logger("This person is already 'Subscribed'");
      } else if (
        e.target.id === "unsubscribe" &&
        values.isSubscribed === false
      ) {
        Swal.fire({
          title: "Update UnSuccessfull!",
          text: "This Person Is Already UnSubscribed",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
        return _logger("This person is already 'UnSubscribed'");
      } else
        Swal.fire({
          title: "Are You Sure?",
          text: "You are about to update the subscription status!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
          if (result.isConfirmed && values.isSubscribed === false) {
            _logger("Value Being Changed to Subscribed...", values);
            values.isSubscribed = true;
            update(values);
          } else if (result.isConfirmed && values.isSubscribed === true) {
            _logger("Value Being Changed to UnSubscribed...", values);
            values.isSubscribed = false;
            update(values);
          }
        });
      return _logger("Switch to be 'Subscribed'");
    };

    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>ACTION</Dropdown.Header>
          <Dropdown.Item
            eventKey="subscribe"
            id="subscribe"
            onClick={handleUpdateStatus}
          >
            {" "}
            <Edit3
              size="18px"
              color="green"
              className="dropdown-item-icon"
            />{" "}
            Subscribe
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="unsubscribe"
            id="unsubscribe"
            onClick={handleUpdateStatus}
          >
            {" "}
            <Delete
              size="18px"
              color="red"
              className="dropdown-item-icon"
            />{" "}
            Unsubscribe
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: (cellProps) => {
          return <p>{cellProps.value}</p>;
        },
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "STATUS",
        accessor: "isSubscribed",
      },
      {
        Header: "DATE SUBSCRIBED",
        accessor: (row) => formatDate(row.date),
      },
      {
        accessor: "action",
        Header: "",
        Cell: (data) => {
          _logger("Action CELL", data.cell.row.values);
          const { values } = data.cell.row;
          return <ActionMenu values={values} />;
        },
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      subs.map((sub, idx) => {
        _logger("sub and idx", sub, idx);
        return {
          id: idx + 1,
          email: sub.email,
          isSubscribed: sub.isSubscribed,
          date: sub.dateCreated,
        };
      }),
    [subs]
  );
  _logger("Table Columns...", columns, data);

  const mapToRow = (row, index) => {
    prepareRow(row);
    return (
      <tr key={index} {...row.getRowProps()}>
        {row.cells.map((cell, i) => {
          if (i === 0) {
            return (
              <td key={i} {...cell.getCellProps()}>
                {cell.render("Cell")}
              </td>
            );
          }
          if (typeof cell.value === "boolean") {
            const text = cell.value ? "Subscribed" : "Unsubscribed";
            return (
              <td key={i} {...cell.getCellProps()}>
                {text}
              </td>
            );
          }
          return (
            <td key={i} {...cell.getCellProps()}>
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>
    );
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    usePagination,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    pageCount,
    gotoPage,
    state,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Newsletter Subscribers</h1>
              <p>
                This displays all the current people who have subscribed to to
                recieve {'"Newsletters"'} by Migrately.
              </p>
            </div>

            <div>
              {["Primary"].map((variant) => (
                <DropdownButton
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title="VIEW"
                  className="me-1 mb-2 mb-lg-0 "
                >
                  <Dropdown.Item eventKey="1" onClick={dataDisplay} id="all">
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={dataDisplay}
                    id="subscribed"
                  >
                    Subscribed Only
                  </Dropdown.Item>
                </DropdownButton>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Body className="p-0">
              <div className="table-responsive mb-lg-0 mb-2 px-5 py-4">
                <Table hover {...getTableProps()} className="text-nowrap">
                  <thead className="table-light">
                    {headerGroups.map((headerGroup, idx) => (
                      <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th key={idx} {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>{page.map(mapToRow)}</tbody>
                </Table>
              </div>
              <Pagination
                previousPage={previousPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                nextPage={nextPage}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

NewsLetterSubsTable.propTypes = {
  subs: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubscribed: PropTypes.bool.isRequired,
      dateCreated: PropTypes.node,
      dateModified: PropTypes.node,
    })
  ),
  children: PropTypes.element,
  onClick: PropTypes.func,
  update: PropTypes.func,
  dataDisplay: PropTypes.func,
  email: PropTypes.string,
  isSubscribed: PropTypes.bool,

  values: PropTypes.objectOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubscribed: PropTypes.bool.isRequired,
      dateCreated: PropTypes.node,
      dateModified: PropTypes.node,
    })
  ),
};
const NewsLetterSubscriptionsTable = React.memo(NewsLetterSubsTable);
export default NewsLetterSubscriptionsTable;
