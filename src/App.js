import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Reservation from "./pages/Reservation";
import Main from "./pages/Main";

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
              <Main>
                <Dashboard />
              </Main>
            }
          />
          <Route
            exact
            path={`/reservation`}
            element={
              <Main>
                <Reservation />
              </Main>
            }
          />

          <Route
            exact
            path={`/farontdes`}
            element={
              <Main>
                <Farontdes />
              </Main>
            }
          />

          {/* <Route exact path={`/leftbar`} element={<Leftbar />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
