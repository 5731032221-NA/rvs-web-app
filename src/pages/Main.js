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
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SortIcon from "@mui/icons-material/Sort";
import { makeStyles } from "@mui/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Header from "../layouts/Header";
import ListMenu from "./../middleware/listitems/ListMenu";
import BottomBar from "../layouts/BottomBar";

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

export default function Main({ children }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = children;

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
            backgroundColor: "white)",
            outline: "1px solid #ffffff",
          },
        }}
      />
      <CssBaseline />
      <AppBar className={classes.header} position="fixed" open={open}>
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
          <Header />
        </Toolbar>
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

          <ListMenu />
        </SwipeableDrawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <BottomBar />
      </Box>
    </Box>
  );
}
