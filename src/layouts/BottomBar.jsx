import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Grid } from "@mui/material";

function BottomBar() {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        p: 0,
        m: 0,
        bottom: 0,
        zIndex: 1500,
        heigh: "30px",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",

          borderRadius: 1,
        }}
      >
        <Grid sx={{ bgcolor: "#0f349a" }}>
          {" "}
          <div
            style={{
              color: "white",
              marginTop: "7px",
              marginBottom: "7px",
              marginRight: "35px",
              marginLeft: "35px",
            }}
          >
            Room2011
          </div>{" "}
        </Grid>
        <Grid>
          <div
            style={{
              color: "#000",
              marginTop: "7px",
              marginBottom: "7px",
              marginRight: "35px",
              marginLeft: "35px",
            }}
          >
            Room2066
          </div>
        </Grid>
      </Box>
    </AppBar>
  );
}

export default BottomBar;
