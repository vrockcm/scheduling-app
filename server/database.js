let coachDB = [
  {
    id: 1,
    name: "Coach Dhruv",
    username: "vrockcm",
    password: "password",
    email: "vrockcm@gmail.com",
    phone: "+15165122859",
    timezone: "America/New_York",
    schedule: [
      {
        day: "Mon",
        startTime: "7:00",
        endTime: "18:00",
      },
    ],
  },
  {
    id: 2,
    name: "Coach Test",
    username: "justkidding",
    password: "password",
    phone: "+19876543222",
    email: "lmao@gmail.com",
    timezone: "America/New_York",
    schedule: [],
  },
];

let bookingDB = [
  {
    id: 1,
    name: "Test",
    phone: "+11111111111",
    coach_id: 1,
    date: "03/06/2024",
    startTime: "10:00",
    endTime: "12:00",
    rating: 5,
    notes: "TEST NOTE",
  },
  {
    id: 2,
    name: "Test",
    phone: "+11111111111",
    coach_id: 1,
    date: "03/06/2024",
    startTime: "11:00",
    endTime: "13:00",
    rating: 5,
    notes: "TEST NOTE",
  },
  {
    id: 3,
    name: "Test",
    phone: "+11111111111",
    coach_id: 1,
    date: "03/08/2024",
    startTime: "10:00",
    endTime: "12:00",
    rating: null,
    notes: null,
  },
  {
    id: 4,
    name: "Test",
    phone: "+11111111111",
    coach_id: 1,
    date: "05/06/2024",
    startTime: "10:00",
    endTime: "12:00",
    rating: null,
    notes: null,
  },
];

module.exports = {
  coachDB,
  bookingDB,
};
