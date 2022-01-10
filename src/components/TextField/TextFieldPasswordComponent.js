import React from "react";
import {
  TextField
} from "@mui/material";
import './TextFieldPasswordComponent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function TextFieldComponent({
  
  id="",
  label="",
  htmlFor="",
  placeholder=""
}) {
  const [values, setValues] = React.useState({

    password: '',
 
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //Button color
  return <TextField
  id={id}
  label={label}
  htmlFor={htmlFor}
  className="Path-459"
  placeholder={placeholder}
  type={values.showPassword ? 'text' : 'password'}
  value={values.password}
  onChange={handleChange('password')}
  variant="filled"
  InputProps={{
    endAdornment:
      (<><InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {values.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment> </>)
    
 }}
 
  ></TextField>
}