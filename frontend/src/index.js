import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import ArtistsComponent from "./Pages/Artists.jsx";
import MusicComponent from "./Pages/Music.jsx";
import UsersComponent from "./Pages/Users.jsx";
import PrivateRoute from "./Pages/PrivateRoute.jsx";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <UsersComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/artists"
          element={
            <PrivateRoute>
              <ArtistsComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/music/:artistId"
          element={
            <PrivateRoute>
              <MusicComponent />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
