import * as React from "react";
import logo_white from "../assets/images/logo_Revosoft.png";
import logomin_white from "../assets/images/logomin_white.png";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  AppBar,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SortIcon from "@mui/icons-material/Sort";
import { makeStyles } from "@material-ui/core";
import GlobalStyles from "@mui/material/GlobalStyles";

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
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

export default function Main({ children }) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = children;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
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
      <AppBar className={classes.header} position="fixed">
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img src={logo_white} alt="..." height={40} />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <img src={logomin_white} alt="..." height={40} />
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              marginLeft: "5px",
            }}
          >
            <SortIcon />
          </IconButton>
          <span
            style={{
              color: "white",
              borderLeft: " 1px solid rgb(255 255 255 / 44%)",
              marginTop: 20,
              marginBottom: 20,
            }}
          ></span>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <span
              style={{
                color: "white",
                borderLeft: " 1px solid rgb(255 255 255 / 44%)",
                marginTop: 20,
                marginBottom: 20,
              }}
            ></span>
          </Box>

          <Header />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "flex", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1e42a4",
              color: "white",
            },
          }}
        >
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

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "flex" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1e42a4",
              color: "white",
            },
          }}
          open
        >
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
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <BottomBar />
      </Box>
    </Box>
  );
}
