const express = require("express");
const router = express.Router();
const { coachDB } = require("../database");

router.get("/", (req, res) => {
  return res.json(coachDB);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let result = coachDB.filter((db) => db.id === parseInt(id));
  return res.json({
    name: result[0].name,
    email: result[0].email,
    phone: result[0].phone,
  });
});

module.exports = router;
