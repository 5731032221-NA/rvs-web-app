import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import translate_th from "../../static/lang/th.json";
import translate_en from "../../static/lang/en.json";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KingBedIcon from "@mui/icons-material/KingBed";
import { ExpandLess, StarBorder } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "&.Mui-selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$.Mui-selected:hover": {
      backgroundColor: "purple",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&:hover": {
      backgroundColor: "blue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
  },
  selected: {},
});

function ListMenu() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [translate, setTranslate] = React.useState(translate_en);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openFrontDesk, setOpenFrontDesk] = React.useState(false);
  const [openCashier, setOpenCashier] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openNightAuditor, setOpenNightAuditor] = React.useState(false);
  const [openHouseKeeping, setOpenHouseKeeping] = React.useState(false);
  const [openEngineer, setOpenEngineer] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [openConfiguration, setOpenConfiguration] = React.useState(false);
  const [openSystemsTools, setOpenSystemsTools] = React.useState(false);
  const [openDashboard, setOpenDashboard] = React.useState(false);
  const [openReservation, setOpenReservation] = React.useState(false);

  const setFontSize = {
    fontSize: 14,
  };

  React.useEffect(() => {
    console.log("translate:", translate);
  }, []);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickFrontDesk = () => {
    setSelectedIndex(2);
    setOpenFrontDesk(!openFrontDesk);
  };

  const handleClickCashier = () => {
    setSelectedIndex(3);
    setOpenCashier(!openCashier);
  };

  const handleClickProfile = () => {
    setSelectedIndex(4);
    setOpenProfile(!openProfile);
  };

  const handleClickNightAuditor = () => {
    setSelectedIndex(5);
    setOpenNightAuditor(!openNightAuditor);
  };

  const handleClickHouseKeeping = () => {
    setSelectedIndex(6);
    setOpenHouseKeeping(!openHouseKeeping);
  };

  const handleClickEngineer = () => {
    setSelectedIndex(7);
    setOpenEngineer(!openEngineer);
  };

  const handleClickReport = () => {
    setSelectedIndex(8);
    setOpenReport(!openReport);
  };

  const handleClickConfiguration = () => {
    setSelectedIndex(9);
    setOpenConfiguration(!openConfiguration);
    navigate("/configuration");
  };

  const handleClickSystemsTools = () => {
    setSelectedIndex(10);
    setOpenSystemsTools(!openSystemsTools);
  };

  const handleClickDashboard = () => {
    setSelectedIndex(0);
    setOpenDashboard(!openDashboard);
    navigate("/dashboard");
  };

  const handleClickReservation = () => {
    setSelectedIndex(1);
    setOpenReservation(!openReservation);
    navigate("/reservation");
  };

  return (
    <List
      sx={{ fontSize: "14px" }}
      sx={{
        // selected and (selected + hover) states
        "&& .Mui-selected, && .Mui-selected:hover": {
          bgcolor: "#0f349a",
          borderLeft: "2px solid white",
          "&, & .MuiListItemIcon-root": {
            color: "white",
          },
        },
        // hover states
        "& .MuiListItemButton-root:hover": {
          bgcolor: "#0f349a",
          "&, & .MuiListItemIcon-root": {
            color: "white",
          },
        },
      }}
    >
      <ListItem
        button
        onClick={handleClickDashboard}
        selected={selectedIndex === 0}
      >
        <ListItemIcon>
          <DashboardIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Dashboard}
        />
      </ListItem>

      <ListItem
        button
        onClick={handleClickReservation}
        selected={selectedIndex === 1}
      >
        <ListItemIcon>
          <KingBedIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Reservation}
        />
      </ListItem>

      <ListItemButton
        onClick={handleClickFrontDesk}
        selected={selectedIndex === 2}
      >
        <ListItemIcon>
          <ImageAspectRatioIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.FrontDesk}
        />
        {openFrontDesk ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openFrontDesk} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Walk-in"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Check-in"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Check-out"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickCashier}
        selected={selectedIndex === 3}
      >
        <ListItemIcon>
          <MonetizationOnIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Cashier}
        />
        {openCashier ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCashier} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Walk-in"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Check-in"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Check-out"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickProfile}
        selected={selectedIndex === 4}
      >
        <ListItemIcon>
          <PeopleIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Profile}
        />
        {openProfile ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Individual"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Travel Agent"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Company"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Group"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickNightAuditor}
        selected={selectedIndex === 5}
      >
        <ListItemIcon>
          <NightsStayIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.NightAuditor}
        />
        {openNightAuditor ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openNightAuditor} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Reports"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Hotel Date Maintenance"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Close-Day Procedure"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Auto-Sequence Reports"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickHouseKeeping}
        selected={selectedIndex === 6}
      >
        <ListItemIcon>
          <LibraryBooksIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.HouseKeeping}
        />
        {openHouseKeeping ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openHouseKeeping} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Item Management"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickEngineer}
        selected={selectedIndex === 7}
      >
        <ListItemIcon>
          <EngineeringIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Engineer}
        />
        {openEngineer ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openEngineer} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Item Management"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickReport}
        selected={selectedIndex === 8}
      >
        <ListItemIcon>
          <AssessmentIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary="Reports"
        />
        {openReport ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openReport} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Customizable"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickConfiguration}
        selected={selectedIndex === 9}
      >
        <ListItemIcon>
          <SettingsIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.Configuration}
        />
        {openConfiguration ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openConfiguration} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Customizable"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Status"
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={handleClickSystemsTools}
        selected={selectedIndex === 10}
      >
        <ListItemIcon>
          <AssignmentIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: setFontSize }}
          primary={translate.SystemsTools}
        />
        {openSystemsTools ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSystemsTools} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Hotel Status"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 9 }}>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Room Rack"
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default ListMenu;
