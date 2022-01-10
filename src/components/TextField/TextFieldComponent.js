import React from "react";
import {
  TextField
} from "@mui/material";
import './TextFieldComponent';
import grey from '@mui/material/colors/grey'
const styles = theme => ({
  textFieldColor: {
    color: 'red'
  }
})
export default function TextFieldComponent({
  id = "",
  label = "",
  htmlFor = "",
  placeholder = ""
}) {
  //Button color;
  const classes = styles();
  return <TextField
    id={id}
    label={label}
    htmlFor={htmlFor}
    className="Path-459"
    placeholder={placeholder}
    type="text"
    variant="filled"
    InputProps={{
      className: classes.textFieldColor
    }}

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