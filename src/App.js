import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Leftbar from "./layouts/Leftbar";

import Dashboard from "./pages/Dashboard";
import Reservation from "./pages/Reservation";

import Farontdes from "./components/Farontdes/Farontdes";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path={`/`} element={<Login />} />
          <Route exact path={`/login`} element={<Login />} />

          <Route
            exact
            path={`/dashboard`}
            element={
              <Leftbar>
                <Dashboard />
              </Leftbar>
            }
          />
          <Route
            exact
            path={`/reservation`}
            element={
              <Leftbar>
                <Reservation />
              </Leftbar>
            }
          />

          <Route
            exact
            path={`/farontdes`}
            element={
              <Leftbar>
                <Farontdes />
              </Leftbar>
            }
          />

          {/* <Route exact path={`/leftbar`} element={<Leftbar />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
