import React from "react";
import { connect, useSelector } from "react-redux";
import { nextComponent } from "../../middleware/action";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProfileIndividual from "./ProfileIndividual";
import {
  getIndividualProfile,
  getIndividualProfileById,
  deleteIndividualProfileById,
} from "../../services/individualprofile.service";
import * as actions from "../../middleware/action";
import MaterialTableComponent from "../Table/MaterialTableComponent";
import MaterialButtonComponent from "../Button/MaterialButtonComponent";
import MaterialBreadcrumbsComponent from "../Breadcrumbs/MaterialBreadcrumbsComponent";
import {
  updateConfiguration,
  getConfigurationByPropertyCode,
} from "../../services/user.service";

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

function createData(
  nameid,
  title,
  firstname,
  lastname,
  gender,
  countrycode,
  nationality,
  laststay,
  score,
  status
) {
  return {
    nameid,
    title,
    firstname,
    lastname,
    gender,
    countrycode,
    nationality,
    laststay,
    score,
    status,
  };
}

const rows = [];

export const ProfileTableIndividual = (props) => {
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

  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

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

  const [triggerButton, setTriggerButton] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [individualData, setIndividualData] = React.useState(null);
  const [statusProfile, setStatusProfile] = React.useState("none");
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({
    nameid: "nameid",
    title: "title",
    firstname: "firstname",
    lastname: "lastname",
  });
  const [editData, setEditData] = React.useState(" ");

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };

  React.useEffect(async () => {
    console.log("useEffect");
    let configdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      updateProperty
    );
    setData(configdata.content);
    setProperty((prev) => updateProperty);
  }, [updateProperty]);

  const handleNewData = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("none");
    console.log("triggerButton :: ", triggerButton);
    await props.handleRedirectToTableIndividual(false);
    await setEditData(null);
    await setStatusProfile("add");
  };

  //save button on **add component
  const handleAddData = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("add");
    await setEditData(null);
    console.log("triggerButton :: ", triggerButton);

    // await setStatusProfile("moredata");
    console.log("Table page :: ", props.RedirectToTableIndividual);
    if (props.RedirectToTableIndividual) {
      await handleReloadTable();
      await handleReloadTable();
    }
  };

  //save button on **edit component
  const handleSaveEditData = async () => {
    await setTriggerButton(!triggerButton);
    console.log("triggerButton :: ", triggerButton);
    await setAction("edit");
    await setEditData(null);
    // await setStatusProfile("moredata");
    // =========****
    console.log("Table page :: ", props.RedirectToTableIndividual);
    if (props.RedirectToTableIndividual) {
      await handleReloadTable();
      await handleReloadTable();
    }
  };

  const handleEditData = async (rowData) => {
    await setTriggerButton(!triggerButton);
    await setAction("none");
    console.log("triggerButton :: ", triggerButton);
    await props.handleRedirectToTableIndividual(false);

    let individualdata = await getIndividualProfileById(
      sessionStorage.getItem("auth"),
      rowData.nameid
    );

    console.log("rowData", rowData);
    console.log("individualdata ==", individualdata.content);
    await setEditData(individualdata.content);
    await handleDeleteData(
      rowData.nameid,
      rowData.title,
      rowData.firstname,
      rowData.lastname
    );
    await setStatusProfile("edit");
    console.log("test Edit");
  };

  const handleDeleteData = async (nameid, title, firstname, lastname) => {
    console.log("data : ", nameid, title, firstname, lastname);
    setDeleteData({
      nameid: nameid,
      title: title,
      firstname: firstname,
      lastname: lastname,
    });
  };

  const handleConfirmDeleteData = async () => {
    console.log(deleteData.nameid);
    let id = deleteData.nameid;
    let datafordelete = await deleteIndividualProfileById(
      sessionStorage.getItem("auth"),
      id
    );
    console.log("deleteData return", datafordelete);
    await handleReloadTable();
    setDialogDelete(false);
  };

  const handleDialogDeleteOpen = async (rowData) => {
    await setDeleteData({
      nameid: rowData.nameid,
      title: rowData.title,
      firstname: rowData.firstname,
      lastname: rowData.lastname,
    });
    // console.log(rowData);
    await setDialogDelete(true);
  };
  const handleDialogDeleteClose = () => {
    setDialogDelete(false);
  };

  const handleReloadTable = async () => {
    const data = await getIndividualProfile(sessionStorage.getItem("auth"));
    console.log("data", data);
    let _individualData = [];
    if (data.content.length != 0) {
      data.content.forEach((element) =>
        _individualData.push(
          createData(
            element.nameid,
            element.nametitle,
            element.firstname,
            element.lastname,
            element.gender,
            element.conuty,
            element.nationality,
            // element.laststay,
            "-",
            // element.score,
            "-",
            // element.status
            element.statusprofile == "Y" ? "Active" : "Inactive"
          )
        )
      );
    }
    console.log("individualData", _individualData);
    await setIndividualData(_individualData);
    await setStatusProfile("moredata");
  };

  React.useEffect(() => {
    if (statusProfile === "moredata") {
      handleReloadTable();
    }
  }, [statusProfile]);

  //initial data to table
  React.useEffect(() => {
    async function fetchData() {
      const data = await getIndividualProfile(sessionStorage.getItem("auth"));
      console.log("data", data);
      let _individualData = [];
      if (data.content.length !== 0) {
        data.content.forEach((element) =>
          _individualData.push(
            createData(
              element.nameid,
              element.nametitle,
              element.firstname,
              element.lastname,
              element.gender,
              element.conuty,
              element.nationality,
              // element.laststay,
              "-",
              // element.score,
              "-",
              // element.status
              element.statusprofile == "Y" ? "Active" : "Inactive"
            )
          )
        );
        console.log("individualData", _individualData);
      }

      setIndividualData(_individualData);
    }
    fetchData();
    setStatusProfile("moredata");
  }, []);

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
                text: "Individual",
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
            handleData={handleSaveEditData}
          />
        ) : statusProfile === "moredata" ? (
          <MaterialButtonComponent
            handleNewData={handleNewData}
            handleNewText="Add New Profile"
          />
        ) : null}
      </Grid>
      {statusProfile === "edit" || statusProfile === "add" ? (
        <ProfileIndividual
          editdata={editData}
          action={action}
          trigger={triggerButton}
        />
      ) : (
        [
          individualData == null ? (
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
                <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleNewData()}
                  >
                    Create New Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div style={{ maxWidth: "100%" }}>
              <MaterialTableComponent
                placeHolder="Search by ID, Title, First Name, Last Name, Gender, country "
                title="Profile Individual"
                rows={individualData}
                handleNewData={handleNewData}
                handleEditData={handleEditData}
                handleDialogDeleteOpen={handleDialogDeleteOpen}
                columns={[
                  {
                    title: "ID",
                    field: "nameid",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Title",
                    field: "title",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "First Name",
                    field: "firstname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Last Name",
                    field: "lastname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Gender",
                    field: "gender",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Country",
                    field: "countrycode",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Last Stay",
                    field: "laststay",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Score",
                    field: "score",
                    headerStyle: headerTableStyle,
                  },

                  {
                    render: (rowData) => {
                      return rowData.status === "Inactive" ? (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 20,
                            backgroundColor: "gray",
                            color: "white",
                          }}
                        >
                          {rowData.status}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 20,
                            backgroundColor: mainColor,
                            color: "white",
                          }}
                        >
                          {rowData.status}
                        </Button>
                      );
                    },
                    cellStyle: { textAlign: "center" },
                    headerStyle: {
                      textAlign: "center",
                      paddingLeft: 37,
                      backgroundColor: themeState.paper,
                      color: themeState.color,
                    },
                    title: "Status",
                    field: "status",
                  },
                ]}
              />
              {/* <MaterialTable
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  color: themeState.color,
                  backgroundColor: themeState.paper,
                }}
                columns={[
                  {
                    title: "ID",
                    field: "nameid",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Title",
                    field: "title",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "First Name",
                    field: "firstname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Last Name",
                    field: "lastname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Gender",
                    field: "gender",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Country",
                    field: "countrycode",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Last Stay",
                    field: "laststay",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Score",
                    field: "score",
                    headerStyle: headerTableStyle,
                  },

                  {
                    render: (rowData) => {
                      return rowData.status === "Inactive" ? (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 20,
                            backgroundColor: "gray",
                            color: "white",
                          }}
                        >
                          {rowData.status}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 20,
                            backgroundColor: mainColor,
                            color: "white",
                          }}
                        >
                          {rowData.status}
                        </Button>
                      );
                    },
                    cellStyle: { textAlign: "center" },
                    headerStyle: {
                      textAlign: "center",
                      paddingLeft: 37,
                      backgroundColor: themeState.paper,
                      color: themeState.color,
                    },
                    title: "Status",
                    field: "status",
                  },
                ]}
                data={individualData}
                options={{
                  searchFieldAlignment: "left",
                  showTitle: false,
                  search: true,
                  actionsColumnIndex: -1,
                  pageSize: 10,
                  pageSizeOptions: [
                    10,
                    20,
                    30,
                    { value: rows.length, label: "All" },
                  ],
                  headerStyle: headerTableStyle,
                  searchFieldStyle: {
                    placeholder: "test",
                    backgroundColor: themeState.paper,
                    color: themeState.color,
                    borderBottomColor: themeState.color,
                    width: 430,
                  },
                }}
                localization={{
                  toolbar: {
                    searchPlaceholder:
                      "Search by ID, Title, First Name, Last Name, Gender, country",
                  },
                }}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      handleEditData(rowData);
                    },
                  },
                  {
                    icon: "delete",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Delete",
                    onClick: (event, rowData) => {
                      handleDialogDeleteOpen(
                        rowData.nameid,
                        rowData.firstname,
                        rowData.lastname,
                        rowData.title
                      );
                    },
                  },
                ]}
              /> */}
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
              Confirm Delete Profile
            </DialogTitle>
            <DialogContent style={headerTableStyle}>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Title:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.title}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  First Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.firstname}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Last Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.lastname}
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
                    onClick={() => handleConfirmDeleteData()}
                    variant="contained"
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

const mapStateToProps = (state) => {
  return {
    RedirectToTableIndividual: state.reducer.redirectToTableIndividual,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRedirectToTableIndividual: (status) => {
      return dispatch(actions.editRedirectToTableIndividual(status));
    },

    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTableIndividual);
