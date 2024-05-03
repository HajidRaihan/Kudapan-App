import React from "react";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";

function TimeAgo({ timestamp }) {
  // Konversi timestamp ke objek Date
  // const date = new Date(timestamp);

  // // Hitung jarak waktu antara tanggal sekarang dan timestamp
  // const timeAgo = formatDistanceToNow(date);

  // const timeAgo = moment("2024-04-12T06:24:44.647Z").fromNow(true);
  const currentTime = moment(); // Waktu saat ini
  const uploadTime = moment(timestamp); // Waktu upload

  const duration = moment.duration(currentTime.diff(uploadTime));
  const hoursAgo = duration.asHours(); // Selisih waktu dalam jam

  let timeAgo;
  if (hoursAgo < 1) {
    // Kurang dari 1 jam yang lalu
    const minutesAgo = duration.asMinutes();
    timeAgo = `${Math.floor(minutesAgo)} menit yang lalu`;
  } else {
    timeAgo = `${Math.floor(hoursAgo)} jam yang lalu`;
  }

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
