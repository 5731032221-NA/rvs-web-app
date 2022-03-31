import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import UseToken from "./middleware/useToken";
import configureStore from "./middleware/store";
import Dashboard from "./pages/Dashboard";
import Reservation from "./pages/Reservation";
import Configuration from "./pages/configurations/Configuration";
import ComputerPrinter from "./pages/configurations/ComputerPrinter";
import DeviceManager from "./pages/configurations/DeviceManager";
import RoleManagement from "./pages/configurations/RoleManagement";
import RoomManagement from "./pages/configurations/RoomManagement";
import UserManagement from "./pages/configurations/UserManagement";

import Main from "./pages/Main";

import Farontdes from "./components/Farontdes/Farontdes";
import ProfileTableIndividual from "./components/Profiles/ProfileTableIndividual";
import ProfileIndividual from "./components/Profiles/ProfileIndividual";
import { ProfileTableTravelAgent } from "./components/Profiles/ProfileTableTravelAgent";
import { ProfileTableCompany } from "./components/Profiles/ProfileTableCompany";

function App() {
  const [store, setStore] = useState(configureStore());
  const { token, setToken } = UseToken();
  return (
    <React.Fragment>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route
              exact
              path={`/`}
              element={<Login setToken={setToken} store={store} />}
            />
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
            <Route
              exact
              path={`/configuration`}
              element={
                <Main>
                  <Configuration />
                </Main>
              }
            />
            <Route
              exact
              path={`/computerPrinter`}
              element={
                <Main>
                  <ComputerPrinter />
                </Main>
              }
            />
            <Route
              exact
              path={`/deviceManager`}
              element={
                <Main>
                  <DeviceManager />
                </Main>
              }
            />
            <Route
              exact
              path={`/roleManagement`}
              element={
                <Main>
                  <RoleManagement />
                </Main>
              }
            />
            <Route
              exact
              path={`/roomManagement`}
              element={
                <Main>
                  <RoomManagement />
                </Main>
              }
            />
            <Route
              exact
              path={`/userManagement`}
              element={
                <Main>
                  <UserManagement />
                </Main>
              }
            />

            <Route
              exact
              path={`/profileIndividual`}
              element={
                <Main>
                  <ProfileTableIndividual />
                </Main>
              }
            />
            <Route
              exact
              path={`/profiletravelagent`}
              element={
                <Main>
                  <ProfileTableTravelAgent />
                </Main>
              }
            />
            <Route
              exact
              path={`/profilepagecompany`}
              element={
                <Main>
                  <ProfileTableCompany />
                </Main>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
