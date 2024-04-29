const express = require("express");
const router = express.Router();
const { coachDB } = require("../database");

router.post("/", (req, res) => {
  const { id, timezone, schedule } = req.body;
  let result = coachDB.filter((db) => db.id === parseInt(id));
  result[0].timezone = timezone;
  result[0].schedule = schedule;
  return res.status(200).send({
    message: "This is a success!",
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let result = coachDB.filter((db) => db.id === parseInt(id));
  if (result.length === 1) {
    return res.json({
      schedule: result[0].schedule,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }
  return res.status(400).send({
    message: "This is an error!",
  });
});

module.exports = router;
