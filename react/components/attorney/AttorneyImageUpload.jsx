import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import Toastr from "toastr";
import userService from "../../services/userService";
import * as fileUploadService from "../../services/fileUploadService";
const _logger = debug.extend("AttorneyImageUpload");

const AttorneyImageUpload = (props) => {
  const { profile, currentUser } = props;

  const handleChange = async (event) => {
    let file = event.target.files;
    _logger("event", event.target.files);
    const formData = new FormData();
    const filePackage = [];

    for (let index = 0; index < file.length; index++) {
      const singleFile = file[index];
      formData.append("file", singleFile);
      formData.append("fileName", singleFile.name);
      filePackage.push(formData);
    }

    await fileUploadService
      .UploadFile(formData)
      .then(onFileSubmitSuccess)
      .catch(onFileSubmitError);
  };

  const onFileSubmitSuccess = (response) => {
    Toastr.success("File uploaded successfully.", "Success");
    let imgUrl = response.data.item[0].url;
    let payload = {
      firstName: profile.fName,
      lastName: profile.lName,
      avatarUrl: imgUrl,
    };

    userService
      .updateUserData(currentUser.id, payload)
      .then(onUserUpdateSuccess)
      .catch(onUserUpdateError);
  };

  const onFileSubmitError = (error) => {
    _logger("ERROR", error);
    Toastr.error("Error uploading file.", "Error");
  };

  const onUserUpdateSuccess = (response) => {
    _logger("updated", response);
    Toastr.success("Profile image updated successfully.", "Success");
    window.location.reload(false);
  };

  const onUserUpdateError = (err) => {
    _logger("update error", err);
    Toastr.error("Error updating profile image.", "Error");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Select file(s) to upload
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              onChange={handleChange}
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttorneyImageUpload;

AttorneyImageUpload.propTypes = {
  profile: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
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
};
