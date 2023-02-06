import React, { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";

function Calendar(props) {
  const { appointments } = props;

  return (
    <Fragment>
      <div className="mb-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={appointments}
        />
      </div>
    </Fragment>
  );
}

export default Calendar;

Calendar.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  )
};
