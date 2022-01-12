import React from "react";
import './errorMessage.css'
import WarningIcon from '@mui/icons-material/Warning';
import {
  Grid
} from "@mui/material";
export default function ErrorMessageComponent({text=""}) {
  return  <div className="Rectangle-454"><div className="redLeft"/><WarningIcon className="icon"/><h5 className="Invalid-Username-or-password" >{text}</h5></div>
}