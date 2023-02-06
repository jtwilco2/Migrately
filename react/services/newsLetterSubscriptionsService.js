import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newsletterSubscription`;

const GetAllSubscribers = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const GetOnlySubscribed = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const GetSubscriptionUpdate = (values) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/email`,
    data: values,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(onGlobalSuccess)
    .then((res) => {
      if (res.isSuccessful) {
        return values;
      }
    })
    .catch(onGlobalError);
};

const addSubscriber = (values) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: values,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
export {
  GetAllSubscribers,
  GetOnlySubscribed,
  GetSubscriptionUpdate,
  addSubscriber,
};
