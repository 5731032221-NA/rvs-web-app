import React, { useState, useContext } from "react";
import { blue } from "@material-ui/core/colors";
import { ReactReduxContext, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import MaterialTable from "material-table";
// import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
// import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
// import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MaterialTableComponent from "../../components/Table/MaterialTableComponent";
import {
  Container,
  Grid,
  Typography,
  Button,
  // Breadcrumbs,
  // Link,
  TextField,
} from "@material-ui/core";
import {
  updateComputerPrinter,
  listComputerPrinter,
  listRegisterHardware,
  insertComputerPrinter,
  deleteComputerPrinter,
} from "../../services/device.service";
import {
  getUserNameByProperty,
  listAllProperty,
} from "../../services/user.service";
import {
  listConfigMaster,
  // insertConfigMaster,
  // updateConfigMaster,
  // deleteConfigMaster,
} from "../../services/configmaster.service";

import { EDIT_CONFIGSTATE } from "../../middleware/action";
import { useNavigate } from "react-router-dom";
import MaterialBreadcrumbsComponent from "../../components/Breadcrumbs/MaterialBreadcrumbsComponent";
import MaterialButtonComponent from "../../components/Button/MaterialButtonComponent";

// Generate Order Data
function createData(
  id,
  username,
  computercode,
  action,
  devicecode,
  tray,
  remark,
  specialstrings,
  propertycode
) {
  return {
    id,
    username,
    computercode,
    action,
    devicecode,
    tray,
    remark,
    specialstrings,
    propertycode,
  };
}

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

export default function ComputerPrinter() {
  const navigate = useNavigate();
  const { store } = useContext(ReactReduxContext);
  const pageProperty = useSelector((state) => state.reducer.property);
  // const [data, setData] = React.useState([]);
  const [dialogAdd, setDialogAdd] = React.useState(false);
  const [dialogEdit, setDialogEdit] = React.useState(false);
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [errorMessageDu, setErrorMessageDu] = useState(false);
  const [errorParameterDu, setErrorParameterDu] = useState(null);
  const [usernames, setUsernames] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [computers, setComputers] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [listprinters, setPrintersCode] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const [actions, setActions] = useState([
    {
      key: "",
      label: "",
    },
  ]);

  const [trays, setTrays] = useState([
    {
      key: "",
      label: "",
    },
  ]);

  const [remarks, setRemarks] = useState([
    {
      key: "",
      label: "",
    },
  ]);
  const [properties, setProperties] = useState([
    {
      key: "",
      label: "",
    },
  ]);
  const [updateData, setUpdateData] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  React.useEffect(async () => {
    let propertydata = await listAllProperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        // if (tempproperty.filter((x) => x.label === element).length == 0) {
        tempproperty.push({
          key: element,
          label: element,
        });
        // }
      });
    setProperties(tempproperty);
    let data = await listComputerPrinter(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content.forEach((element) =>
      userdata.push(
        createData(
          element.id,
          element.username,
          element.computercode,
          element.action,
          element.devicecode,
          element.tray,
          element.remark,
          element.specialstrings,
          element.propertycode
        )
      )
    );
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
  }, []);

  const handleChangeProperty = async (selectProperty) => {
    let _userdata = await getUserNameByProperty(
      sessionStorage.getItem("auth"),
      selectProperty
    );
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    setUpdateData({ ...updateData, propertycode: selectProperty });
    setUsernames(_users);
  };
  const handleComponentState = async (comp) => {
    const comlower = comp.toLowerCase();
    navigate(`/${comlower}`);
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp,
    });
  };

  const handleDialogDeleteOpen = async (rowData) => {
    setUpdateData({
      computercode: rowData.computercode,
      devicecode: rowData.devicecode,
      id: rowData.id,
    });
    setDialogDelete(true);
  };

  const handleDialogDeleteClose = async () => {
    setDialogDelete(false);
  };

  const handleDialogAdd = async () => {
    let _userdata = await getUserNameByProperty(
      sessionStorage.getItem("auth"),
      pageProperty
    );
    // username, computercode, action, devicecode, tray, remark
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    let _data = await listRegisterHardware(sessionStorage.getItem("auth"));
    let _computers = [];
    let _listprinters = [];
    _data.content.forEach((element) => {
      if (element.type == "COMP") {
        if (_computers.filter((x) => x.value === element.code).length == 0) {
          _computers.push({
            value: element.code,
            label: element.name,
          });
        }
      } else if (element.type == "PRINT") {
        if (_listprinters.filter((x) => x.value === element.code).length == 0) {
          _listprinters.push({
            value: element.code,
            label: element.name,
          });
        }
      }
    });

    let _dataconfigmaster = await listConfigMaster(
      sessionStorage.getItem("auth")
    );
    let _actions = [];
    let _trays = [];
    let _remarks = [];

    _dataconfigmaster.content.forEach((element) => {
      if (element.name == "actions") {
        if (_actions.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _actions.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      } else if (element.name == "trays") {
        if (_trays.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _trays.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      } else if (element.name == "remarks") {
        if (_remarks.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _remarks.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      }
    });
    console.log(
      "_users,_computers,_listprinters,_actions,_trays,_remarks:",
      _users,
      _computers,
      _listprinters,
      _actions,
      _trays,
      _remarks
    );
    setUsernames(_users);
    setComputers(_computers);
    setPrintersCode(_listprinters);
    setActions(_actions);
    setTrays(_trays);
    setRemarks(_remarks);
    setUpdateData({
      propertycode: pageProperty,
      computercode: _computers[0].value,
      devicecode: _listprinters[0].value,
      // tray: trays[0].label,
      // username: usernames[0].label,
      // action: actions[0].label,
      // remark: remarks[0].label,
      tray: _trays[0].label,
      username: _users[0].label,
      action: _actions[0].label,
      remark: _remarks[0].label,
    });
    setErrorMessageDu(false);
    setDialogAdd(true);
  };

  const handleDialogEdit = async (rowData) => {
    let _rowData = JSON.parse(JSON.stringify(rowData));
    _rowData.tableData = undefined;
    console.log("handleDialogEdit", _rowData);
    let _userdata = await getUserNameByProperty(
      sessionStorage.getItem("auth"),
      rowData.propertycode
    );
    // username, computercode, action, devicecode, tray, remark
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    let _data = await listRegisterHardware(sessionStorage.getItem("auth"));
    let _computers = [];
    let _listprinters = [];
    _data.content.forEach((element) => {
      if (element.type == "COMP") {
        if (_computers.filter((x) => x.value === element.code).length == 0) {
          _computers.push({
            value: element.code,
            label: element.name,
          });
        }
      } else if (element.type == "PRINT") {
        if (_listprinters.filter((x) => x.value === element.code).length == 0) {
          _listprinters.push({
            value: element.code,
            label: element.name,
          });
        }
      }
    });

    let _dataconfigmaster = await listConfigMaster(
      sessionStorage.getItem("auth")
    );

    let _actions = [];
    let _trays = [];
    let _remarks = [];

    _dataconfigmaster.content.forEach((element) => {
      if (element.name == "actions") {
        if (_actions.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _actions.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      } else if (element.name == "trays") {
        if (_trays.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _trays.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      } else if (element.name == "remarks") {
        if (_remarks.filter((x) => x.key === element.config).length == 0) {
          let labeldata = element.config.split(",");
          for (let i = 0; i < labeldata.length; i++) {
            _remarks.push({
              key: i + 1,
              label: labeldata[i],
            });
          }
        }
      }
    });

    setUsernames(_users);
    setComputers(_computers);
    setPrintersCode(_listprinters);
    setActions(_actions);
    setTrays(_trays);
    setRemarks(_remarks);
    setUpdateData(_rowData);
    setErrorMessageDu(false);
    setDialogEdit(true);
  };

  const handleDialogEditClose = async () => {
    setDialogEdit(false);
  };

  const handleDialogAddClose = async () => {
    setDialogAdd(false);
  };

  const handleInsert = async () => {
    console.log(updateData);
    setErrorMessageDu(false);
    let _insertComputerPrinter = await insertComputerPrinter(
      sessionStorage.getItem("auth"),
      updateData
    );
    if (_insertComputerPrinter.status == "2000") {
      let data = await listComputerPrinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content.forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogAdd(false);
    } else if (_insertComputerPrinter.status == "1000") {
      setErrorMessageDu(true);
      setErrorParameterDu(_insertComputerPrinter.msg);
    }
  };

  const handleEdit = async (id) => {
    console.log(id, "handleEdit", updateData);
    let _updateComputerPrinter = await updateComputerPrinter(
      sessionStorage.getItem("auth"),
      id,
      updateData
    );
    setErrorMessageDu(false);
    if (_updateComputerPrinter.status == "2000") {
      let data = await listComputerPrinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content.forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogEdit(false);
    } else if (_updateComputerPrinter.status == "1000") {
      setErrorMessageDu(true);
      setErrorParameterDu(_updateComputerPrinter.msg);
    }
  };

  const handleDelete = async (id) => {
    let _deleteComputerPrinter = await deleteComputerPrinter(
      sessionStorage.getItem("auth"),
      id
    );
    if (_deleteComputerPrinter.status == "2000") {
      let data = await listComputerPrinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content.forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogDelete(false);
    }
  };

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   updatePageData(rows, newPage, rowsPerPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   setPage(0);
  //   updatePageData(rows, 0, event.target.value);
  // };

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
        colorlevel: "900",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "A200",
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

  return (
    <Container maxWidth="xl" style={themeState}>
      <React.Fragment>
        <Grid container style={{ padding: 20, marginTop: 22 }}>
          <Grid item style={{ flexGrow: 1 }}>
            <MaterialBreadcrumbsComponent
              Datacrumbs={[
                {
                  text: "Configuration",
                  handle: () => handleComponentState("Configuration"),
                },
                {
                  text: "System Configuration",
                  handle: () => {
                    "";
                  },
                },
                {
                  text: "Device Management",
                  handle: () => {
                    "";
                  },
                },
                {
                  text: "Computer-printer",
                  handle: () => {
                    "";
                  },
                },
              ]}
            />
          </Grid>

          <MaterialButtonComponent
            handleNewData={handleDialogAdd}
            handleNewText="New Setting"
          />
        </Grid>

        <div style={{ maxWidth: "100%" }}>
          <MaterialTableComponent
            placeHolder="Search by Property, Username, Computer Code, Action ,Device Code,Tray,Remark"
            title="Computer-printer"
            rows={rows}
            handleNewData={handleDialogAdd}
            handleEditData={handleDialogEdit}
            handleDialogDeleteOpen={handleDialogDeleteOpen}
            columns={[
              {
                title: "Property",
                field: "propertycode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Username",
                field: "username",
                headerStyle: headerTableStyle,
              },
              {
                title: "Computer Code",
                field: "computercode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Action",
                field: "action",
                headerStyle: headerTableStyle,
              },
              {
                title: "Device Code",
                field: "devicecode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Tray",
                field: "tray",
                headerStyle: headerTableStyle,
              },
              {
                title: "Remark",
                field: "remark",
                headerStyle: headerTableStyle,
              },
              {
                title: "Special Strings",
                field: "specialstrings",
                headerStyle: headerTableStyle,
              },
            ]}
          />
        </div>

        {/* ==================== Dialog New Device========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogAdd}
          onClose={handleDialogAddClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle
                id="form-dialog-title"
                style={{ backgroundColor: themeState.paper, color: mainColor }}
              >
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      New Device
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        select
                        className={classes.root}
                        id="outlined-basic"
                        label="Property"
                        variant="outlined"
                        defaultValue={properties[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) => handleChangeProperty(e.target.value)}
                      >
                        {properties.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Container>
              </DialogTitle>

              <DialogContent style={headerTableStyle}>
                {/* username, computercode, action, devicecode, tray, remark */}
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        defaultValue={usernames[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            username: e.target.value,
                          })
                        }
                      >
                        {usernames.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Computer Code"
                        variant="outlined"
                        defaultValue={computers[0].value}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            computercode: e.target.value,
                          })
                        }
                      >
                        {computers.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Action"
                        variant="outlined"
                        defaultValue={actions[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            action: e.target.value,
                          })
                        }
                      >
                        {actions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Printer Code"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        defaultValue={listprinters[0].value}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            devicecode: e.target.value,
                          })
                        }
                      >
                        {listprinters.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Tray"
                        variant="outlined"
                        defaultValue={trays[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, tray: e.target.value })
                        }
                      >
                        {trays.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Remark"
                        variant="outlined"
                        defaultValue={remarks[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            remark: e.target.value,
                          })
                        }
                      >
                        {remarks.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Special String"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            specialstrings: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                {errorMessage ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                    }}
                  >
                    {errorParameter} is required
                  </div>
                ) : null}
                {errorMessageDu ? (
                  <div style={{ marginTop: 15 }}>
                    <div
                      style={{
                        background: "#ff0033",
                        textAlign: "center",
                        color: "white",
                        height: "30px",
                        paddingTop: 5,
                      }}
                    >
                      {errorParameterDu}
                    </div>
                  </div>
                ) : null}
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions
            style={{
              padding: 20,
              backgroundColor: themeState.paper,
              color: themeState.color,
            }}
          >
            <Button
              onClick={handleDialogAddClose}
              variant="text"
              color="primary"
              style={{ color: mainColor }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "white",
                backgroundColor: mainColor,
              }}
              onClick={() => handleInsert()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* ==================== Dialog Edit Device ========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogEdit}
          onClose={handleDialogEditClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle id="form-dialog-title" style={headerTableStyle}>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      Edit Device
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Property"
                        variant="outlined"
                        defaultValue={updateData.propertycode}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) => handleChangeProperty(e.target.value)}
                      >
                        {properties.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Container>
              </DialogTitle>

              <DialogContent
                style={{
                  backgroundColor: themeState.paper,
                  color: mainColor,
                }}
              >
                {/* username, computercode, action, devicecode, tray, remark */}
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        defaultValue={updateData.username}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            username: e.target.value,
                          })
                        }
                      >
                        {usernames.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Computer Code"
                        variant="outlined"
                        defaultValue={updateData.computercode}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            computercode: e.target.value,
                          })
                        }
                      >
                        {computers.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Action"
                        variant="outlined"
                        defaultValue={updateData.action}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            action: e.target.value,
                          })
                        }
                      >
                        {actions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        select
                        id="outlined-basic"
                        label="Printer Code"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        defaultValue={updateData.devicecode}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            devicecode: e.target.value,
                          })
                        }
                      >
                        {listprinters.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Tray"
                        variant="outlined"
                        defaultValue={updateData.tray}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, tray: e.target.value })
                        }
                      >
                        {trays.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Remark"
                        variant="outlined"
                        defaultValue={updateData.remark}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            remark: e.target.value,
                          })
                        }
                      >
                        {remarks.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        id="outlined-basic"
                        label="Special String"
                        variant="outlined"
                        defaultValue={updateData.specialstrings}
                        fullWidth
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            specialstrings: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                {errorMessage ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                    }}
                  >
                    {errorParameter} is required
                  </div>
                ) : null}

                {errorMessageDu ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                      marginTop: 5,
                    }}
                  >
                    {errorParameterDu}
                  </div>
                ) : null}
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions
            style={{
              padding: 20,
              backgroundColor: themeState.paper,
              color: themeState.color,
            }}
          >
            <Button
              onClick={handleDialogEditClose}
              variant="text"
              color="primary"
              style={{ color: mainColor }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: themeState.color,
                backgroundColor: mainColor,
              }}
              onClick={() => handleEdit(updateData.id)}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
                Confirm Delete
              </DialogTitle>
              <DialogContent style={headerTableStyle}>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Computer Code:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {updateData.computercode}
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Device Code:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {updateData.devicecode}
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
                      onClick={() => handleDelete(updateData.id)}
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
      </React.Fragment>
    </Container>
  );
}
