import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function MapALocation(props) {
  const address = props.address;

  const onLocalDeleteClicked = () => {
    props.onDeleteClicked1(props.address);
  };

  const onLocalEditClicked = (e) => {
    e.preventDefault();
    props.onEditCLicked1(props.address);
  };

  const icons = {
    Home: <Icon.House color="black" size={50} />,
    Shipping: <Icon.Mailbox color="black" size={50} />,
    "Vending Location": <Icon.Coin color="black" size={50} />,
    Billing: <Icon.Receipt color="black" size={50} />,
    Business: <Icon.Building color="black" size={50} />,
  };

  const icon = icons[address.locationType.name];

  return (
    <React.Fragment>
      <Card key={address.id} className="location-card">
        <Card.Title> {icon}</Card.Title>

        <Card.Body value={address.id}>
          <Card.Title>{address.lineOne} </Card.Title>
          <Card.Text>
            {address.city} {address.zip} {address.state.name} <br></br>
            {address.locationType.name}
          </Card.Text>
          <Button
            variant="outline-primary"
            className="me-1"
            onClick={onLocalEditClicked}
          >
            Edit
          </Button>
          <Button variant="outline-danger" onClick={onLocalDeleteClicked}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

MapALocation.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    locationType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDeleteClicked1: PropTypes.func.isRequired,
  onEditCLicked1: PropTypes.func.isRequired,
};

export default React.memo(MapALocation);
