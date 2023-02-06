import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { Trash, RefreshCw } from "react-feather";

function File(props) {
  const aFile = props.mappedFile;

  const onLocalDeleteClicked = (e) => {
    e.preventDefault();
    props.onDeleteClicked(aFile);
  };

  const onLocalPermanentDeleteClicked = (e) => {
    e.preventDefault();
    props.onPermanentDeleteClicked(aFile);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{aFile?.id}</td>
        <td>{aFile?.name}</td>
        <td>
          <Badge bg={aFile?.fileType?.name === "Due" ? "danger" : "success"}>
            {aFile?.fileType?.name}
          </Badge>
        </td>
        <td>{`${aFile?.user?.firstName}  ${aFile?.user?.lastName}`}</td>
        <td>
          {}
          {aFile?.dateCreated?.slice(0, 10)}
        </td>
        <td>
          <a
            href={`${aFile?.url}`}
            target="_self"
            className="fe fe-download ms-lg-5"
            download
            aria-label={`${aFile?.url}`}
          >
            <i className={`fa fa-${aFile?.name}`} aria-hidden="true" />
          </a>
        </td>
        <td className=" ms-lg-5">
          {aFile?.isDeleted === false && (
            <Link to="#" className=" ms-lg-3">
              <Trash
                size="18px"
                color="red"
                className="dropdown-item-icon"
                onClick={onLocalDeleteClicked}
              />
            </Link>
          )}
          {aFile?.isDeleted === true && (
            <Link to="#" className=" ms-lg-3">
              <RefreshCw
                size="18px"
                color="blue"
                className="dropdown-item-icon"
                onClick={onLocalDeleteClicked}
              ></RefreshCw>
            </Link>
          )}
        </td>
        {aFile?.isDeleted === true && (
          <td className=" ms-lg-5">
            <Link to="#" className=" ms-lg-7">
              <Trash
                size="18px"
                color="red"
                className="dropdown-item-icon"
                onClick={onLocalPermanentDeleteClicked}
              />
            </Link>
          </td>
        )}
      </tr>
    </React.Fragment>
  );
}

File.propTypes = {
  mappedFile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
    fileType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  onDeleteClicked: PropTypes.func,
  onPermanentDeleteClicked: PropTypes.func,
};

export default React.memo(File);
