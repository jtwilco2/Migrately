import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { advertisementUrl: `${API_HOST_PREFIX}/api/advertisements` };

  const addAdvertisement = (payload) => {
    const config = {
      method: "POST",
      url: `${endpoint.advertisementUrl}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);;
  };

  const editAdvertisement = (id, payload) => {
    const config = {
      method: "PUT",
      url: `${endpoint.advertisementUrl}/${id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  const getAdByUserId = (id, pageIndex, pageSize) => {
    const config = {
      method: "GET",
      url: `${endpoint.advertisementUrl}/createdby/${id}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const deleteAdvertisement = (id) => {
    const config = {
      method: "DELETE",
      url: `${endpoint.advertisementUrl}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => {return id});
  };

  const advertisementService = {
    addAdvertisement,
    editAdvertisement,
    getAdByUserId,
    deleteAdvertisement
  };

  export default advertisementService;