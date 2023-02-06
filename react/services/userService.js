import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { userUrl: `${API_HOST_PREFIX}/api/users` };

const registerUser = (payload) => {
  const config = {
    method: "POST",
    url: endpoint.userUrl,
    data: payload,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const registerAsAttorney = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.userUrl}/attorney`,
    data: payload,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const confirmEmail = (email, token) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/confirm?email=${email}&token=${token}`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application" },
  };
  return axios(config);
};

const loginUser = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.userUrl}/login`,
    data: payload,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/current`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const getUserById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/${id}`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const getUserByEmail = (email) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/?email=${email}`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const getUsersByAttorneyId = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/attorney/${id}?attorneyId=${id}`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const logout = () => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/logout`,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config);
};

const paginate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const search = (pageIndex, pageSize, query, role, status) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&role=${role}&status=${status}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchRoles = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/searchrole/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchStatus = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.userUrl}/searchstatus/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateStatus = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.userUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addRole = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.userUrl}/addrole`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateUserData = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.userUrl}/${id}/settings`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const resetPassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.userUrl}/reset`,
    data: payload,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updatePassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint.userUrl}/changepassword`,
    data: payload,
    withCredintials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const userService = {
  registerUser,
  registerAsAttorney,
  confirmEmail,
  loginUser,
  getCurrentUser,
  getUserByEmail,
  getUsersByAttorneyId,
  getUserById,
  logout,
  paginate,
  search,
  updateStatus,
  addRole,
  searchRoles,
  searchStatus,
  resetPassword,
  updatePassword,
  updateUserData,
};
export default userService;
