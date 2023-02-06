import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes, { string } from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Col, Button, Table, Dropdown } from "react-bootstrap";
import toastr from "toastr";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useTable, usePagination, useSortBy } from "react-table";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import locale from "rc-pagination/lib/locale/en_US";
import advertisementService from "../../services/advertisementService";
import { Edit, MoreVertical, Trash } from "react-feather";
import Swal from "sweetalert2";

function AdvertisementCard(props) {
  const [advertisementData, setAdvertisementData] = useState({
    id: props.currentUser.id,
    advertisements: [],
    advertisementComponents: [],
    totalCount: 0,
    pageSize: 20,
    pageIndex: 0,
  });

  const navigate = useNavigate();

  const goToAdvertisementForm = () => {
    navigate("/advertisements/new");
  };
  useEffect(() => {
    advertisementService
      .getAdByUserId(
        advertisementData.id,
        advertisementData.pageIndex,
        advertisementData.pageSize
      )
      .then(onGetAdvertisementSuccess)
      .catch(onGetAdvertisementError);
  }, [advertisementData.pageIndex, advertisementData.pageSize]);

  const onGetAdvertisementSuccess = (data) => {
    if (data?.item?.pagedItems) {
      let advertisementArray = data.item.pagedItems;

      setAdvertisementData((prevState) => {
        const pd = { ...prevState };
        pd.advertisements = advertisementArray.map(mapAdvertisement);
        pd.totalCount = data.item.totalCount;
        return pd;
      });
    }
  };

  const mapAdvertisement = (advertisement) => {
    return {
      id: advertisement.id,
      attorneyProfileId: advertisement.attorneyProfileId,
      adTierId: advertisement.adTierId,
      adMainImage: advertisement.adMainImage,
      title: advertisement.title,
      details: advertisement.details,
      dateStart: advertisement?.dateStart?.split("T", 1),
      dateEnd: advertisement?.dateEnd?.split("T", 1),
    };
  };

  const onGetAdvertisementError = () => {
    toastr["error"]("get advertisements error");
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
      e.preventDefault();

      navigate(`/advertisements/${values.values.id}`, {
        state: { values },
      });
    };

    const onDelete = useCallback((values) => {
      advertisementService
        .deleteAdvertisement(values)
        .then(onDeleteSuccess)
        .catch(onGetAdvertisementError);
    }, []);

    const onDeleteSuccess = (idToBedDeleted) => {
      Swal.fire({
        title: "Delete Successful.",
        text: "You have successfully deleted this advertisement.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });

      setAdvertisementData((prevState) => {
        const state = { ...prevState };
        state.advertisements = [...state.advertisements];

        const indexOf = state.advertisements.findIndex(
          (advertisement) => advertisement.id === idToBedDeleted
        );

        if (indexOf >= 0) {
          state.advertisements.splice(indexOf, 1);
          state.advertisementComponents.splice(indexOf, 1);
        }
        return state;
      });
    };

    const onDeleteClicked = (e) => {
      if (e.target.id === "delete") {
        Swal.fire({
          title: "Confirm",
          text: "Are you sure you want to delete this advertisement?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it.",
        }).then((result) => {
          if (result.isConfirmed) {
            return onDelete(values.values.id);
          }
        });
      }
    };

    if (
      props.currentUser.roles.includes("Admin") ||
      props.currentUser.roles.includes("Attorney")
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
        disabeFilters: true,
        show: false,
      },
      {
        accessor: "attorneyProfileId",
        Header: "Attorney Profile Id",
        disabeFilters: true,
        show: false,
      },
      {
        accessor: "adTierId",
        Header: "Ad Tier",
        disabeFilters: true,
      },
      {
        accessor: "title",
        Header: "Title",
        disabeFilters: true,
      },
      {
        accessor: "adMainImage",
        Header: "Image",
        disabeFilters: true,
        Cell: (tableProps) => {
          return (
            <img src={tableProps.row.original.adMainImage} width={350} alt="" />
          );
        },
      },
      {
        accessor: "details",
        Header: "Details",
        disabeFilters: true,
      },
      {
        accessor: "dateStart",
        Header: "Date Start",
      },
      {
        accessor: "dateEnd",
        Header: "Date End",
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

  const data = advertisementData.advertisements;

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: advertisementData.pageSize,
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
    setAdvertisementData((prev) => {
      let pd = { ...prev };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  return (
    <Fragment>
      <Col xs={12} className="mb-3">
        <Button variant="primary" type="submit" onClick={goToAdvertisementForm}>
          Add Advertisement
        </Button>
      </Col>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Advertisements</h3>
          </div>
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
          <center>
            <Pagination
              locale={locale}
              onChange={changePageClicked}
              current={advertisementData.pageIndex + 1}
              total={advertisementData.totalCount}
              pageSize={advertisementData.pageSize}
            />
          </center>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default AdvertisementCard;

AdvertisementCard.propTypes = {
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
