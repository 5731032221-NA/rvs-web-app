import React from "react";
import {
  TextField
} from "@mui/material";
import './TextFieldPasswordComponent';

export default function TextFieldComponent({
  id="",
  label="",
  htmlFor="",
  placeholder=""
}) {
  //Button color
  return <TextField
  id={id}
  label={label}
  htmlFor={htmlFor}
  className="Path-459"
  placeholder={placeholder}
  type="password"
  ></TextField>
}