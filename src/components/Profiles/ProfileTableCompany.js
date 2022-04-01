import React from "react";
import { connect, useSelector } from "react-redux";
import { nextComponent } from "../../middleware/action";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { blue } from "@material-ui/core/colors";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";

import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ProfileCompany from "./ProfileCompany";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MaterialTableComponent from "../Table/MaterialTableComponent";
import {
  getCompanyProfile,
  getCompanyProfileById,
  deleteCompanyProfileById,
} from "../../services/companyprofile.service";
import MaterialButtonComponent from "../Button/MaterialButtonComponent";
import MaterialBreadcrumbsComponent from "../Breadcrumbs/MaterialBreadcrumbsComponent";
import { getConfigurationByPropertyCode } from "../../services/user.service";

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

export const ProfileTableCompany = (props) => {
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

  const [data, setData] = React.useState([
    {
      id: 1000000001,
      RefNo: "1.1",
      code: "CFGPMS",
      name_en: "PMS Configuration",
      name_th: "การกำหนดค่า PMS",
      name_cn: "PMS 配置",
      description: "CFGPMS description",
      createdate: "2021-08-13 12:03:00",
      master: true,
      addchild: false,
      children: [
        {
          id: 1000000002,
          RefNo: "1.1.1",
          code: "CFGPROP",
          name_en: "Property Configuration",
          name_th: "การกำหนดค่า Property",
          description: "CFGPROP Configuration",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: false,
          children: [
            {
              id: 1000000003,
              RefNo: "1.1.1.1",
              code: "PROPERTY",
              name_en: "Property Master",
              description: "PROPERTY description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000004,
              RefNo: "1.1.1.2",
              code: "BUILDING",
              name_en: "Building Master",
              description: "BUILDING description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000005,
              RefNo: "1.1.1.3",
              code: "EXPOSURE",
              name_en: "Exposure",
              description: "EXPOSURE description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000006,
              RefNo: "1.1.1.4",
              code: "FLOOR",
              name_en: "Floor",
              name_th: "ชั้น",
              description: "FLOOR description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000007,
              RefNo: "1.1.1.5",
              code: "ZONE",
              name_en: "Zone/Wing",
              description: "ZONE description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
          ],
        },
        {
          id: 1000000008,
          RefNo: "1.1.2",
          code: "CFGROOM",
          name_en: "Room Configuration",
          name_th: "การกำหนดค่าห้อง",
          description: "CFGROOM description",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: false,
          children: [
            {
              id: 1000000009,
              RefNo: "1.1.2.1",
              code: "RMTYPE",
              name_en: "Room Type",
              name_th: "ประเภทห้อง",
              description: "RMTYPE description",
              master: true,
              addchild: true,
              createdate: "2021-08-13 12:03:00",
            },
            {
              id: 1000000010,
              RefNo: "1.1.2.2",
              code: "RMCAT",
              name_en: "Room Category",
              name_th: "ประเภทห้อง",
              description: "RMCAT description",
              master: true,
              addchild: true,
              createdate: "2021-08-13 12:03:00",
            },
            {
              id: 1000000011,
              RefNo: "1.1.2.3",
              code: "ROOM",
              name_en: "Room Master Maintenance",
              name_th: "การบำรุงรักษาห้องมาสเตอร์",
              description: "ROOM description",
              master: true,
              addchild: true,
              createdate: "2021-08-13 12:03:00",
            },
          ],
        },
        {
          id: 1000000012,
          RefNo: "1.1.3",
          code: "CFGITEM",
          name_en: "Item Configuration",
          name_th: "การกำหนดค่ารายการ",
          description: "CFGITEM description",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: false,
          children: [
            {
              id: 1000000013,
              RefNo: "1.1.3.1",
              code: "ITEMTYPE",
              name_en: "Item Type",
              name_th: "ประเภทรายการ",
              description: "ITEMTYPE description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000014,
              RefNo: "1.1.3.2",
              code: "ITEMCAT",
              name_en: "Item Category",
              name_th: "หมวดหมู่รายการ",
              description: "ITEMCAT description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
          ],
        },
        {
          id: 1000000015,
          RefNo: "1.1.4",
          code: "CFGRSVN",
          name_en: "Reservation Configuration",
          name_th: "การกำหนดค่าการจอง",
          description: "CFGRSVN description",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: false,
          children: [
            {
              id: 1000000016,
              RefNo: "1.1.4.1",
              code: "MARKET",
              name_en: "Market segment Maintenance",
              name_th: "การบำรุงรักษาส่วนตลาด",
              description: "MARKET description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
            {
              id: 1000000017,
              RefNo: "1.1.4.2",
              code: "SOURCE",
              name_en: "Source Maintenance",
              name_th: "การบำรุงรักษาแหล่งที่มา",
              description: "SOURCE description",
              createdate: "2021-08-13 12:03:00",
              master: true,
              addchild: true,
            },
          ],
        },
      ],
    },
    {
      id: 1000000018,
      RefNo: "1.2",
      code: "CFGSYS",
      name_en: "System Configuration",
      name_th: "การกำหนดค่าระบบ",
      description: "CFGSYS description",
      createdate: "2021-08-13 12:03:00",
      master: true,
      addchild: false,
      children: [
        {
          id: 1000000019,
          RefNo: "1.2.1",
          code: "USER",
          name_en: "User Management",
          name_th: "การจัดการผู้ใช้",
          description: "USER description",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: true,
        },
        {
          id: 1000000020,
          RefNo: "1.2.2",
          code: "ROLE",
          name_en: "Role Management",
          name_th: "การจัดการบทบาท",
          description: "ROLE description",
          createdate: "2021-08-13 12:03:00",
          master: true,
          addchild: true,
        },
      ],
    },
  ]);

  // const updateProperty = useSelector((state) => state.reducer.property);
  // const [property, setProperty] = React.useState(updateProperty);
  const updateProperty = sessionStorage.getItem("property");
  const [property, setProperty] = React.useState(
    sessionStorage.getItem("property")
  );

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

  React.useEffect(async () => {
    console.log("useEffect");
    let configdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      updateProperty
    );
    setData(configdata.content);
    setProperty((prev) => updateProperty);
  }, [updateProperty]);

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
    const resp = await getCompanyProfile(sessionStorage.getItem("auth"));
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
  const handleAddDataEdit = async (companyData) => {
    await setTriggerButton(!triggerButton);
    await setAction("edit");
  };

  const handleEditData = async (data) => {
    await setTriggerButton(!triggerButton);
    const resp = await getCompanyProfileById(
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
              { text: "Company", handle: () => setStatusProfile("moredata") },
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
        <ProfileCompany
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
                title="Profile Company"
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
              Confirm Delete CompanyProfile
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
)(ProfileTableCompany);
