import axios from "axios";
import { API_HOST_PREFIX } from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}`;

const UploadFile = (file) => {
  const config = {
    method: "POST",
    url: endpoint + "/api/files/aws/upload",
    withCredentials: true,
    data: file,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { UploadFile };