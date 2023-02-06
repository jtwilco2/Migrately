import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/licenses`;

let getLicenses = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let searchLicenseState = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let searchLicenseNumber = (pageIndex, pageSize, licenseNumberQuery) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search/licensenumber?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${licenseNumberQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let addLicense = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let editLicense = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deleteLicense = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(() => id)
    .catch(onGlobalError);
};

let getLicenseCreatedBy = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/createdby/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let searchByNumberAndState = (
  pageIndex,
  pageSize,
  query,
  licenseNumberQuery
) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search/numberandstate?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&licenseNumber=${licenseNumberQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  getLicenses,
  searchLicenseState,
  addLicense,
  editLicense,
  deleteLicense,
  searchLicenseNumber,
  getLicenseCreatedBy,
  searchByNumberAndState,
};
