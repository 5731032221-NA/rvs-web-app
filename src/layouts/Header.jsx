import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles, alpha } from "@material-ui/core/styles";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NotificationsIcon from "@material-ui/icons/Notifications";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import NotesIcon from "@mui/icons-material/Notes";
import { Avatar, Badge, createTheme, Stack } from "@mui/material";
import dayjs from "dayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
  },
  boxTab: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "50px",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "400px",
  },
  topBar: {
    marginRight: theme.spacing(2),
  },
  topBarfar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 100,
    width: "100%",
    backgroundColor: "#00aeff",
  },
});

export default function Header() {
  const classes = useStyles();

  const [wordColor, setWordColor] = React.useState("#00aeff");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const [selectedHeader, setSelectedHeader] = React.useState(0);
  const [openFarontdesk, setOpenFarontdesk] = React.useState(false);

  const handleClickFarontdesk = () => {
    setSelectedHeader(0);
    setOpenFarontdesk(!openFarontdesk);
    navigate("/farontdes");
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.boxTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: wordColor },
              }}
            >
              <Tab
                icon={<ImageAspectRatioIcon />}
                style={{ textTransform: "none", fontSize: "12px" }}
                label="Front Desk"
                onClick={handleClickFarontdesk}
                selected={selectedHeader === 0}
              />
              <span
                style={{
                  color: "white",
                  borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></span>
              <Tab
                icon={<KingBedOutlinedIcon />}
                style={{ textTransform: "none", fontSize: "12px" }}
                label="Reservation"
                onClick={handleClickFarontdesk}
                selected={selectedHeader === 0}
              />
              <span
                style={{
                  color: "white",
                  borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></span>
              <Tab
                icon={<MonetizationOnIcon />}
                style={{ textTransform: "none", fontSize: "12px" }}
                label="Cashier"
                onClick={handleClickFarontdesk}
                selected={selectedHeader === 0}
              />
              <span
                style={{
                  color: "white",
                  borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></span>
              <Tab
                icon={<NightsStayOutlinedIcon />}
                style={{ textTransform: "none", fontSize: "12px" }}
                label="Night Auditor"
                onClick={handleClickFarontdesk}
                selected={selectedHeader === 0}
              />
            </StyledTabs>
          </Box>
        </div>

        <div className={classes.topbarRight}>
          <Typography className={classes.topBar}>
            {dayjs().format("DD MMM YYYY")}{" "}
          </Typography>

          <span>|</span>

          <Typography className={classes.topBarfar}>
            {dayjs().format("HH:mm A")}{" "}
          </Typography>

          <IconButton
            className={classes.topBar}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <div>
            {" "}
            <span
              style={{
                color: "white",
                borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                marginTop: 20,
                marginBottom: 20,
              }}
            ></span>
          </div>
          <Avatar
            className={classes.topBarfar}
            src="/static/images/avatar/3.jpg"
            variant="square"
          />
          <Typography>Pratchaya N.</Typography>
          <ArrowDropDownIcon />
        </div>
      </Toolbar>
    </div>
  );
}
