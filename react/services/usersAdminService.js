import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { usersAdminUrl: `${API_HOST_PREFIX}/api/usersadmin` };

const Paginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.usersAdminUrl}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const Search = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.usersAdminUrl}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const UpdateStatus = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.usersAdminUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const usersAdminService = { Paginate, Search, UpdateStatus };

export default usersAdminService;
