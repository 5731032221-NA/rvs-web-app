import * as React from "react";
import {
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
} from "@mui/material";
import {
  alpha,
  Avatar,
  Badge,
  Button,
  Container,
  makeStyles,
  Menu,
  Tab,
  Tabs,
  Tooltip,
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowDropDown,
  Favorite,
  ImageAspectRatio,
  KingBedOutlined,
  MonetizationOn,
  NightsStayOutlined,
  PersonPin,
  Search,
} from "@material-ui/icons";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  tab: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },

  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
  },
  topBar: {
    marginRight: theme.spacing(2),
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

export default function Header() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [wordColor, setWordColor] = React.useState("#00aeff");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 2 new notifications"
          color="inherit"
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const navigate = useNavigate();
  const [selectedHeader, setSelectedHeader] = React.useState(0);
  const [openFarontdesk, setOpenFarontdesk] = React.useState(false);

  const handleClickFarontdesk = () => {
    setSelectedHeader(0);
    setOpenFarontdesk(!openFarontdesk);
    navigate("/farontdes");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <div className={classes.tab}>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
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
                  icon={<MonetizationOn />}
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
                  icon={<NightsStayOutlined />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Night Auditor"
                  onClick={handleClickFarontdesk}
                  selected={selectedHeader === 0}
                />
              </StyledTabs>
            </div>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleClickFarontdesk}
              selected={selectedHeader === 0}
            >
              <ImageAspectRatio />
            </IconButton>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleClickFarontdesk}
              selected={selectedHeader === 0}
            >
              <KingBedOutlined />
            </IconButton>

            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleClickFarontdesk}
              selected={selectedHeader === 0}
            >
              <MonetizationOn />
            </IconButton>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleClickFarontdesk}
              selected={selectedHeader === 0}
            >
              <NightsStayOutlined />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <div className={classes.topbarRight}>
                <Typography className={classes.topBar}>
                  {dayjs().format("DD MMM YYYY")}{" "}
                </Typography>

                <span className={classes.topBar}>|</span>

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
                <IconButton onClick={handleProfileMenuOpen} color="inherit">
                  <Avatar
                    className={classes.topBar}
                    src="/static/images/avatar/3.jpg"
                    variant="square"
                  />
                  <Typography>Pratchaya N.</Typography>
                  <ArrowDropDown />
                </IconButton>
              </div>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>{" "}
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
