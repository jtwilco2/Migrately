import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as locationService from "services/location/locationService";
import Pagination from "rc-pagination";
import MapALocation from "./MapALocation";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import "./location.css";
import Swal from "sweetalert2";
import { Row, Col, Button } from "react-bootstrap";
import { Field, Formik, Form } from "formik";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import * as Icon from "react-bootstrap-icons";

const _logger = debug.extend("Location LocationCard");

function LocationCard() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    data: [],
    components: [],
  });

  const [paginate, setPaginate] = useState({
    pageIndex: 0,
    pageSize: 5,
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  });

  const [query, setQuery] = useState({
    queryString: [],
    components: [],
  });

  const onChange = (page) => {
    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = page - 1;

      return newPaginate;
    });
  };

  useEffect(() => {
    locationService
      .locationPaginatedCreatedBy(paginate.pageIndex, paginate.pageSize)
      .then(locationPagSuccess)
      .catch(locationPagError);

    lookUpService
      .LookUp(["LocationTypes"])
      .then(onLocationTypeApiSuccess)
      .catch(onLocationTypeApiSuccessError);
  }, [paginate.pageIndex]);

  const onLocationTypeApiSuccess = (response) => {
    var arrayOfLocationTypes = response.item;

    setQuery((prevState) => {
      const pd = { ...prevState };
      pd.queryString = arrayOfLocationTypes.locationTypes;
      pd.components = arrayOfLocationTypes.locationTypes.map(
        mapLocationTypeOption
      );
      return pd;
    });
  };

  const onLocationTypeApiSuccessError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse, "Failed");
  };

  const mapLocationTypeOption = (locationType) => {
    return (
      <option value={locationType.name} key={locationType.id}>
        {locationType.name}
      </option>
    );
  };

  const locationPagSuccess = (response) => {
    let arrayOfAddresses = response.item.pagedItems;
    let totalCountResponse = response.item.totalCount;
    let totalPageResponse = response.item.totalPages;

    setAddress((prevState) => {
      const pd = { ...prevState };
      pd.data = arrayOfAddresses;
      pd.components = arrayOfAddresses.map(mapAddress);
      return pd;
    });

    setPaginate({
      ...paginate,
      totalCount: totalCountResponse,
      totalPages: totalPageResponse,
    });
  };

  const onDeleteClicked = (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting an address is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let idToBeDeleted = addressId.id;
        locationService
          .deleteLocation(idToBeDeleted)
          .then(onDeleteLocationSuccess)
          .catch(onDeleteLocationError);
      }
    });
  };

  const onDeleteLocationSuccess = (response) => {
    toastr["success"]("Address Deleted ");
    _logger(response);
    locationService
      .locationPaginatedCreatedBy(paginate.pageIndex, paginate.pageSize)
      .then(locationPagSuccess)
      .catch(locationPagError);
  };

  const onDeleteLocationError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse);
  };

  const onEditCLicked = (address) => {
    const stateOfAddress = { type: "Address_Edit", payload: address };
    navigate(`/location/${address.id}`, { state: stateOfAddress });
  };

  const mapAddress = (address) => {
    return (
      <MapALocation
        address={address}
        key={address.id}
        onEditCLicked1={onEditCLicked}
        onDeleteClicked1={onDeleteClicked}
      ></MapALocation>
    );
  };

  const locationPagError = (errResponse) => {
    toastr["error"]("Response Failed");
    _logger(errResponse);
  };

  const onSearchClicked = (payload) => {
    locationService
      .locationSearch(
        paginate.pageIndex,
        paginate.pageSize,
        payload.queryString
      )
      .then(onLocationSearchSuccess)
      .catch(onLocationSearchError);
  };

  const onLocationSearchSuccess = (response) => {
    let arrayOfAddresses = response.item.pagedItems;
    let totalCountResponse = response.item.totalCount;
    let totalPageResponse = response.item.totalPages;

    setAddress((prevState) => {
      const pd = { ...prevState };
      pd.data = arrayOfAddresses;
      pd.components = arrayOfAddresses.map(mapAddress);
      return pd;
    });

    setPaginate({
      ...paginate,
      totalCount: totalCountResponse,
      totalPages: totalPageResponse,
    });
  };
  const onLocationSearchError = (errResponse) => {
    toastr["error"]("location does not exist");
    _logger(errResponse);
  };

  const onPlusClicked = () => {
    navigate(`/location`);
  };

  return (
    <div className="migrately-theme-background">
      <Row className=" location-search-bar col-md-5">
        <Formik
          enableReinitialize={true}
          initialValues={query}
          onSubmit={onSearchClicked}
        >
          <Form>
            <Row>
              <Col>
                <Field
                  className="form-select col-5 form-control-location "
                  id="queryString"
                  name="queryString"
                  as="select"
                >
                  <option>Search By Location Type</option>
                  {query.components.length > 0 && query.components}
                </Field>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={onPlusClicked}>
                  <Icon.Plus color="black" size={25} />
                </Button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Row>
      <div className="row location-card-parent">
        {address.components.length > 0 && address.components}
      </div>

      <div className="location-pagination pb-3">
        <Pagination
          onChange={onChange}
          current={paginate.pageIndex + 1}
          total={paginate.totalCount}
          pageSize={paginate.pageSize}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default LocationCard;
