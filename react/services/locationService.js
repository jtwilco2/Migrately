import debug from "sabio-debug";
import axios from "axios";
const _logger = debug.extend("ResourceForm");

const endpoint = "https://localhost:50001";


const logLocation = (payload) => {
  _logger('logLocation')
  _logger('payload', payload)

  const config = {
    method: "POST",
    url: endpoint + "/api/locations/",
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};


const getStateId = (payload) => {
  const config = {
    method: "POST",
    url: endpoint + "/api/lookups/",
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};


export { logLocation, getStateId};