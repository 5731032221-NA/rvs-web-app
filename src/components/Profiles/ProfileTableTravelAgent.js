import React from "react";
import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import MaterialBreadcrumbsComponent from "../Breadcrumbs/MaterialBreadcrumbsComponent";
import MaterialButtonComponent from "../Button/MaterialButtonComponent";
import ProfileTravelAgent from "./ProfileTravelAgent";
import { connect, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  deleteCompanyProfileById,
  getTAProfile,
  getTAProfileById,
} from "../../services/companyprofile.service";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import MaterialTableComponent from "../Table/MaterialTableComponent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { nextComponent } from "../../middleware/action";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  selectPage: {
    minWidth: 90,
    textAlign: "center",
    flexGrow: 1,
  },
  searchLayout: {
    flexGrow: 1,

    marginLeft: 20,
    marginRight: 20,
  },

  root: (themeState) => ({
    "& label.MuiInputLabel-root": {
      color: themeState.color,
    },
    "& label.Mui-focused": {
      color: blue[themeState.colorlevel],
    },
    "& .MuiInput-underline:after": {
      borderColor: themeState.color,
      color: themeState.color,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: themeState.color,
        color: themeState.color,
      },
      "&:hover fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
    },
    "&.MuiPaper-root": {
      backgroundColor: themeState.paper,
    },
    "&.MuiMenu-paper": {
      backgroundColor: themeState.paper,
    },
  }),
}));

