import * as React from "react";
import logo_white from "../assets/images/logo_Revosoft.png";
import logomin_white from "../assets/images/logomin_white.png";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  alpha,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SortIcon from "@mui/icons-material/Sort";
import GlobalStyles from "@mui/material/GlobalStyles";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Header from "../layouts/Header";
import ListMenu from "./../middleware/listitems/ListMenu";
import BottomBar from "../layouts/BottomBar";
import {
  ImageAspectRatio,
  KingBedOutlined,
  MonetizationOn,
  NightsStayOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  header: {
    background: "linear-gradient(45deg, #0f349a 30%, #0099ff 90%)",
    border: 0,
    boxShadow: "0 3px 5px 2px #ffffff4a",
    color: "white",
  },
  menuButtonHidden: {
    display: "none",
  },
  tab: {
    display: "flex",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    height: "60px",
    width: "100%",
    maxWidth: "365px",
    marginLeft: "50px",
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 100,
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

export default function Main({ children }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = children;
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    document.querySelector('body').style.backgroundColor = '#fafafa';
 }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    console.log("matches:", matches);
  }, [matches]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    <Box sx={{ display: "flex" }}>
      <GlobalStyles
        styles={{
         
          h1: { color: "white" },
          "*::-webkit-scrollbar": {
            width: "0.1em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 1px #ffffff",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
            outline: "1px solid #ffffff",
          },
        }}
      />
      <CssBaseline />
      <AppBar
        className={classes.header}
        position="fixed"
        open={open}
        style={matches ? {} : { zIndex: 0 }}
      >
        <Toolbar>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <img
              src={logo_white}
              className={clsx(
                classes.logoExpand,
                open && classes.menuButtonHidden
              )}
              alt="..."
              height={40}
            />
          </Box>

          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <img
              src={logomin_white}
              className={clsx(
                classes.logoExpand,
                open && classes.menuButtonHidden
              )}
              alt="..."
              height={40}
            />
          </Box>

          <Box>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              color="inherit"
              edge="start"
              sx={{
                marginLeft: "20px",
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <SortIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <div className={classes.sectionDesktop}>
              <span
                style={{
                  color: "white",
                  borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></span>
            </div>
          </Box>

          <Header />
        </Toolbar>

        <Divider />

        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <StyledToolbar>
            <div className={classes.tab}>
              <StyledTabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                textColor="inherit"
              >
                <Tab
                  icon={<ImageAspectRatio />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Front Desk"
                  onClick={handleClickFarontdesk}
                  selected={selectedHeader === 0}
                />

                <Tab
                  icon={<KingBedOutlined />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Reservation"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
                />

                <Tab
                  icon={<MonetizationOn />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Cashier"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
                />

                <Tab
                  icon={<NightsStayOutlined />}
                  style={{ textTransform: "none", fontSize: "12px" }}
                  label="Night Auditor"
                  //   onClick={handleClickFarontdesk}
                  //   selected={selectedHeader === 0}
                />
              </StyledTabs>
            </div>
          </StyledToolbar>
        </Box>
      </AppBar>

      {matches ? (
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              display: { xs: "none", sm: "flex" },
              backgroundColor: "#1e42a4",
              color: "white",
            },
          }}
        >
          <DrawerHeader sx={{ backgroundColor: "#0f349a", color: "white" }}>
            <img
              src={logo_white}
              className="rounded mx-auto d-block"
              alt="..."
              height={40}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <SortIcon style={{ color: "white" }} />
              ) : (
                <SortIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          {open ? (
            <Grid
              item
              container
              spacing={1}
              style={{ paddingLeft: 30, marginTop: 25, paddingBottom: 10 }}
            >
              <Grid item container spacing={1}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 12, paddingLeft: 50, marginTop: -10 }}
                >
                  {" Change Property"}
                </Typography>
              </Grid>

              <Grid sx={{ bgcolor: "#ffff", borderRadius: "5px" }}>
                <SwapHorizIcon
                  style={{
                    paddingRight: 0,
                    color: "#000",
                    fontSize: 25,
                    marginTop: "10px",
                    marginLeft: "5px",
                  }}
                />

                <FormControl
                  variant="filled"
                  style={{ backgroundColor: "white", borderRadius: 5 }}
                >
                  <Select
                    name="selectprop"
                    id="selectprop"
                    value="Metro Pattaya"
                    style={{ width: 160, height: 40, backgroundColor: "white" }}
                  >
                    <MenuItem value="Metro Pattaya" label="Metro Pattaya">
                      <div style={{ marginTop: -7 }}>Metro Pattaya</div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          <ListMenu />
        </Drawer>
      ) : (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          PaperProps={{
            sx: {
              zIndex: 1600,
              width: "250px",
              backgroundColor: "#1e42a4",
              color: "white",
            },
          }}
        >
          <DrawerHeader sx={{ backgroundColor: "#0f349a", color: "white" }}>
            <img
              src={logo_white}
              className="rounded mx-auto d-block"
              alt="..."
              height={40}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <SortIcon style={{ color: "white" }} />
              ) : (
                <SortIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {open ? (
            <Grid
              item
              container
              spacing={1}
              style={{ paddingLeft: 30, marginTop: 25, paddingBottom: 10 }}
            >
              <Grid item container spacing={1}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 12, paddingLeft: 50, marginTop: -10 }}
                >
                  {" Change Property"}
                </Typography>
              </Grid>

              <Grid sx={{ bgcolor: "#ffff", borderRadius: "5px" }}>
                <SwapHorizIcon
                  style={{
                    paddingRight: 0,
                    color: "#000",
                    fontSize: 25,
                    marginTop: "10px",
                    marginLeft: "5px",
                  }}
                />
                <FormControl
                  variant="filled"
                  style={{ backgroundColor: "white", borderRadius: 5 }}
                >
                  <Select
                    name="selectprop"
                    id="selectprop"
                    value="Metro Pattaya"
                    style={{ width: 160, height: 40, backgroundColor: "white" }}
                  >
                    <MenuItem value="Metro Pattaya" label="Metro Pattaya">
                      <div style={{ marginTop: -7 }}>Metro Pattaya</div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          <ListMenu />
        </SwipeableDrawer>
      )}
      <Box component="main" sx={{ flexGrow: 1,  }}>
        <DrawerHeader />

        {children}
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <BottomBar />
      </Box>
    </Box>
  );
}
