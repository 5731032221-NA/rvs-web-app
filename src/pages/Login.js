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
  Divider
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlueButtonComponent from '../components/Button/BlueButtonComponent'
import TransparentButtonComponent from '../components/Button/TransparentButtonComponent'
import TextFieldComponent from '../components/TextField/TextFieldComponent'
import TextFieldPasswordComponent from '../components/TextField/TextFieldPasswordComponent'
import Copyright from '../components/Utils/copyright'
import ErrorMessageComponent from "../components/Utils/errorMessage";
import auth from "../services/auth.service";
import { useNavigate } from "react-router-dom";

import propertyPermission from "../services/propertypermission.service";
import propertyRole from "../services/propertyrole.service";

import { EDIT_PROPERTY, EDIT_COMPONENT } from "../middleware/action";
import { EDIT_PERMISSION } from "../middleware/action";
import { ReactReduxContext } from "react-redux";

// import { createTheme } from '@mui/material/styles';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import green from '@mui/material/colors/green';
const useStyles = makeStyles(theme => ({
  paper: {
    //   overflow: "auto",
    //   boxSizing: "content-box",
    // textAlign: "center",
    // marginTop: 100,
    // width: "100vw",
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)"

    // opacity: 0.8,
    // backgroundColor: 'transparent',

  },
}));

function Login({ setToken }) {
  const classes = useStyles();
  const { store } = useContext(ReactReduxContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const [file, setFile] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [valueComponentUsername, setValueComponentUsername] = useState({username:""});
  const [valueComponentPassword, setValueComponentPassword] = useState({password:""});
  const [resTooken, setResToken] = useState(null);
  const [errorCookie, setErrorCookie] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState("SPJ1");


  const signIn = async () => {
    
    if (valueComponentUsername.username === null || valueComponentUsername.username === "" || !valueComponentUsername.username) {
      setErrorUsername(true);
      setErrorLogin(!errorLogin)
    } else {
      setErrorUsername(false);
    }
    if (valueComponentPassword.password === null || valueComponentPassword.password === "" || !valueComponentPassword.password) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (
      (valueComponentUsername.username) &&
      (valueComponentPassword.password)
    ) {

   
      const token = await auth({
        user: {
          username:valueComponentUsername.username,
          password:valueComponentPassword.password,
        },
      });

      if (token.status == 2000) {
        setToken(token)
        setResToken(token);
        // setToken(token);
        var d1 = new Date(),
          d2 = new Date(d1);
        d2.setFullYear(d2.getFullYear() + 100);
        // setCookie("UUID" ,  uuid.v4(), { path: '/', expires: d2 });
        setErrorUsername(false);
        setErrorPassword(false);
        // if (cookies["UUID"] == null) {
        //   if (username == "ADMIN" || username == "root") {
        //     setDialogAdd(true);
        //     setUpdateData({ type: deviceTypes[0].label });
        //   } else setErrorCookie(true);
        // } else setToken(token);
        sessionStorage.setItem("contents", JSON.stringify(token.contents));
        await handleSelect();
        navigate("/dashboard");
      } else {
        setErrorLogin(true);
      }
    }
  };



  const handleSelect = async () => {
    setSelectedProperty(JSON.parse(sessionStorage.getItem("grantproperty"))[0].propertycode);
    console.log("sessionStorage.getItem(username):",sessionStorage.getItem("username"));
    const permission = await propertyPermission(
      sessionStorage.getItem("auth"),
      selectedProperty,
      sessionStorage.getItem("username")
    );
    console.log("permission", permission);

    // sessionStorage.setItem("permissionref", permission.content[permission.content.length - 1]);
    store.dispatch({
      type: EDIT_PERMISSION,
      payload: permission.content[permission.content.length - 1],
    });

    const role = await propertyRole(
      sessionStorage.getItem("auth"),
      selectedProperty,
      sessionStorage.getItem("username")
    );
    sessionStorage.setItem("role", role.content[role.content.length - 1]);
    console.log("::role::", role.content[role.content.length - 1]);
    // const menu = await menus(sessionStorage.getItem("auth"),selectedProperty);
    // sessionStorage.setItem('comp', JSON.stringify(menu.content.components));
    store.dispatch({
      type: EDIT_PROPERTY,
      payload: selectedProperty,
    });
    sessionStorage.setItem("property", selectedProperty);
    console.log("Dashboard::::::");
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: "Dashboard",
    });
    
  };

  const handleSubmit = async () => {
    console.log("signin")
    setErrorLogin(!errorLogin)
  };

  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div className="background"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* <div className="box"></div> */}
      {/* <Box
        p={2}
        position="absolute"
        top="6%"
        right="0"
        zIndex="tooltip"
        style={{ backgroundRepeat: "no-repeat" }}
        sx={{ display: "flex" }}
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
          />

        )}
      </Box> */}

      <Container
        component="main"
        maxWidth="xs"
        alignitems="center"
        justifycontent="center"
      >

        <Grid 
        marginTop='18vh'
        // paddingTop='7vh'
        className="Rectangle-1185"  >
          <Grid className="Rectangle-1186">
            <img
              src={require("../assets/images/novotel.png")}
              className="logo"
            />
          </Grid>
          <img className="imglogo" src={require("../assets/images/logo_Revosoft.png")} />
          {/* <Grid className="TextGroup">
            <img className="imglogo" src={require("../assets/images/logo_Revosoft.png")} />
            <Grid className="TextName">
            <div className="text-style"><h5 className="REVOSOFT" >REVO</h5><a className="REVOSOFT-text-style-1" >SOFT</a></div>
            <div><h5 className="Hotel-Property-Management-System">
              Hotel Property Management System
            </h5></div>
            </Grid>
          </Grid> */}

          {/* <Divider variant="middle" /> */}
          {errorLogin ? <ErrorMessageComponent text="Invalid Username or Password" /> : null}
          <Grid item className="formlogin">
            {/* Validate */}
            <form >
              <Grid item>
                <TextFieldComponent
                  id="username"
                  label=" Username "
                  htmlFor="Username"
                  placeholder="Revosoft@Metrosystems.co.th"
                  setValueComponent={setValueComponentUsername}
                  valueComponent={valueComponentUsername}
                // onChange={(e) => setUserName(e.target.value)}
                ></TextFieldComponent>
              </Grid>
              <Grid item style={{ marginTop: '10px' }}>
                <TextFieldPasswordComponent
                  id="password"
                  label="Password"
                  htmlFor="password"
                  type="password"
                  setValueComponent={setValueComponentPassword}
                  valueComponent={valueComponentPassword}
                  // onChange={(e) => setPassword(e.target.value)}
                ></TextFieldPasswordComponent>
              </Grid>
              <Grid item style={{ paddingTop: 25, paddingBottom: 20 }} >
                <BlueButtonComponent
                  text="SIGN IN"
                  onClick={signIn}
                />
                <TransparentButtonComponent
                  text="Sign In by Administrator"
                />
              </Grid>
            </form>
          </Grid>

        </Grid>
        <Copyright />
      </Container>

    </div>
  );
}

export default Login;

