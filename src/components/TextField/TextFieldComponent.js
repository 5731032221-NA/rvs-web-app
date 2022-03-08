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
  placeholder = "",
  setValueComponent={},
  valueComponent={}
}) {
  //Button color;
  const classes = styles();

  const [values, setValues] = React.useState(valueComponent);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setValueComponent({ ...values, [prop]: event.target.value });


  };


  return <TextField
    id={id}
    label={label}
    htmlFor={htmlFor}
    className="Path-459"
    placeholder={placeholder}
    type="text"
    value={Object.keys(valueComponent).length === 0 ? "" : values[Object.keys(valueComponent)[0]]}
    onChange={handleChange( Object.keys(valueComponent).length === 0 ? "" : Object.keys(valueComponent)[0])}
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