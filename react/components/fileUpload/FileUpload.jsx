import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import Toastr from "toastr";

import * as fileUploadService from "../../services/fileUploadService";

const FileUpload = ({ onUploadSuccess }) => {
  const _logger = debug.extend("FileUpload");

  const [file, setFile] = useState([{ file: "" }]);

  const handleChange = (event) => {
    setFile(event.target.files);
  };

  const onSubmitClicked = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const filePackage = [];

    for (let index = 0; index < file.length; index++) {
      const singleFile = file[index];
      formData.append("file", singleFile);
      formData.append("fileName", singleFile.name);
      filePackage.push(formData);
    }

    fileUploadService
      .UploadFile(formData)
      .then(onFileSubmitSuccess)
      .catch(onFileSubmitError);
  };

  const onFileSubmitSuccess = (response) => {
    Toastr.success("File uploaded successfully.", "Success");
    _logger("SUCCESS", response.data.item);
    if (onUploadSuccess) {
      onUploadSuccess(response.data.item);
    }
  };

  const onFileSubmitError = (error) => {
    Toastr.error("Error uploading file.", "Error");
    _logger("ERROR", error);
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
            <button
              type="submit"
              className="btn btn-outline-dark"
              onClick={onSubmitClicked}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  onUploadSuccess: PropTypes.func,
};

export default FileUpload;
