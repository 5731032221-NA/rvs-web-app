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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
  },
  BoxTab: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "50px",
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  badge1: {
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Header() {
  const classes = useStyles();

  const [wordColor, setWordColor] = React.useState("#00aeff");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Toolbar>
        <div className={classes.BoxTab}>
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
                {...a11yProps(0)}
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
                {...a11yProps(1)}
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
                {...a11yProps(2)}
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
                {...a11yProps(3)}
              />
            </StyledTabs>
          </Box>
        </div>

        <div className={classes.icons} style={{ paddingLeft: 400 }}>
          <Typography className={classes.badge}>
            {dayjs().format("DD MMM YYYY")}{" "}
          </Typography>

          <span>|</span>

          <Typography className={classes.badge1}> 11:30AM</Typography>

          <IconButton
            className={classes.badge}
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
            src="/static/images/avatar/3.jpg"
            variant="square"
            className={classes.badge1}
          />

          <Typography className={classes.badge}>Pratchaya N.</Typography>
          <ArrowDropDownIcon />
        </div>
      </Toolbar>
    </div>
  );
}
