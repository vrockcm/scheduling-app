const express = require("express");
const router = express.Router();
const { coachDB, bookingDB } = require("../database");
const moment = require("moment");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const date = req.query.date;

  let coach = coachDB.filter((db) => db.id === parseInt(id));

  if (coach.length === 1) {
    const availableTimes = [];
    const day = moment(date).format("ddd");

    const schedule = coach[0].schedule.find(
      (availability) => availability.day === day
    );

    if (!schedule) {
      return res.status(400).send("No availability for that day");
    }

    const startTime = moment(
      `${date} ${schedule.startTime}`,
      "MM/DD/YYYY HH:mm"
    );
    const endTime = moment(`${date} ${schedule.endTime}`, "MM/DD/YYYY HH:mm");
    const now = moment();

    const coachBookings = bookingDB.filter(
      (booking) => booking.coach_id === coach[0].id
    );

    for (let i = startTime.hour(); i <= endTime.hour(); i = i + 2) {
      const currentTime = moment(date).set("hour", i);
      const isBooked = coachBookings.some((booking) => {
        const start = moment(
          `${booking.date} ${booking.startTime}`,
          "MM/DD/YYYY HH:mm"
        );
        const end = moment(
          `${booking.date} ${booking.endTime}`,
          "MM/DD/YYYY HH:mm"
        );
        return currentTime.isSame(start);
      });
      if (
        !isBooked &&
        currentTime.isAfter(now) &&
        currentTime.add(2, "h").isSameOrBefore(endTime)
      ) {
        availableTimes.push(`${i}:00`);
      }
    }

    return res.json({
      availableTimes: availableTimes,
    });
  }
  return res.status(400).send({
    message: "This is an error!",
  });
});

module.exports = router;