export const ProfileTableTravelAgent = (props) => {
  const [action, setAction] = React.useState("");
  const [triggerButton, setTriggerButton] = React.useState(false);
  const [editData, setEditData] = React.useState(" ");
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "A400",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
        // matStyle: this.classes.darkmode
      });
    }
  }, [themeBackground]);

  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const maincolor = useSelector((state) => state.reducer.color);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setMainColor(maincolor);
    } else {
      setMainColor("#2D62ED");
    }
  }, [maincolor]);

  const classes = useStyles(themeState);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  let customStyle = {
    padding: theme.spacing(0, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  };

  if (smUp) {
    customStyle = {
      ...customStyle,
      width: "54ch",
      // color: "red",
    };
  }

  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const [companyData, setCompanyData] = React.useState([]);
  const [statusProfile, setStatusProfile] = React.useState("none");
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({
    title: "title",
    firstname: "firstname",
    lastname: "lastname",
  });
  const [Columns, setColumns] = React.useState([
    {
      title: "Name",
      field: "name",
      headerStyle: headerTableStyle,
    },
    {
      title: "Abbreviation",
      field: "abbreviation",
      headerStyle: headerTableStyle,
    },
    {
      title: "WWW",
      field: "www",
      headerStyle: headerTableStyle,
    },
    {
      title: "City/Country",
      field: "citycountry",
      headerStyle: headerTableStyle,
    },

    {
      title: "Industry",
      field: "industrycode",
      headerStyle: headerTableStyle,
    },
    {
      title: "IATA",
      field: "iata",
      headerStyle: headerTableStyle,
    },
    // {
    //   title: "Actions",
    //   field: "actions",
    //   headerStyle: headerTableStyle,
    // },
  ]);

  React.useEffect(async () => {
    console.log("action:", action);
    if (action == "success") {
      await handleGetCompanyProfile();
      await setStatusProfile("moredata");
    }
  }, [action]);

  React.useEffect(async () => {
    await handleGetCompanyProfile();
  }, []);

  const handleGetCompanyProfile = async () => {
    const resp = await getTAProfile(sessionStorage.getItem("auth"));
    if (resp.status == "2000") {
      if (resp.content[0].length > 0) {
        resp.content[0].forEach(function (part, index) {
          this[index].citycountry =
            (this[index].city ? this[index].city : "-") +
            "/" +
            (this[index].countrycode ? this[index].countrycode : "-");
        }, resp.content[0]);
        setStatusProfile("moredata");
        console.log("resp.content[0]:", resp.content[0]);
        setCompanyData(resp.content[0]);
      }
    }
  };

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };

  const handleNewData = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("none");
    await setEditData(null);
    await setStatusProfile("add");
  };
  const handleAddData = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("add");
  };
  const handleAddDataEdit = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("edit");
  };

  const handleEditData = async (data) => {
    await setTriggerButton(!triggerButton);
    const resp = await getTAProfileById(
      sessionStorage.getItem("auth"),
      data.id
    );
    await setEditData(resp.content);
    await setAction("none");
    await setStatusProfile("edit");
  };

  const handleDeleteData = async () => {
    try {
      const resp = await deleteCompanyProfileById(
        sessionStorage.getItem("auth"),
        deleteData.id
      );
      if (resp.status == "2000") {
        await handleGetCompanyProfile();
      }
      await setStatusProfile("moredata");
      await setDialogDelete(false);
    } catch (error) {}
  };

  const handleDialogDeleteOpen = async (rowData) => {
    await setDeleteData({
      id: rowData.id,
      name: rowData.name,
      www: rowData.www,
      city: rowData.city,
    });
    await setDialogDelete(true);
  };

  const handleDialogDeleteClose = async () => {
    await setDialogDelete(false);
  };
  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 20,
        color: themeState.color,
        marginTop: 15,
        backgroundColor: themeState.background,
      }}
    >
      <Grid container style={{ paddingLeft: 25, paddingRight: 25 }}>
        <Grid item xs={6} sm={10} md={10} lg={10} style={{ flexGrow: 1 }}>
          <MaterialBreadcrumbsComponent
            Datacrumbs={[
              {
                text: "Profiles",
                handle: () => handleComponentState("profileindividual"),
              },
              {
                text: "TravelAgent",
                handle: () => setStatusProfile("moredata"),
              },
            ]}
          />
        </Grid>
        {statusProfile === "add" ? (
          <MaterialButtonComponent
            setStatus={setStatusProfile}
            dataStatus="moredata"
            handleData={handleAddData}
          />
        ) : statusProfile === "edit" ? (
          <MaterialButtonComponent
            setStatus={setStatusProfile}
            dataStatus="moredata"
            handleData={handleAddDataEdit}
          />
        ) : statusProfile === "moredata" || statusProfile === "none" ? (
          <MaterialButtonComponent
            handleNewData={handleNewData}
            handleNewText="Add New Profile"
          />
        ) : null}
      </Grid>
      {statusProfile === "edit" || statusProfile === "add" ? (
        <ProfileTravelAgent
          editdata={editData}
          action={action}
          setAction={setAction}
          trigger={triggerButton}
        />
      ) : (
        [
          companyData == null ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ fontSize: 25, color: themeState.color }}
                >
                  <ErrorOutlineOutlinedIcon
                    style={{ fontSize: 170, color: "lightgray" }}
                  />
                </Typography>
                <Typography
                  align="center"
                  variant="h2"
                  style={{
                    fontWeight: 400,
                    fontSize: 30,
                    color: themeState.color,
                    marginBottom: 20,
                  }}
                >
                  No Data Available
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <div style={{ maxWidth: "100%" }}>
              <MaterialTableComponent
                placeHolder="Search by Name, www, City/Country, Industry, IATA"
                title="Profile TravelAgent"
                rows={companyData}
                handleNewData={handleNewData}
                handleEditData={handleEditData}
                handleDialogDeleteOpen={handleDialogDeleteOpen}
                columns={[
                  {
                    title: "Name",
                    field: "name",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Abbreviation",
                    field: "abbreviation",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "WWW",
                    field: "www",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "City/Country",
                    field: "citycountry",
                    headerStyle: headerTableStyle,
                  },

                  {
                    title: "Industry",
                    field: "industrycode",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "IATA",
                    field: "iata",
                    headerStyle: headerTableStyle,
                  },
                ]}
              />
            </div>
          ),
        ]
      )}

      <Dialog
        maxWidth="sm"
        open={dialogDelete}
        onClose={handleDialogDeleteClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DialogTitle
              id="form-dialog-title"
              style={{
                backgroundColor: themeState.paper,
                color: mainColor,
              }}
            >
              Confirm Delete TravelAgentProfile
            </DialogTitle>
            <DialogContent style={headerTableStyle}>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.name}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  www:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.www}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  City:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.city}
                </Typography>
              </Typography>
            </DialogContent>
            <DialogActions
              style={{
                backgroundColor: themeState.paper,
                color: themeState.color,
                padding: 20,
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={4}
              >
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <Button
                    fullWidth
                    onClick={handleDialogDeleteClose}
                    variant="contained"
                    color="default"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <Button
                    fullWidth
                    // onClick={() => handleDelete(updateData.id)}
                    onClick={() => handleDeleteData()}
                    variant="contained"
                    // color="primary"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTableTravelAgent);
