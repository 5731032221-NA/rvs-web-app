import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  alpha,
  Badge,
  Tabs,
  Tab,
  Container,
} from "@mui/material";
import {
  AccountCircle,
  ArrowDropDown,
  ImageAspectRatio,
  KingBedOutlined,
  MonetizationOn,
  NightsStayOutlined,
} from "@material-ui/icons";
import NotificationsIcon from "@mui/icons-material/Notifications";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tab: {
    display: "flex",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "60px",
    width: "100%",
  },
  topbarRight1: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
  },
  topBar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  topdata: {
    margin: "5px 10px 10px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "100%",
    marginLeft: theme.spacing(2),
  },
  profileSmall: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "100%",
    marginLeft: theme.spacing(2),
  },
  topBarSmall: {
    marginLeft: theme.spacing(2),
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: "5px",
    minWidth: 180,
    color:
      theme.palette.mode === "light" ? "rgb(0, 0, 0)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [wordColor, setWordColor] = React.useState("#00aeff");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [selectedHeader, setSelectedHeader] = React.useState(0);
  const [openFarontdes, setOpenFarontdes] = React.useState(false);

  const handleClickFarontdesk = () => {
    setSelectedHeader(0);
    setOpenFarontdes(!openFarontdes);
    navigate("/farontdes");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}>
            <div className={classes.tab}>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="inherit"
                TabIndicatorProps={{
                  style: { backgroundColor: wordColor },
                }}
              >
                <Tab
                  icon={<ImageAspectRatio />}
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
                  icon={<KingBedOutlined />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Reservation"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
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
                  icon={<MonetizationOn />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Cashier"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
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
                  icon={<NightsStayOutlined />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Night Auditor"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
                />
              </StyledTabs>
            </div>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}></Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <div className={classes.topbarRight1}>
                <div className={classes.topbarRight}>
                  <Typography className={classes.topBar}>
                    {dayjs().format("DD MMM YYYY")}{" "}
                  </Typography>

                  <span className={classes.topdata}>|</span>

                  <Typography className={classes.topBar}>
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
                    <span
                      style={{
                        color: "white",
                        borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 10,
                      }}
                    ></span>
                  </div>

                  <div className={classes.profile} onClick={handleClick}>
                    <Avatar
                      className={classes.topBar}
                      variant="rounded"
                      src="/static/images/avatar/3.jpg"
                    />
                    <Typography>Pratchaya N.</Typography>
                    <ArrowDropDown />
                  </div>
                </div>
              </div>
            </Box>

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <div className={classes.topbarRight}>
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
                  <span
                    style={{
                      color: "white",
                      borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                      marginTop: 20,
                      marginBottom: 20,
                      marginLeft: 10,
                    }}
                  ></span>
                </div>

                <div className={classes.profileSmall} onClick={handleClick}>
                  <Avatar
                    className={classes.topBarSmall}
                    variant="rounded"
                    src="/static/images/avatar/3.jpg"
                  />
                  <ArrowDropDown />
                </div>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Duplicate
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} disableRipple>
                    <SettingsIcon />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </StyledMenu>
              </div>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </>
  );
}
