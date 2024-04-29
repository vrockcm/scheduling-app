const express = require("express");
const moment = require("moment");
const router = express("router");
let { coachDB, bookingDB } = require("../database");

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, date, time } = req.body;
  let result = coachDB.filter((db) => db.id === parseInt(id));

  if (result.length === 1) {
    const startTime = moment(time, "h:mm").format("HH:mm");
    const endTime = moment(time, "h:mm").add(2, "h").format("HH:mm");

    bookingDB.push({
      id: bookingDB.length + 1,
      name: name,
      phone: phone,
      coach_id: 1,
      date: date,
      startTime: startTime,
      endTime: endTime,
      rating: null,
      notes: null,
    });

    return res.status(200).send({
      message: result[0].phone,
    });
  }
});

router.get("/history", (req, res) => {
  const now = moment();
  const grouped = coachDB.reduce((acc = {}, curr) => {
    const coachBookings = bookingDB.filter(
      (booking) => booking.coach_id === curr.id
    );

    const allBookingsForCoach = coachBookings.reduce((accu = {}, curr) => {
      const date = curr.date;
      if (moment(date).isBefore(now)) {
        accu[date] = accu[date] || [];
        curr.coach = {
          name: curr.name,
          email: curr.email,
          phone: curr.phone,
          timezone: curr.timezone,
          id: curr.id,
        };
        accu[date].push(curr);
        return accu;
      }
      return accu;
    }, {});

    return Object.assign(acc, allBookingsForCoach);
  }, {});

  return res.json(grouped);
});

router.put("/:id/rate", (req, res) => {
  const now = moment();
  const { rating, notes } = req.body;
  const { id } = req.params;

  bookingDB = bookingDB.map((booking) => {
    if (booking.id === parseInt(id)) {
      booking.rating = rating;
      booking.notes = notes;
    }
    return booking;
  });

  return res.status(200).send({
    message: "This is a success!",
  });
});

router.get("/", (req, res) => {
  const now = moment();
  const grouped = coachDB.reduce((acc = {}, curr) => {
    const coachBookings = bookingDB.filter(
      (booking) => booking.coach_id === curr.id
    );

    const allBookingsForCoach = coachBookings.reduce((accu = {}, curr) => {
      const date = curr.date;
      if (moment(date).isAfter(now)) {
        accu[date] = accu[date] || [];
        curr.coach = {
          name: curr.name,
          email: curr.email,
          phone: curr.phone,
          timezone: curr.timezone,
          id: curr.id,
        };
        accu[date].push(curr);
        return accu;
      }
      return accu;
    }, {});

    return Object.assign(acc, allBookingsForCoach);
  }, {});

  return res.json(grouped);
});

module.exports = router;
