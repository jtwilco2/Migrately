import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../videochat/videochatstyles.css";
import debug from "sabio-debug";
import { Col, Row, Table, Card } from "react-bootstrap";
import * as videochatService from "../../services/videochatService";
import userService from "../../services/userService";
import { formatDateTime } from "helper/dateFormater";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { searchSchema, emailSchema } from "../../schemas/videochatSchema";
import Chart from "react-apexcharts";

const _logger = debug.extend("VideochatStatistics");

export default function VideochatStatistics() {
  const [meetingData, setMeetingData] = useState({
    meetings: [],
    meetingComponents: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    currentPage: 0,
    searchInput: "",
    emailInput: "",
  });

  const [chartData, setChartData] = useState({
    firstName: null,
    lastName: null,
    dec: null,
    nov: null,
    oct: null,
    sep: null,
    aug: null,
    jul: null,
    jun: null,
    may: null,
    apr: null,
    mar: null,
    feb: null,
    jan: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    videochatService
      .getMeetingsPaginated(meetingData.pageIndex, meetingData.pageSize)
      .then(onGetMeetingsSuccess)
      .catch(onGetMeetingsError);
  }, [meetingData.pageIndex]);

  const onGetMeetingsSuccess = (response) => {
    setMeetingData((prevState) => {
      var md = { ...prevState };
      md.meetings = response.item.pagedItems;
      md.meetingComponents = response.item.pagedItems.map(mapMeetings);
      md.pageSize = response.item.pageSize;
      md.pageIndex = response.item.pageIndex;
      md.totalCount = response.item.totalCount;
      return md;
    });
  };

  const onGetMeetingsError = (error) => {
    _logger(error);
    toast.error("Error Loading Meetings");
  };

  const onCurrentPageChange = (page) => {
    setMeetingData((prevState) => {
      const md = { ...prevState };
      md.pageIndex = page - 1;
      md.currentPage = page;
      return md;
    });
  };

  const renderParticipants = (meeting) => {
    let participants = null;
    if (meeting.participants !== null) {
      participants = meeting.participants.map(mappingParticipants);
    } else {
      participants = "No Participants";
    }
    return participants;
  };

  const mappingParticipants = (participant, index) => {
    return (
      <li key={`${participant.id}_${participant.dailyRoomName}_${index}`}>
        <strong>{`${participant.firstName} ${participant.lastName}:`}</strong>{" "}
        Joined for{" "}
        {Math.floor(participant.duration / 60) === 0
          ? Math.floor(participant.duration)
          : Math.floor(participant.duration / 60)}{" "}
        {Math.floor(participant.duration / 60) === 0 ? "Seconds" : "Minutes"}
      </li>
    );
  };

  const createMeetingDate = (startTime) => {
    const newTime = new Date(startTime * 1000);
    const startDate = formatDateTime(newTime);
    return startDate;
  };

  const mapMeetings = (meeting, index) => {
    return (
      <React.Fragment key={index}>
        <tr>
          <td>{meeting.dailyRoomName}</td>
          <td>{createMeetingDate(meeting.startTime)}</td>
          <td>
            {Math.floor(meeting.duration / 60) === 0
              ? Math.floor(meeting.duration)
              : Math.floor(meeting.duration / 60)}{" "}
            {Math.floor(meeting.duration / 60) === 0 ? "Seconds" : "Minutes"}
          </td>
          <td>
            <ul>{renderParticipants(meeting)}</ul>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const onGotoVideochatClick = (e) => {
    e.preventDefault();
    navigate("/videochat");
  };

  const onEmailSearchClick = (values, { resetForm }) => {
    resetForm();
    userService
      .getUserByEmail(values.emailInput)
      .then(onGetUserByEmailSuccess)
      .catch(onGetUserByEmailError);
  };

  const onGetUserByEmailSuccess = (response) => {
    videochatService
      .getAllMeetingsByHostId(response.data.item.userId)
      .then(onGetByHostIdSuccess)
      .catch(onGetByHostIdError);
  };

  const onGetUserByEmailError = (error) => {
    _logger(error, "From Get User By Email Error");
    toast.error("Email Not Found!");
  };

  const onSearchClick = (values, { resetForm }) => {
    resetForm();
    videochatService
      .getAllMeetingsByHostId(values.searchInput)
      .then(onGetByHostIdSuccess)
      .catch(onGetByHostIdError);
  };

  const onGetByHostIdSuccess = (response) => {
    _logger(response, "From Get By Host Id Success");
    var decDurationArray = response.items.map(getDecTime);
    var novDurationArray = response.items.map(getNovTime);
    var octDurationArray = response.items.map(getOctTime);
    var sepDurationArray = response.items.map(getSepTime);
    var augDurationArray = response.items.map(getAugTime);
    var julDurationArray = response.items.map(getJulTime);
    var junDurationArray = response.items.map(getJunTime);
    var mayDurationArray = response.items.map(getMayTime);
    var aprDurationArray = response.items.map(getAprTime);
    var marDurationArray = response.items.map(getMarTime);
    var febDurationArray = response.items.map(getFebTime);
    var janDurationArray = response.items.map(getJanTime);

    var decSum = sumOfArray(decDurationArray);
    var novSum = sumOfArray(novDurationArray);
    var octSum = sumOfArray(octDurationArray);
    var sepSum = sumOfArray(sepDurationArray);
    var augSum = sumOfArray(augDurationArray);
    var julSum = sumOfArray(julDurationArray);
    var junSum = sumOfArray(junDurationArray);
    var maySum = sumOfArray(mayDurationArray);
    var aprSum = sumOfArray(aprDurationArray);
    var marSum = sumOfArray(marDurationArray);
    var febSum = sumOfArray(febDurationArray);
    var janSum = sumOfArray(janDurationArray);

    setChartData((prevState) => {
      var ch = { ...prevState };
      ch.jan = janSum;
      ch.feb = febSum;
      ch.mar = marSum;
      ch.apr = aprSum;
      ch.may = maySum;
      ch.jun = junSum;
      ch.jul = julSum;
      ch.aug = augSum;
      ch.sep = sepSum;
      ch.oct = octSum;
      ch.nov = novSum;
      ch.dec = decSum;
      ch.firstName = response.items[0].hostFirstName;
      ch.lastName = response.items[0].hostLastName;
      return ch;
    });
  };

  const onGetByHostIdError = (error) => {
    _logger(error, "From Get By Host Id Error");
    toast.error("Host does not have any Video Calls on record!");
    setChartData((prevState) => {
      var ch = { ...prevState };
      ch.jan = null;
      ch.feb = null;
      ch.mar = null;
      ch.apr = null;
      ch.may = null;
      ch.jun = null;
      ch.jul = null;
      ch.aug = null;
      ch.sep = null;
      ch.oct = null;
      ch.nov = null;
      ch.dec = null;
      ch.firstName = null;
      ch.lastName = null;
      return ch;
    });
  };

  const sumOfArray = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    if (isNaN(sum)) {
      return 0;
    } else {
      return sum;
    }
  };

  const getDecTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Dec")) {
      return meeting.duration;
    }
  };

  const getNovTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Nov")) {
      return meeting.duration;
    }
  };

  const getOctTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Oct")) {
      return meeting.duration;
    }
  };

  const getSepTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Sep")) {
      return meeting.duration;
    }
  };

  const getAugTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Aug")) {
      return meeting.duration;
    }
  };

  const getJulTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Jul")) {
      return meeting.duration;
    }
  };

  const getJunTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Jun")) {
      return meeting.duration;
    }
  };

  const getMayTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("May")) {
      return meeting.duration;
    }
  };

  const getAprTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Apr")) {
      return meeting.duration;
    }
  };

  const getMarTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Mar")) {
      return meeting.duration;
    }
  };

  const getFebTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Feb")) {
      return meeting.duration;
    }
  };

  const getJanTime = (meeting) => {
    var startTime = meeting.startTime;
    var startDate = new Date(startTime * 1000).toDateString();
    var dateArray = startDate.split(" ");
    if (dateArray.includes("Jan")) {
      return meeting.duration;
    }
  };

  const chartState = {
    options: {
      chart: {
        id: "meetingsInfo",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Seconds on Call",
        data: [
          chartData.jan,
          chartData.feb,
          chartData.mar,
          chartData.apr,
          chartData.may,
          chartData.jun,
          chartData.jul,
          chartData.aug,
          chartData.sep,
          chartData.oct,
          chartData.nov,
          chartData.dec,
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="container p-3 ">
        <button className="btn btn-primary" onClick={onGotoVideochatClick}>
          Go to Videochat Room
        </button>
      </div>
      <div className="container">
        <Row>
          <Col lg={12} md={12} sm={12} className="w-100">
            <Card>
              <Card.Header>
                <h2 className="mb-0">All Meetings</h2>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive border-0 overflow-y-hidden">
                  <Table hover>
                    <thead className="lightheader-room">
                      <tr>
                        <th>
                          <strong>Room Name</strong>
                        </th>
                        <th>
                          <strong>Date</strong>
                        </th>
                        <th>
                          <strong>Duration</strong>
                        </th>
                        <th>
                          <strong>Participants</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{meetingData.meetingComponents}</tbody>
                  </Table>
                </div>
              </Card.Body>
              <div className="container m-3">
                <Pagination
                  onChange={onCurrentPageChange}
                  current={meetingData.currentPage}
                  pageSize={meetingData.pageSize}
                  total={meetingData.totalCount}
                />
              </div>
            </Card>
          </Col>
          <ToastContainer />
        </Row>
        <Row>
          <div className="container statistics-container">
            <div className="row statistics-title">
              <h2 className="m-3 p-1">
                Meeting Statistics by Host Id or Email.
              </h2>
            </div>
            <div className="row m-3">
              <div className="col">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    searchInput: "",
                  }}
                  onSubmit={onSearchClick}
                  validationSchema={searchSchema}
                >
                  <Form>
                    <div className="row form-margin">
                      <div className="col-md-3">
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="searchInput"
                            placeholder="Host Id"
                          />
                          <ErrorMessage
                            name="searchInput"
                            component="div"
                            className="has-error"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <button type="submit" className="btn btn-primary ">
                          Search
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="col">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    emailInput: "",
                  }}
                  onSubmit={onEmailSearchClick}
                  validationSchema={emailSchema}
                >
                  <Form>
                    <div className="row form-margin">
                      <div className="col-md-5">
                        <div className="form-group">
                          <Field
                            type="text"
                            className="form-control"
                            name="emailInput"
                            placeholder="Host Email"
                          />
                          <ErrorMessage
                            name="emailInput"
                            component="div"
                            className="has-error"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <button type="submit" className="btn btn-primary ">
                          Search
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="row">
              <div className="col m-3">
                {chartData.firstName !== null && (
                  <h1>
                    {chartData.firstName} {chartData.lastName}
                  </h1>
                )}
              </div>
            </div>
            <div className="row">
              {chartData.dec !== null && (
                <Chart
                  className="border-0 overflow-y-hidden"
                  options={chartState.options}
                  series={chartState.series}
                  type="line"
                  width="1050"
                />
              )}
            </div>
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
}
