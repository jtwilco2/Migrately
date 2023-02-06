import React from "react";
import FileUpload from "../fileUpload/FileUpload";
import debug from "sabio-debug";

const FileUploadParent = () => {
  const _logger = debug.extend("FileUploadParent");

  const getFileObject = (fileObj) => {
    _logger("the file Object:", fileObj);
  };

  return (
    <div>
      <FileUpload getFileObject={getFileObject} />
    </div>
  );
};

export default FileUploadParent;
