import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { attorneyUrl: `${API_HOST_PREFIX}/api/attorneys` };

const getAttorneyByUserId = () => {
  const config = {
    method: "GET",
    url: `${endpoint.attorneyUrl}/attorney/current`,
    withCredentials: true,
    crossdomain: true,
    header: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAttorneyPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.attorneyUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAttorneyByLanguage = (pageIndex, pageSize, language) => {
  const config = {
    method: "GET",
    url: `${endpoint.attorneyUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&language=${language}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAttorneyBySpecialty = (query) => {
  const config = {
    method: "GET",
    url: `${endpoint.attorneyUrl}/specialty/?query=${query}`,
    withCredentials: true,
    crossdomain: true,
    header: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addAttorney = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.attorneyUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateAttorney = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.attorneyUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteAttorney = (id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.attorneyUrl}/delete/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const attorneyService = {
  getAttorneyByUserId,
  getAttorneyPaginated,
  getAttorneyByLanguage,
  getAttorneyBySpecialty,
  addAttorney,
  updateAttorney,
  deleteAttorney,
};

export default attorneyService;
