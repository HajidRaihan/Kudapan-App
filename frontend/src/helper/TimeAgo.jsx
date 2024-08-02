import React from "react";
import moment from "moment";

function TimeAgo({ timestamp }) {
  const currentTime = moment(); // Waktu saat ini
  const uploadTime = moment(timestamp); // Waktu upload

  const duration = moment.duration(currentTime.diff(uploadTime));
  const hoursAgo = duration.asHours(); // Selisih waktu dalam jam

  let timeAgo;
  if (hoursAgo < 1) {
    // Kurang dari 1 jam yang lalu
    const minutesAgo = duration.asMinutes();
    timeAgo = `${Math.floor(minutesAgo)} menit yang lalu`;
  } else if (hoursAgo < 24) {
    // Kurang dari 24 jam yang lalu
    timeAgo = `${Math.floor(hoursAgo)} jam yang lalu`;
  } else {
    // Lebih dari 24 jam yang lalu
    const daysAgo = duration.asDays();
    timeAgo = `${Math.floor(daysAgo)} hari yang lalu`;
  }

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
