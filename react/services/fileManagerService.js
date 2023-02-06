import axios from "axios";
import {API_HOST_PREFIX, onGlobalError, onGlobalSuccess} from "./serviceHelpers"

const endpoint = `${API_HOST_PREFIX}/api/files/`;

const editFile = (payload, id) => {

  const config = {
      method: `PUT`,
      url: `${endpoint}${id}`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }, 
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const getAllExpired = () => {
  const config = {
    method: `GET`,
    url: `${endpoint}expired`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError) 
};

const getAllSorted = (pageIndex, pageSize, sortBy, deleted) => {
  const config = {
    method: `GET`,
    url: `${endpoint}sorted/?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${sortBy}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const deleteById = (id) => {

  const config = {
      method: `DELETE`,
      url: `${endpoint}permanentdelete/${id}`,
      data: id,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }, 
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const getFilesByDeleteStatus = (pageIndex, pageSize, deleted) => {
  const config = {
    method: `GET`,
    url: `${endpoint}status/?pageIndex=${pageIndex}&pageSize=${pageSize}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const queryFilesWithDeleteStatus = (pageIndex, pageSize, query, deleted) => {

  const config = {
      method: `GET`,
      url: `${endpoint}search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&deleted=${deleted}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const queryFileTypeWithDeleteStatus = (pageIndex, pageSize, fileTypeId, deleted) => {

  const config = {
    method: `GET`,
    url: `${endpoint}status/filetypeid/?pageIndex=${pageIndex}&pageSize=${pageSize}&fileTypeId=${fileTypeId}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError) 
};

const queryUploaderIdWithDeleteStatus = (pageIndex, pageSize, createdById, deleted) => { 

  const config = {
    method: `GET`,
    url: `${endpoint}status/createdby/?pageIndex=${pageIndex}&pageSize=${pageSize}&createdById=${createdById}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type" : "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const queryUploaderNameWithDeleteStatus = (pageIndex, pageSize, creatorName, deleted) => { 

  const config = {
    method: `GET`,
    url: `${endpoint}status/creatorname/?pageIndex=${pageIndex}&pageSize=${pageSize}&creatorName=${creatorName}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type" : "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const queryFileIdWithDeleteStatus = (pageIndex, pageSize, id, deleted) => { 

  const config = {
    method: `GET`,
    url: `${endpoint}${id}/status/?pageIndex=${pageIndex}&pageSize=${pageSize}&id=${id}&deleted=${deleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

export {
  deleteById, 
  getFilesByDeleteStatus, 
  getAllExpired,
  getAllSorted,
  queryFilesWithDeleteStatus, 
  editFile, 
  queryFileTypeWithDeleteStatus, 
  queryUploaderNameWithDeleteStatus,
  queryUploaderIdWithDeleteStatus,
  queryFileIdWithDeleteStatus
 };