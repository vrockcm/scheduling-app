import axios from "axios";
import moment from "moment";

export async function handleCreateSchedule(
  id,
  selectedTimezone,
  schedule,
  navigate
) {
  try {
    return await axios
      .post("http://localhost:9000/schedules", {
        id: id,
        timezone: selectedTimezone,
        schedule,
      })
      .then((res) => {
        navigate(`/coaches/profile/${id}}`);
      });
  } catch (err) {
    console.error(err);
  }
}

export async function getUserDetails(id) {
  return axios.get(`http://localhost:9000/schedules/${id}`);
}

export async function handleBooking(id, name, phone, date, time) {
  return await axios.post(`http://localhost:9000/bookings/${id}`, {
    name: name,
    phone: phone,
    date: date,
    time: time,
  });
}

export async function getAllBookings() {
  return axios.get(`http://localhost:9000/bookings`);
}

export async function handleRateBooking(id, rating, notes) {
  return axios.put(`http://localhost:9000/bookings/${id}/rate`, {
    rating: rating,
    notes: notes,
  });
}

export async function getPastBookings() {
  return axios.get(`http://localhost:9000/bookings/history`);
}

export async function getCoachDetails(id) {
  return axios.get(`http://localhost:9000/coaches/${id}`);
}

export async function getCoachAvailibility(id, date, timezone) {
  return axios.get(`http://localhost:9000/availabilities/${id}`, {
    params: {
      date: moment(date).format("MM/DD/YYYY"),
    },
  });
}

export async function getAllCoaches() {
  return axios.get(`http://localhost:9000/coaches`);
}
