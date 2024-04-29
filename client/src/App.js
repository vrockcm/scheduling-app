import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AllCoaches from "./components/coach/profile/allcoaches";
import EditProfile from "./components/coach/profile/edit";
import Profile from "./components/coach/profile";
import Dashboard from "./components/coach/dashboard";
import BookCoach from "./components/book";
import History from "./components/coach/history";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coaches/profiles" element={<AllCoaches />} />
          <Route path="/coaches/profile/:id/edit" element={<EditProfile />} />
          <Route path="/coaches/profile/:id" element={<Profile />} />
          <Route path="/coaches/history" element={<History />} />
          {/* <Route path="/coaches/:id/bookings/" element={<CoachHistory />} /> */}
          <Route path="/book/:user" element={<BookCoach />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
