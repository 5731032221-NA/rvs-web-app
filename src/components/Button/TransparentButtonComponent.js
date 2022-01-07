import React from "react";
import {
  Button
} from "@mui/material";
import './TransparentButtonComponent.css';

function TransparentButtonComponent({
    text = ""
  }){ 
    return <Button className="Transparent"  fullWidth>{text}</Button>;
}

export default TransparentButtonComponent;