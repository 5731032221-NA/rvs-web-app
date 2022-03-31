import React, { useState, useContext } from "react";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { ReactReduxContext, useSelector } from "react-redux";
// import MaterialTable from "material-table";
// import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
// import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Chip,
  // Breadcrumbs,
  // Link,
} from "@material-ui/core";

import { EDIT_CONFIGSTATE } from "../../middleware/action";
import {
  listRoom,
  postRoom,
  getRoombyid,
  updateRoom,
  deleteByRoomNumber,
} from "../../services/roomMaster.service";
import {
  listAllProperty,
  getConfigurationByPropertyCode,
  getUserComponentPermision,
} from "../../services/user.service";
import MaterialTableComponent from "../../components/Table/MaterialTableComponent";
import MaterialButtonComponent from "../../components/Button/MaterialButtonComponent";
import MaterialBreadcrumbsComponent from "../../components/Breadcrumbs/MaterialBreadcrumbsComponent";

// Generate Order Data
function createData(
  id,
  property,
  number,
  roomType,
  floor,
  building,
  desc,
  status,
  attribute
) {
  return {
    id,
    property,
    number,
    roomType,
    floor,
    building,
    desc,
    status,
    attribute,
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

export default function RoomManagement() {
  const navigate = useNavigate();
  const [CRUD, setCRUD] = useState({ C: true, R: true, U: true, D: false });
  const [dialogAddRoom, setDialogAddRoom] = React.useState(false);
  const [dialogEditRoom, setDialogEditRoom] = React.useState(false);
  const [dialogDeleteRoom, setDialogDeleteRoom] = React.useState(false);
  // const [attributeDialog, setAttributeDialog] = React.useState("Minibar");
  const [roomID, setRoomID] = React.useState("");
  const [propertyDialog, setPropertyDialog] = React.useState("");
  const [roomTypeDialog, setRoomTypeDialog] = React.useState("");
  const [buildingDialog, setBuildingDialog] = React.useState("");
  const [wingDialog, setWingDialog] = React.useState("");
  const [roomFloorDialog, setRoomFloorDialog] = React.useState("");
  const [exposureDialog, setExposureDialog] = React.useState("");
  const [roomSizeDialog, setRoomSizeDialog] = React.useState("");
  const [roomSegDialog, setRoomSegDialog] = React.useState("");
  const [roomStatusDialog, setRoomStatusDialog] = React.useState("");
  const [chipAttributeDialog, setChipAttributeDialog] = React.useState([]);
  const [roomNumber, setRoomNumber] = React.useState(null);
  const [roomDesc, setRoomDesc] = React.useState(null);
  const [roomFloor, setRoomFloor] = React.useState([]);
  const pageProperty = useSelector((state) => state.reducer.property);
  const [properties, setProperty] = React.useState([]);
  const [roomType, setRoomType] = React.useState([]);
  const [building, setBuilding] = React.useState([]);
  const [exposure, setExposure] = React.useState([]);
  const [roomSize, setRoomSize] = React.useState([]);
  const [roomSeg, setRoomSeg] = React.useState([]);
  const [roomStatus, setRoomStatus] = React.useState([]);
  const [attribute, setAttribute] = React.useState([]);
  const [wing, setWing] = React.useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorDuplicate, setErrorDuplicate] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  //Master Config
  const [rows, setRows] = useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { store } = useContext(ReactReduxContext);
  React.useEffect(() => {
    async function getData() {
      // let userComponentPermission = await getUserComponentPermision(
      //   sessionStorage.getItem("auth"),
      //   sessionStorage.getItem("username"),
      //   "CF-RM"
      // );
      // console.log("userComponentPermission ||", userComponentPermission);
      // setCRUD({
      //   C: userComponentPermission.content[0].permissioncreate,
      //   R: userComponentPermission.content[0].permissionread,
      //   U: userComponentPermission.content[0].permissionupdate,
      //   D: userComponentPermission.content[0].permissiondelete,
      // });
      const data = await listRoom(sessionStorage.getItem("auth"));
      console.log("data ==>", data);
      let roomdata = [];
      let i = 0;
      if (data.content.length != 0) {
        data.content.forEach((element) =>
          roomdata.push(
            createData(
              element.id,
              element.propertycode,
              element.no,
              element.type,
              element.floor,
              element.building,
              element.description,
              element.status,
              element.attribute
            )
          )
        );
      }
      console.log("a", roomdata);
      setRows(roomdata);
      updatePageData(roomdata, page, rowsPerPage);
    }
    getData();
  }, []);

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    console.log("rowsdata", rowsdata);
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  // const handleChangePage = (event, newPage) => {
  //   console.log(event, newPage);
  //   setPage(newPage);
  //   updatePageData(rows, newPage, rowsPerPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   setPage(0);
  //   updatePageData(rows, 0, event.target.value);
  // };

  // const handleAttributeDialog = (event) => {
  //   setChipAttributeDialog(event.target.value);
  // };

  const handleRoomNumber = (event) => {
    setRoomNumber(event.target.value);
  };
  const handleDescription = (event) => {
    setRoomDesc(event.target.value);
  };

  const handlePropertyDialog = async (event) => {
    let getconfigdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      event.target.value
    );
    console.log("getConfigurationByPropertyCode", getconfigdata);
    let configdata = getconfigdata.content[getconfigdata.content.length - 1];
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");
    let listFloor = await getlist(configdata, "Floor");
    let listattribute = await getlist(configdata, "Attribute");
    setChipAttributeDialog([]);
    setAttribute(listattribute);
    setRoomFloor(listFloor);
    setWing(listWing);
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);
    setPropertyDialog(event.target.value);
  };
  const handleRoomTypeDialog = (event) => {
    setRoomTypeDialog(event.target.value);
  };
  const handleBuildingDialog = (event) => {
    setBuildingDialog(event.target.value);
  };
  const handleWingDialog = (event) => {
    setWingDialog(event.target.value);
  };
  const handleExposureDialog = (event) => {
    setExposureDialog(event.target.value);
  };
  const handleRoomSizeDialog = (event) => {
    setRoomSizeDialog(event.target.value);
  };
  const handleRoomFloorDialog = (event) => {
    setRoomFloorDialog(event.target.value);
  };
  const handleRoomSegDialog = (event) => {
    setRoomSegDialog(event.target.value);
  };
  const handleRoomStatusDialog = (event) => {
    setRoomStatusDialog(event.target.value);
  };

  async function getlist(config, field) {
    for (var i = 0; i < config.length; i++) {
      var obj = config[i];
      if (obj.name_en === field) {
        let list = [];
        obj.children.forEach((element) =>
          list.push({
            value: element.name_en,
            label: element.name_en,
          })
        );
        return list;
      } else if (obj.children) {
        let _getlist = await getlist(obj.children, field);
        if (_getlist) return _getlist;
      }
    }
  }

  const handleDialogAddRoom = async () => {
    let propertydata = await listAllProperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        if (tempproperty.filter((x) => x.label === element).length == 0) {
          tempproperty.push({
            value: element,
            label: element,
          });
        }
      });
    let getconfigdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      pageProperty
    );
    let configdata = getconfigdata.content;
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");
    let listFloor = await getlist(configdata, "Floor");
    let listattribute = await getlist(configdata, "Attribute");
    setChipAttributeDialog([]);
    setAttribute(listattribute);
    setRoomFloor(listFloor);
    setProperty(tempproperty);
    setWing(listWing);
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);

    setPropertyDialog(pageProperty);
    setRoomFloorDialog(listFloor[0].value);
    setRoomTypeDialog(listroomtype[0].value);
    setBuildingDialog(listBuilding[0].value);
    setWingDialog(listWing[0].value);
    setExposureDialog(listExposure[0].value);
    setRoomSizeDialog(listRoomSize[0].value);
    setRoomSegDialog(listRoomSeg[0].value);
    setRoomStatusDialog(listRoomStatus[0].value);

    setErrorDuplicate(false);
    setErrorMessage(false);
    setDialogAddRoom(true);
  };

  const handleDialogAddRoomClose = () => {
    setDialogAddRoom(false);
  };

  const handleComponentState = async (comp) => {
    const comlower = comp.toLowerCase();
    navigate(`/${comlower}`);
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp,
    });
  };

  const handleDialogEditRoom = async (roomNo) => {
    console.log("roomNo", roomNo);
    let propertydata = await listAllProperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        if (tempproperty.filter((x) => x.label === element).length == 0) {
          tempproperty.push({
            value: element,
            label: element,
          });
        }
      });
    console.log("tempproperty", tempproperty);

    const dataRoombyid = await getRoombyid(
      sessionStorage.getItem("auth"),
      roomNo.number
    );
    console.log("dataRoombyid", dataRoombyid);

    let getconfigdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      dataRoombyid.content.propertycode
    );
    console.log("getconfigdata", getconfigdata);

    let configdata = getconfigdata.content;
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");
    let listFloor = await getlist(configdata, "Floor");
    let listattribute = await getlist(configdata, "Attribute");

    setChipAttributeDialog([]);
    setAttribute(listattribute);
    setRoomFloor(listFloor);
    setProperty(tempproperty);
    setWing(listWing);
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);

    setRoomID(dataRoombyid.content[0].id);
    setPropertyDialog(dataRoombyid.content[0].propertycode);
    setRoomTypeDialog(dataRoombyid.content[0].type);
    setBuildingDialog(dataRoombyid.content[0].building);
    setWingDialog(dataRoombyid.content[0].wing);
    setExposureDialog(dataRoombyid.content[0].exposure);
    setRoomSizeDialog(dataRoombyid.content[0].sqsize);
    setRoomSegDialog(dataRoombyid.content[0].seq);
    setRoomStatusDialog(dataRoombyid.content[0].status);
    setRoomNumber(dataRoombyid.content[0].no);
    setRoomDesc(dataRoombyid.content[0].description);
    setRoomFloorDialog(dataRoombyid.content[0].floor);
    const roomDataEdit = dataRoombyid.content[0].attribute;
    var tempRoom = roomDataEdit.split(",");
    for (let i in listattribute) {
      if (tempRoom.includes(listattribute[i].value)) {
        setChipAttributeDialog((prevState) => [
          ...prevState,
          { key: listattribute[i].value, label: listattribute[i].label },
        ]);
      }
    }

    setErrorDuplicate(false);
    setErrorMessage(false);
    setDialogEditRoom(true);
  };

  const handleDialogEditRoomSave = async (
    roomNo,
    propertyDialog,
    roomTypeDialog,
    buildingDialog,
    wingDialog,
    exposureDialog,
    roomSizeDialog,
    roomSegDialog,
    roomStatusDialog,
    chipAttributeDialog,
    roomDesc,
    roomFloorDialog
  ) => {
    console.log(chipAttributeDialog);
    console.log(`
      roomNo : ${roomNo},
      propertyDialog : ${propertyDialog},
      roomTypeDialog : ${roomTypeDialog},
      buildingDialog : ${buildingDialog},
      wingDialog : ${wingDialog},
      exposureDialog : ${exposureDialog},
      roomSizeDialog : ${roomSizeDialog},
      roomSegDialog : ${roomSegDialog},
      roomStatusDialog : ${roomStatusDialog},
      chipAttributeDialog : ${chipAttributeDialog},
      roomDesc : ${roomDesc},
      roomFloor : ${roomFloorDialog}`);
    if (roomNo == null || roomNo == "") {
      setErrorMessage(true);
      setErrorParameter("Room Number");
    }
    // else if (roomFloor == null || roomFloor == '') { setErrorMessage(true); setErrorParameter("Floor"); }
    else {
      setErrorMessage(false);
      const AttributeTemp = new Set();
      if (chipAttributeDialog.length) {
        for (var A in chipAttributeDialog) {
          AttributeTemp.add(chipAttributeDialog[A].key);
        }
      }
      const attributeTempArray = Array.from(AttributeTemp).join(",");

      const dataRoombyid = await updateRoom(
        sessionStorage.getItem("auth"),
        roomID,
        {
          roomNo: roomNo,
          propertyDialog: propertyDialog,
          roomTypeDialog: roomTypeDialog,
          buildingDialog: buildingDialog,
          wingDialog: wingDialog,
          exposureDialog: exposureDialog,
          roomSizeDialog: roomSizeDialog,
          roomSegDialog: roomSegDialog,
          roomStatusDialog: roomStatusDialog,
          chipAttributeDialog: attributeTempArray,
          roomDesc: roomDesc,
          roomFloor: roomFloorDialog,
        }
      );
      console.log("dataRoombyid", dataRoombyid);
      if (dataRoombyid.status == "1000") {
        setErrorDuplicate(true);
      } else if (dataRoombyid.status == "2000") {
        const data = await listRoom(sessionStorage.getItem("auth"));
        console.log("data", data);
        let roomdata = [];
        let i = 0;
        data.content.forEach((element) =>
          roomdata.push(
            createData(
              element.id,
              element.propertycode,
              element.no,
              element.type,
              element.floor,
              element.building,
              element.description,
              element.status,
              element.attribute
            )
          )
        );
        console.log("a", roomdata);
        setRows(roomdata);
        updatePageData(roomdata, page, rowsPerPage);
        setDialogEditRoom(false);
      }
    }
  };

  const handleDialogEditRoomClose = () => {
    setDialogEditRoom(false);
  };

  const handleSelectAttribute = (event, key) => {
    console.log(event);
    console.log(key.props);
    const temp = new Set();

    if (chipAttributeDialog.length) {
      for (var i in chipAttributeDialog) {
        temp.add(chipAttributeDialog[i].label);
      }
      if (temp.has(event.target.value)) {
        // console.log("had value");
      } else {
        setChipAttributeDialog([
          ...chipAttributeDialog,
          { key: key.props.name, label: event.target.value },
        ]);
      }
    } else {
      setChipAttributeDialog([
        ...chipAttributeDialog,
        { key: key.props.name, label: event.target.value },
      ]);
    }
  };
  const handleDeleteAttribute = (chipToDelete) => () => {
    setChipAttributeDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

  const handleDialogInsert = async (
    roomNo,
    propertyDialog,
    roomTypeDialog,
    buildingDialog,
    wingDialog,
    exposureDialog,
    roomSizeDialog,
    roomSegDialog,
    roomStatusDialog,
    chipAttributeDialog,
    roomDesc,
    roomFloorDialog
  ) => {
    console.log(`
    ================= Insert ================
      roomNo : ${roomNo},
      propertyDialog : ${propertyDialog},
      roomTypeDialog : ${roomTypeDialog},
      buildingDialog : ${buildingDialog},
      wingDialog : ${wingDialog},
      exposureDialog : ${exposureDialog},
      roomSizeDialog : ${roomSizeDialog},
      roomSegDialog : ${roomSegDialog},
      roomStatusDialog : ${roomStatusDialog},
      chipAttributeDialog : ${chipAttributeDialog},
      roomDesc : ${roomDesc},
      roomFloor : ${roomFloorDialog}`);
    if (roomNo == null || roomNo == "") {
      setErrorMessage(true);
      setErrorParameter("Room Number");
    }
    // else if (roomFloor == null || roomFloor == '') { setErrorMessage(true); setErrorParameter("Floor"); }
    else {
      setErrorMessage(false);
      const AttributeTemp = new Set();
      if (chipAttributeDialog.length) {
        for (var A in chipAttributeDialog) {
          AttributeTemp.add(chipAttributeDialog[A].key);
        }
      }
      const attributeTempArray = Array.from(AttributeTemp).join(",");

      const postData = await postRoom(sessionStorage.getItem("auth"), {
        roomNo: roomNo,
        propertyDialog: propertyDialog,
        roomTypeDialog: roomTypeDialog,
        buildingDialog: buildingDialog,
        wingDialog: wingDialog,
        exposureDialog: exposureDialog,
        roomSizeDialog: roomSizeDialog,
        roomSegDialog: roomSegDialog,
        roomStatusDialog: roomStatusDialog,
        chipAttributeDialog: attributeTempArray,
        roomDesc: roomDesc,
        roomFloor: roomFloorDialog,
      });
      console.log("postData", postData);

      if (postData.status == "1000") {
        setErrorDuplicate(true);
      } else if (postData.status == "2000") {
        const data = await listRoom(sessionStorage.getItem("auth"));
        console.log("data", data);
        let roomdata = [];
        let i = 0;
        data.content.forEach((element) =>
          roomdata.push(
            createData(
              element.id,
              element.propertycode,
              element.no,
              element.type,
              element.floor,
              element.building,
              element.description,
              element.status,
              element.attribute
            )
          )
        );
        console.log("a", roomdata);
        setRows(roomdata);
        updatePageData(roomdata, page, rowsPerPage);

        setDialogAddRoom(false);
      }
    }
  };

  const handleDialogDeleteRoomClose = () => {
    setDialogDeleteRoom(false);
  };

  const handleDialogDeleteRoomOpen = async (roomNum) => {
    console.log("roomNum.number", roomNum.number);
    setRoomNumber(roomNum.number);
    setDialogDeleteRoom(true);
  };

  const handleDialogDelete = async (roomNum) => {
    console.log("roomNum for delete : ", roomNum);

    const roomDelete = await deleteByRoomNumber(
      sessionStorage.getItem("auth"),
      roomNum
    );
    console.log("roomDelete func:", roomDelete);

    const data = await listRoom(sessionStorage.getItem("auth"));
    console.log("data Room", data);
    let roomdata = [];
    let i = 0;
    data.content.forEach((element) =>
      roomdata.push(
        createData(
          element.id,
          element.propertycode,
          element.no,
          element.type,
          element.floor,
          element.building,
          element.description,
          element.status,
          element.attribute
        )
      )
    );
    console.log("a", roomdata);
    setRows(roomdata);
    updatePageData(roomdata, page, rowsPerPage);

    setDialogDeleteRoom(false);
  };

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
                  text: "PMS Configuration",
                  handle: () => {
                    "";
                  },
                },
                {
                  text: "Room Configuration",
                  handle: () => {
                    "";
                  },
                },
                {
                  text: "Room Master Maintenance",
                  handle: () => {
                    "";
                  },
                },
              ]}
            />
          </Grid>

          {CRUD.C ? (
            <MaterialButtonComponent
              handleNewData={handleDialogAddRoom}
              handleNewText="NEW ROOM MASTER"
            />
          ) : null}

          {/* ==================== Dialog New Room========================= */}
          <Dialog
            fullWidth="true"
            maxWidth="sm"
            open={dialogAddRoom}
            onClose={handleDialogAddRoomClose}
            aria-labelledby="form-dialog-title"
            className={classes.root}
          >
            <DialogTitle
              id="form-dialog-title"
              style={{
                backgroundColor: themeState.paper,
                color: mainColor,
              }}
            >
              New Room Master
            </DialogTitle>

            <DialogContent style={headerTableStyle}>
              <Container maxWidth="xl" disableGutters>
                <Grid container>
                  <TextField
                    autoFocus
                    select
                    className={classes.root}
                    // id="outlined-basic"
                    label="Property"
                    variant="outlined"
                    defaultValue={pageProperty}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    value={propertyDialog}
                    onChange={(event) => handlePropertyDialog(event)}
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
                <Grid container spacing={2} style={{ paddingTop: 10 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Room Number"
                      variant="outlined"
                      // value={roomNumber}
                      defaultValue={""}
                      onChange={(e) => handleRoomNumber(e)}
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Room Type"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      // value={roomTypeDialog}
                      defaultValue={""}
                      onChange={(e) => handleRoomTypeDialog(e)}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {roomType.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 15 }}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Floor"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      // value={buildingDialog}
                      defaultValue={""}
                      onChange={(e) => handleRoomFloorDialog(e)}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {roomFloor.map((option) => (
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
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Building"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      // value={buildingDialog}
                      defaultValue={""}
                      onChange={(e) => handleBuildingDialog(e)}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {building.map((option) => (
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
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Wing"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      // value={wingDialog}
                      defaultValue={""}
                      onChange={(e) => handleWingDialog(e)}
                    >
                      {wing.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 5 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Exposure"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      // value={exposureDialog}
                      defaultValue={""}
                      onChange={(e) => handleExposureDialog(e)}
                    >
                      {exposure.map((option) => (
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
                      label="Room Size"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      // value={roomSizeDialog}
                      defaultValue={""}
                      onChange={(e) => handleRoomSizeDialog(e)}
                    >
                      {roomSize.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 5 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Room Seg"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      // value={roomSegDialog}
                      defaultValue={""}
                      onChange={(e) => handleRoomSegDialog(e)}
                    >
                      {roomSeg.map((option) => (
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
                      label="Room Status"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      // value={roomStatusDialog}
                      defaultValue={""}
                      onChange={(e) => handleRoomStatusDialog(e)}
                    >
                      {roomStatus.map((option) => (
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <TextField
                    className={classes.root}
                    fullWidth
                    variant="outlined"
                    selectSelectProps={{
                      native: true,
                    }}
                    style={{
                      marginTop: 10,
                      backgroundColor: themeState.paper,
                      color: themeState.color,
                    }}
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    label="Attribute"
                    select
                    // value={" "}
                    defaultValue={""}
                    onChange={(event, key) => handleSelectAttribute(event, key)}
                  >
                    {attribute.map((option) => (
                      <MenuItem
                        className={classes.root}
                        label={option.label}
                        name={option.label}
                        value={option.label}
                        style={headerTableStyle}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {chipAttributeDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteAttribute(data)}
                      />
                    );
                  })}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ paddingTop: 10 }}
                >
                  <TextField
                    className={classes.root}
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    defaultValue={""}
                    onChange={(e) => handleDescription(e)}
                  />
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
              {errorDuplicate ? (
                <div
                  style={{
                    background: "#ff0033",
                    textAlign: "center",
                    color: "white",
                    height: "30px",
                    paddingTop: 5,
                  }}
                >
                  Duplicate Room Number
                </div>
              ) : null}
            </DialogContent>
            <DialogActions
              style={{
                padding: 20,
                backgroundColor: themeState.paper,
                color: themeState.color,
              }}
            >
              <Button
                onClick={handleDialogAddRoomClose}
                variant="text"
                style={{ color: mainColor }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleDialogInsert(
                    roomNumber,
                    propertyDialog,
                    roomTypeDialog,
                    buildingDialog,
                    wingDialog,
                    exposureDialog,
                    roomSizeDialog,
                    roomSegDialog,
                    roomStatusDialog,
                    chipAttributeDialog,
                    roomDesc,
                    roomFloorDialog
                  )
                }
                style={{
                  // color: themeState.color,
                  color: "white",
                  backgroundColor: mainColor,
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* ---------------------------------------- */}
          {/* ==================== Dialog Edit Room ========================= */}
          <Dialog
            className={classes.root}
            fullWidth="true"
            maxWidth="sm"
            open={dialogEditRoom}
            onClose={handleDialogEditRoomClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{
                backgroundColor: themeState.paper,
                color: mainColor,
              }}
            >
              Edit Room Master
            </DialogTitle>

            <DialogContent style={headerTableStyle}>
              <Container maxWidth="xl" disableGutters>
                <Grid container>
                  <TextField
                    className={classes.root}
                    select
                    id="outlined-basic"
                    label="Property"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    defaultValue={propertyDialog}
                    onChange={(event) => handlePropertyDialog(event)}
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
                <Grid container spacing={2} style={{ paddingTop: 10 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Room Number"
                      variant="outlined"
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      fullWidth
                      value={roomNumber}
                      onChange={(e) => handleRoomNumber(e)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Room Type"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={roomTypeDialog}
                      onChange={(e) => handleRoomTypeDialog(e)}
                    >
                      {roomType.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 15 }}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="roomFloor"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={roomFloorDialog}
                      onChange={(e) => handleRoomFloorDialog(e)}
                    >
                      {roomFloor.map((option) => (
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
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Building"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={buildingDialog}
                      onChange={(e) => handleBuildingDialog(e)}
                    >
                      {building.map((option) => (
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
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Wing"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={wingDialog}
                      onChange={(e) => handleWingDialog(e)}
                    >
                      {wing.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 5 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Exposure"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={exposureDialog}
                      onChange={(e) => handleExposureDialog(e)}
                    >
                      {exposure.map((option) => (
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
                      label="Room Size"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={roomSizeDialog}
                      onChange={(e) => handleRoomSizeDialog(e)}
                    >
                      {roomSize.map((option) => (
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
                <Grid container spacing={2} style={{ paddingTop: 5 }}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      className={classes.root}
                      select
                      id="outlined-basic"
                      label="Room Seg"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={roomSegDialog}
                      onChange={(e) => handleRoomSegDialog(e)}
                    >
                      {roomSeg.map((option) => (
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
                      label="Room Status"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      value={roomStatusDialog}
                      onChange={(e) => handleRoomStatusDialog(e)}
                    >
                      {roomStatus.map((option) => (
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ paddingTop: 10 }}
                >
                  <TextField
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    label="Attribute"
                    select
                    value={chipAttributeDialog}
                    onChange={(event, key) => handleSelectAttribute(event, key)}
                  >
                    {attribute.map((option) => (
                      <option
                        className={classes.root}
                        label={option.label}
                        name={option.label}
                        value={option.label}
                        style={headerTableStyle}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {chipAttributeDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteAttribute(data)}
                      />
                    );
                  })}
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ paddingTop: 10 }}
                >
                  <TextField
                    className={classes.root}
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={roomDesc}
                    onChange={(e) => handleDescription(e)}
                  />
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
              {errorDuplicate ? (
                <div
                  style={{
                    background: "#ff0033",
                    textAlign: "center",
                    color: "white",
                    height: "30px",
                    paddingTop: 5,
                  }}
                >
                  Duplicate Room Number
                </div>
              ) : null}
            </DialogContent>
            <DialogActions
              style={{
                padding: 20,
                backgroundColor: themeState.paper,
                color: themeState.color,
              }}
            >
              <Button
                onClick={handleDialogEditRoomClose}
                variant="text"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  handleDialogEditRoomSave(
                    roomNumber,
                    propertyDialog,
                    roomTypeDialog,
                    buildingDialog,
                    wingDialog,
                    exposureDialog,
                    roomSizeDialog,
                    roomSegDialog,
                    roomStatusDialog,
                    chipAttributeDialog,
                    roomDesc,
                    roomFloorDialog
                  )
                }
                variant="contained"
                style={{
                  color: themeState.background,
                  backgroundColor: blue[themeState.colorlevel],
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* -------------------------------------- */}

          {/* ==================== Dialog Delete User========================= */}
          <Dialog
            maxWidth="sm"
            open={dialogDeleteRoom}
            onClose={handleDialogDeleteRoomClose}
            aria-labelledby="form-dialog-title"
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DialogTitle
                  id="form-dialog-title"
                  style={{
                    backgroundColor: themeState.paper,
                    color: blue[themeState.colorlevel],
                  }}
                >
                  Confirm Delete Room Information
                </DialogTitle>
                <DialogContent style={headerTableStyle}>
                  <Typography>
                    <Typography
                      color="initial"
                      style={{ fontWeight: 600 }}
                      display="inline"
                    >
                      Room Number:&nbsp;
                    </Typography>
                    <Typography color="initial" display="inline">
                      {roomNumber}
                    </Typography>
                  </Typography>
                </DialogContent>
                <DialogActions
                  style={{
                    padding: 20,
                    backgroundColor: themeState.paper,
                    color: themeState.color,
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
                        onClick={handleDialogDeleteRoomClose}
                        variant="contained"
                        color="default"
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item sm={6} md={6} lg={6} xl={6}>
                      <Button
                        fullWidth
                        onClick={() => handleDialogDelete(roomNumber)}
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
          {/* ---------------------------------------- */}
        </Grid>
      </React.Fragment>
      {CRUD.R ? (
        <MaterialTableComponent
          placeHolder="Search by Property, Number, Room Type, Floor, Building,Desc Attribute"
          title="Room Master"
          rows={rows}
          handleNewData={handleDialogAddRoom}
          handleEditData={handleDialogEditRoom}
          handleDialogDeleteOpen={handleDialogDeleteRoomOpen}
          columns={[
            {
              title: "Property",
              field: "property",
              headerStyle: headerTableStyle,
            },
            {
              title: "#Number",
              field: "number",
              headerStyle: headerTableStyle,
            },
            {
              title: "Room Type",
              field: "roomType",
              headerStyle: headerTableStyle,
            },
            {
              title: "Floor",
              field: "floor",
              headerStyle: headerTableStyle,
            },
            {
              title: "Building",
              field: "building",
              headerStyle: headerTableStyle,
            },
            {
              title: "Desc",
              field: "desc",
              headerStyle: headerTableStyle,
            },
            {
              title: "Status",
              field: "status",
              headerStyle: headerTableStyle,
            },
            {
              title: "Attribute",
              field: "attribute",
              headerStyle: headerTableStyle,
            },
          ]}
        />
      ) : null}
    </Container>
  );
}
