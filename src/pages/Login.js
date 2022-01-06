import React, { useState, useContext } from "react";
import background from "../assets/images/imgbackground.jpg";
import './Login.css';
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/Visibility";
import {
  InputAdornment,
  TextField,
  Container,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import BlueButtonComponent from '../components/Button/BlueButtonComponent'
import TransparentButtonComponent from '../components/Button/TransparentButtonComponent'
import TextFieldComponent from '../components/TextField/TextFieldComponent'
import TextFieldPasswordComponent from '../components/TextField/TextFieldPasswordComponent'
// import { createTheme } from '@mui/material/styles';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import green from '@mui/material/colors/green';
function App() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const [file, setFile] = useState("");
  const [updateData, setUpdateData] = useState({});

  const handleSubmit = async (e) => {}
  return (
    <div className="background"
    style={{
      width: '100vw',
      height: '100vh',
    }}
    >
      <div className="box"></div>
       <Box
            p={2}
            position="absolute"
            top="6%"
            left="89%"
            zIndex="tooltip"
            style={{ backgroundRepeat: "no-repeat" }}
            sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
          >
            {file ? (
              <img
                src={file}
                className="logo"
                alt="logo"
              />
            ) : (
              <img
                src={require("../assets/images/imgbackground-logo.png")}
                className="logo"
                alt="logo"
              />
            )}
          </Box>

          <Container
            component="main"
            maxWidth="xs"
            alignitems="center"
            justifycontent="center"
          >
            
            <Paper className="paper"  >
              <img className="imglogo"  src={require("../assets/images/rvs.png")}/>
              <div><a className="REVOSOFT" />REVO<a/><a className="REVOSOFT-text-style-1" />SOFT<a/></div>
              <div><h5 className="Hotel-Property-Management-System">
                Hotel Property Management System
              </h5></div>
              <Divider variant="middle" />


              <Grid item className="formlogin">
                {/* Validate */}
                <form autoComplete="on" onSubmit={handleSubmit}>
                  <Grid item>
                    <TextFieldComponent
                      id="username"
                      label=" Username "
                      htmlFor="Username"
                      placeholder="Revosoft@Metrosystems.co.th"
                      // onChange={(e) => setUserName(e.target.value)}
                    ></TextFieldComponent>
                  </Grid>
                  <Grid item style={{ marginTop: 0 }}>
                    <TextFieldPasswordComponent
                      id="password"
                      label="Password"
                      htmlFor="password"
                      type="password"
                      // onChange={(e) => setPassword(e.target.value)}
                    ></TextFieldPasswordComponent>
                  </Grid>
                  <Grid item  style={{ paddingTop: 25, paddingBottom: 20 }}>
                    <BlueButtonComponent
                      text="SIGN IN"
                    />
                    <TransparentButtonComponent
                      text="SIGN IN BY AD"
                    />
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Container>
                
    </div>
  );
}

export default App;
