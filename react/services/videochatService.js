import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}`;

const createRoom = () => {
    const config = {
      method: "POST",
      url: endpoint + "/api/videochat",
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getRoomByName = (name) => {
    const config = {
      method: "GET",
      url: endpoint + "/api/videochat/room?name=" + name,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getRoomMeetingInfo = (name) => {
    const config = {
      method: "GET",
      url: endpoint + "/api/videochat/meeting?name=" + name,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getAllMeetings = () => {
    const config = {
      method: "GET",
      url: endpoint + "/api/videochat/meetings",
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getAllMeetingsByHostId = (hostId) => {
    const config = {
      method: "GET",
      url: endpoint + "/api/videochat/meetingsby?hostId=" + hostId,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getMeetingsPaginated = (pageIndex, pageSize) => {
    const config = {
      method: "GET",
      url: endpoint + "/api/videochat/meetings/paginate?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const addMeeting = (payload) => {
    const config = {
      method: "POST",
      url: endpoint + "/api/videochat/meetings",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const addParticipant = (payload) => {
    const config = {
      method: "POST",
      url: endpoint + "/api/videochat/participants",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

export {createRoom, getRoomByName, getRoomMeetingInfo, getAllMeetings, addMeeting, addParticipant, getMeetingsPaginated, getAllMeetingsByHostId};
