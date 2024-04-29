//👇🏻index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const scheduleRoute = require("./routes/schedules");
const bookingRoute = require("./routes/bookings");
const availabilityRoute = require("./routes/availabilities");
const coahesRoute = require("./routes/coaches");

app.use("/schedules", scheduleRoute);
app.use("/bookings", bookingRoute);
app.use("/availabilities", availabilityRoute);
app.use("/coaches", coahesRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
