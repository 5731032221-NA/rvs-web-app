import React from "react";
import {
  Button
  ,useTheme,
  makeStyles
} from "@mui/material";
import classNames from "classnames";
import './BlueButtonComponent.css';

import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
// import white from '@mui/material/colors/white';
// const useStyles = makeStyles((theme) => ({
//   white: {
//     color: theme.palette.common.white,
//   },
// }))

function BlueButtonComponent({
  text = ""
 
}) {
  //Button color
  const theme = useTheme();
  
  // const whiteTheme = createTheme({ palette: { primary: white,warning: white  , success : white} })
  
  // const classes = useStyles();

  return <Button className="Blue-Button" fullWidth>{text}</Button>
}

export default BlueButtonComponent;