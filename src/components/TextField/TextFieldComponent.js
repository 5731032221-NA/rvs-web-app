import React from "react";
import {
  TextField
} from "@mui/material";
import './TextFieldComponent';

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
  type="text"
  
    // onChange={(e) => setUserName(e.target.value)}
  // InputProps={{
  //   endAdornment: (
  //     <InputAdornment position="end">
  //       <GroupOutlinedIcon style={{ color: "#2D62ED" }} />
  //     </InputAdornment>
  //   ),
  // }}
  ></TextField>
}