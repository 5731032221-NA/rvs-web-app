import * as React from "react";
import logo_white from "../assets/images/logo_Revosoft.png";
import {
  Box,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SortIcon from "@mui/icons-material/Sort";
import GlobalStyles from "@mui/material/GlobalStyles";
import clsx from "clsx";

import Header from "./Header";
import ListMenu from "./../middleware/listitems/ListMenu";
import BottomBar from "./BottomBar";

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

export default function Leftbar({ children }) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

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
            "-webkit-box-shadow": "inset 0 0 6px white",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "white)",
            outline: "1px solid white",
          },
        }}
      />
      <CssBaseline />

      <AppBar className={classes.header} position="fixed" open={open}>
        <Toolbar>
          <img
            className={classes.logoLg}
            src={logo_white}
            className={clsx(
              classes.logoExpand,
              open && classes.menuButtonHidden
            )}
            alt="..."
            height={40}
          />
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
          <div className={classes.sectionDesktop}>
            <span
              className={clsx(
                classes.logoExpand,
                open && classes.menuButtonHidden
              )}
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

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>
      <BottomBar />
    </Box>
  );
}
