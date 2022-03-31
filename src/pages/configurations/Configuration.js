import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs } from "@material-ui/core";
import { ReactReduxContext, useSelector } from "react-redux";
import { blue } from "@material-ui/core/colors";
import TreeView from "@material-ui/lab/TreeView";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import TreeItem from "@material-ui/lab/TreeItem";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Https";

import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";
import RoomManagement from "./RoomManagement";
import DeviceManager from "./DeviceManager";
import ComputerPrinter from "./ComputerPrinter";
import { EDIT_CONFIGSTATE } from "../../middleware/action";
import {
  updateConfiguration,
  getConfigurationByPropertyCode,
} from "../../services/user.service";

const useStyles = makeStyles({
  root: (themeState) => ({
    flexGrow: 1,
    justifyContent: "center",
    justifySelf: "center",
    justifyItems: "center",
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
  }),
  selectPage: {
    minWidth: 90,
    textAlign: "center",
  },
});

export default function Configuration() {
  const navigate = useNavigate();
  const { store } = useContext(ReactReduxContext);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [addChild, setAddchild] = React.useState(null);
  const [dialogAdd, setDialogAdd] = React.useState(false);
  const [dialogEdit, setDialogEdit] = React.useState(false);
  const [languageDialog, setLanguageDialog] = React.useState("EN");
  const [addChildid, setAddChuldid] = React.useState(null);
  const [addChildName, setAddChuldName] = React.useState("");
  const [addChildNameLang, setAddChuldNameLang] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [addChildValue, setAddChuldValue] = React.useState("");
  const [page, setPage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [errorParameter, setErrorParameter] = React.useState(null);
  const [errorMessageDu, setErrorMessageDu] = React.useState(false);
  const [errorParameterDu, setErrorParameterDu] = React.useState(null);

  // const [row, setRow] = React.useState(null);
  // const testa = "testa2";

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

  const updateProperty = useSelector((state) => state.reducer.property);
  const [property, setProperty] = React.useState(updateProperty);

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
  const classes = useStyles(themeState);

  React.useEffect(async () => {
    console.log("useEffect");
    let configdata = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      updateProperty
    );
    setData(configdata.content);
    setProperty((prev) => updateProperty);
  }, [updateProperty]);

  const configState = useSelector((state) => state.reducer.configState);
  const lang = useSelector((state) => state.reducer.lang);
  const handleLanguageDialog = (event) => {
    setLanguageDialog(event.target.value);
  };

  const handleClick = (event, name, id) => {
    // console.log(event)
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    setAddChuldid(id);
    setAddChuldName(name);
    setAddchild(event.target);
  };

  const handleClose = () => {
    setAddchild(false);
  };
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleDialogAdd = (event) => {
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    // setAddChuldid(event.target.id.split("-")[0]);
    // setAddChuldName(event.target.id.split("-")[1]);
    // setAddchild(null);

    setAddChuldValue("");
    setDescription("");
    setCode("");
    setErrorMessageDu(false);
    setErrorMessage(false);
    setAddchild(false);
    setDialogAdd(true);
  };

  const handleDialogEdit = (name, id, node) => {
    // console.log("debug",name,id)
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    // setAddChuldid(event.target.id.split("-")[0]);
    // setAddChuldName(event.target.id.split("-")[1]);
    // setAddchild(null);
    setErrorMessage(false);
    setAddChuldid(id);
    setAddChuldValue(name);
    setCode(node.code);
    setDescription(node.description);
    setAddChuldNameLang(node["name_" + lang]);
    setErrorMessageDu(false);
    // setRow(node)
    setDialogEdit(true);
  };

  const handleDialogEditLang = (name, namelang, id) => {
    setErrorMessage(false);
    setAddChuldid(id);
    setAddChuldName(name);
    setAddChuldNameLang(namelang);
    setDialogEdit(true);
  };

  const handleDialogAddClose = () => {
    setDialogAdd(false);
  };

  const handleDialogEditClose = () => {
    setDialogEdit(false);
  };

  // const handleChangeAdd = (event) => {
  //   setAddChuldValue(event.target.value);
  // };

  const handleChangeValue = (event) => {
    setAddChuldValue(event.target.value);
  };
  const handleChangeLang = (event) => {
    setAddChuldNameLang(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleConfig = async (name) => {
    if (name == "ROLE") {
      navigate(`/roleManagement`);
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "RoleManagement",
      });
    } else if (name == "USER") {
      navigate(`/userManagement`);
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "UserManagement",
      });
    } else if (name == "ROOM") {
      navigate(`/roomManagement`);
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "RoomManagement",
      });
    } else if (name == "DEVICE") {
      navigate(`/deviceManager`);
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "DeviceManager",
      });
    } else if (name == "COMPRT") {
      navigate(`/computerPrinter`);

      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "ComputerPrinter",
      });
    }
  };

  async function prune(array, label) {
    console.log("pr");
    console.log(array);
    console.log(array.length);
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label);
      if (obj.RefNo === label) {
        // splice out 1 element starting at position i
        array.splice(i, 1);
        return true;
      } else if (obj.children) {
        prune(obj.children, label);
      }
    }
  }

  const handleDelete = async (id) => {
    console.log("deleteid", id);
    await prune(data, id);
    let updateConfig = await updateConfiguration(
      sessionStorage.getItem("auth"),
      { configuration: data, propertycode: property }
    );
  };

  const maxChildID = async (array, parentid) => {
    let max = 0;
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      let num = parseInt(obj.RefNo.replace(parentid + ".", ""));
      console.log("cc", max, num);
      if (num > max) max = num;
    }
    return max;
  };

  const runningID = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label);
      if (obj.RefNo === label) {
        if (obj.children) {
          let newmaxid = await maxChildID(obj.children, obj.RefNo);
          return obj.RefNo + "." + (newmaxid + 1);
        } else {
          console.log("label", label);
          console.log("labelid", label + ".1");
          return label + ".1";
        }
      } else if (obj.children) {
        let a = await runningID(obj.children, label);
        if (a != undefined) return a;
      }
    }
  };

  const adding = async (array, label, name, newid) => {
    // console.log("array:",array);
    // console.log(" label:", label);
    // console.log(" name:", name);
    // console.log("newid:", newid);
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      // console.log("refNo:::",obj.RefNo, label,obj.children,obj.createdate);

      if (obj.RefNo === label) {
        let currentdate = new Date();
        let day = ("0" + currentdate.getDate()).slice(-2);
        let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
        let year = currentdate.getFullYear();
        let hours = currentdate.getHours();
        let minutes = currentdate.getMinutes();
        let seconds = currentdate.getSeconds();

        if (obj.children) {
          console.log("11:");
          let isreadydata = null;
          for (let c = 0; c < obj.children.length; c++) {
            console.log("22:");
            console.log("obj.children[c].code:", obj.children[c].code, code);
            console.log(
              "obj.children[c].name_en:",
              obj.children[c].name_en,
              name
            );

            if (obj.children[c].code === code) {
              console.log("obj.children[c].code:", obj.children[c].code);
              //  setErrorParameter(`Dupicate ${obj.children[c].code}` );
              isreadydata = obj.children[c].code;
            }
            if (obj.children[c].name_en === name) {
              isreadydata = obj.children[c].name_en;
            }
          }

          if (!isreadydata) {
            console.log("33:");
            obj.children = [
              ...obj.children,
              {
                RefNo: newid,
                code: code,
                name_en: name,
                description: description,
                createdate:
                  year +
                  "-" +
                  month +
                  "-" +
                  day +
                  " " +
                  hours +
                  ":" +
                  minutes +
                  ":" +
                  seconds,
                master: false,
                addchild: true,
              },
            ];
          }
        } else {
          console.log("44:");
          //   let isreadydata = null;
          //   for (let c = 0; c < obj.children.length; c++) {
          //      if( obj.children[c].code === name){
          //          console.log("obj.children[c].code:",obj.children[c].code);
          //         //  setErrorParameter(`Dupicate ${obj.children[c].code}` );
          //         isreadydata = obj.children[c].code;
          //      }
          //       if(obj.children[c].name_en === label){
          //       isreadydata = obj.children[c].name_en;
          //      }
          //   }
          //   if(!isreadydata){
          //   obj.children = [
          //     {
          //       RefNo: newid,
          //       code: code,
          //       name_en: name,
          //       description: description,
          //       createdate:
          //         year +
          //         "-" +
          //         month +
          //         "-" +
          //         day +
          //         " " +
          //         hours +
          //         ":" +
          //         minutes +
          //         ":" +
          //         seconds,
          //       master: false,
          //       addchild: false,
          //     },
          //   ];
          //  }

          obj.children = [
            {
              RefNo: newid,
              code: code,
              name_en: name,
              description: description,
              createdate:
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds,
              master: false,
              addchild: true,
            },
          ];
        }
      } else if (obj.children) {
        adding(obj.children, label, name, newid);
      }
    }
  };

  const handleAdd = async () => {
    setErrorMessageDu(false);
    if (code == null || code == "") {
      setErrorMessage(true);
      setErrorParameter("Code");
    } else if (addChildValue == null || addChildValue == "") {
      setErrorMessage(true);
      setErrorParameter("Name (EN)");
    } else if (description == null || description == "") {
      setErrorMessage(true);
      setErrorParameter("Description");
    } else {
      //   let id = addChildid;
      //   console.log("addparentid", id);
      //   let newid = await runningID(data, id);
      //   console.log("newid", newid);
      //   await adding(data, id, addChildValue, newid);
      //   console.log("added", data);

      // if(errorParameter !== null){
      //   setErrorMessage(true);

      // }else{
      //   setErrorMessage(false);
      //   let updateConfig = await updateConfiguration(
      //     sessionStorage.getItem("auth"),
      //     { configuration: data, propertycode: property }
      //   );
      //   // setData(data)
      //   setDialogAdd(false);
      // }

      let id = addChildid;
      console.log("addparentid", id);
      let newid = await runningID(data, id);
      console.log("newid", newid);
      await adding(data, id, addChildValue, newid);
      console.log("added", data);

      let checkdupli = {
        RefNo: id,
        name: addChildValue,
        code: code,
      };

      setErrorMessage(false);
      let updateConfig = await updateConfiguration(
        sessionStorage.getItem("auth"),
        {
          configuration: data,
          propertycode: property,
          propertycheckduplicate: checkdupli,
        }
      );
      // setData(data)

      if (updateConfig.status == "2000") {
        setDialogAdd(false);
      } else if (updateConfig.status == "1000") {
        setErrorMessageDu(true);
        const dupic = updateConfig.msg;
        setErrorParameterDu(dupic);
      }
    }
  };

  const editing = async (array, label, name) => {
    console.log("array, label, name:", array, label, name);
    const s = label.split(".");
    let ab = "";
    let isc = 0;
    for (const sm in s) {
      if (isc == 0) {
        ab += s[sm];
      } else if (s.length - 1 > isc) {
        ab += "." + s[sm];
      }
      isc += 1;
    }

    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label);
      console.log("ab1:", ab, "obj.RefNo:", obj.RefNo);
      if (obj.RefNo == ab) {
        console.log("ab:", ab);
        let checkdup = null;
        for (let c = 0; c < obj.children.length; c++) {
          console.log("obj.children[c]:", obj.children[c].name_en);
          if (obj.children[c].name_en == name && obj.children[c].code != code) {
            checkdup = name;
            setErrorParameterDu(name);
          }
        }
        if (!checkdup) {
          console.log("a::::", obj.RefNo, label);
          for (let ic = 0; ic < obj.children.length; ic++) {
            if (obj.children[ic].RefNo === label) {
              console.log("a:::2:");
              obj.children[ic].code = code;
              obj.children[ic].name_en = name;
              obj.children[ic].description = description;
            }
          }
          // if (obj.RefNo === label) {
          //   console.log("a:::2:");
          //   obj.code = code;
          //   obj.name_en = name;
          //   obj.description = description;
          // } else if (obj.children) {
          //   editing(obj.children, label, name);
          // }
        }
      } else if (obj.children) {
        editing(obj.children, label, name);
      }
    }
  };

  const handleEdit = async () => {
    setErrorMessageDu(false);
    setErrorParameterDu(null);
    if (addChildValue == null || addChildValue == "") {
      setErrorMessage(true);
      setErrorParameter("Name (EN)");
    } else if (description == null || description == "") {
      setErrorMessage(true);
      setErrorParameter("Description");
    } else {
      setErrorMessage(false);
      let id = addChildid;
      console.log("editparentid", id);
      // let newid = await runningID(data, id)
      // console.log("newid", newid)
      await editing(data, id, addChildValue);
      console.log(data);
      let checkdupli = {
        RefNo: id,
        name: addChildValue,
        code: code,
        type: "edit",
      };

      console.log("checkdupli:", checkdupli);

      let updateConfig = await updateConfiguration(
        sessionStorage.getItem("auth"),
        {
          configuration: data,
          propertycode: property,
          propertycheckduplicate: checkdupli,
        }
      );
      // setData(data)

      if (updateConfig.status == "2000") {
        setDialogEdit(false);
      } else if (updateConfig.status == "1000") {
        setErrorMessageDu(true);
        const dupic = updateConfig.msg;
        setErrorParameterDu(dupic);
      }
    }
  };

  const editingLang = async (array, label, name) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label, addChildNameLang);
      if (obj.RefNo === label) {
        obj.code = code;
        obj.name_en = name;
        obj["name_" + lang] = addChildNameLang;
        obj.description = description;
      } else if (obj.children) {
        editingLang(obj.children, label, name);
      }
    }
  };

  const handleEditLang = async () => {
    if (addChildValue == null || addChildValue == "") {
      setErrorMessage(true);
      setErrorParameter("Name (EN)");
    } else if (addChildNameLang == null || addChildNameLang == "") {
      setErrorMessage(true);
      setErrorParameter("Name (" + lang.toUpperCase() + ")");
    } else if (description == null || description == "") {
      setErrorMessage(true);
      setErrorParameter("Description");
    } else {
      setErrorMessage(false);
      let id = addChildid;
      console.log("editparentid", id);
      // let newid = await runningID(data, id)
      // console.log("newid", newid)
      await editingLang(data, id, addChildValue);
      console.log(data);
      // setData(data)
      setDialogEdit(false);
    }
  };

  const renderTree = (nodes) => (
    <div>
      <TreeItem
        key={nodes.RefNo}
        nodeId={nodes.RefNo}
        label={
          <div>
            <Grid container direction="row" alignItems="center">
              <Grid item className={classes.root}>
                <Typography
                  variant="body1"
                  color="initial"
                  noWrap
                  style={{ paddind: 5 }}
                >
                  <div
                    style={{ width: 100 }}
                    onClick={() => handleConfig(nodes.code)}
                  >
                    {nodes["name_" + lang] != null
                      ? nodes["name_" + lang]
                      : nodes["name_en"]}
                    {nodes.master == true ? (
                      <LockIcon style={{ paddingTop: 10, color: "blue" }} />
                    ) : null}
                  </div>
                </Typography>
              </Grid>
              <Grid item>
                {nodes.master == false ||
                sessionStorage.getItem("role") == "root" ||
                sessionStorage.getItem("role") == "Root" ? (
                  <IconButton
                    onClick={() =>
                      handleDialogEdit(nodes.name_en, nodes.RefNo, nodes)
                    }
                  >
                    <EditRoundedIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <EditRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                )}
                {nodes.master == false ||
                sessionStorage.getItem("role") == "root" ||
                sessionStorage.getItem("role") == "Root" ? (
                  <IconButton onClick={() => handleDelete(nodes.RefNo)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <DeleteRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                )}
                {nodes.addchild == true ||
                sessionStorage.getItem("role") == "root" ||
                sessionStorage.getItem("role") == "Root" ? (
                  <IconButton
                    aria-controls={nodes.RefNo}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, nodes.name_en, nodes.RefNo)}
                  >
                    <MoreVertRoundedIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-controls={nodes.RefNo} aria-haspopup="true">
                    <MoreVertRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Divider />
            <Menu
              id={nodes.RefNo}
              anchorEl={addChild}
              keepMounted
              open={Boolean(addChild)}
              onClose={handleClose}
            >
              <MenuItem
                id={nodes.RefNo + "-" + nodes.code}
                onClick={handleDialogAdd}
              >
                {/* <MenuItem onClick={handleClose}> */}
                <AddRoundedIcon /> Add child
              </MenuItem>
            </Menu>
          </div>
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: themeState.background,
        color: themeState.color,
        marginTop: 22,
      }}
    >
      {configState == "Configuration" ? (
        <Container maxWidth="xl">
          <React.Fragment>
            <Grid container style={{ padding: 20 }}>
              <Grid item style={{ flexGrow: 1 }}>
                <Breadcrumbs
                  separator={
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: 15,
                        fontSize: 20,
                        color: themeState.color,
                      }}
                    >
                      /
                    </Typography>
                  }
                >
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: 15,
                      fontSize: 20,
                      color: blue[themeState.colorlevel],
                    }}
                  >
                    Configuration
                    {/* {data[0][testa]} */}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Paper
                elevation={3}
                style={{
                  minHeight: 150,
                  width: "100%",
                  backgroundColor: themeState.paper,
                  color: themeState.color,
                }}
              >
                <Grid container style={{ padding: 20 }}>
                  <TreeView
                    className={classes.root}
                    defaultCollapseIcon={
                      <RemoveRoundedIcon
                        style={{
                          backgroundColor: "#717171",
                          borderRadius: 2,
                          color: "white",
                        }}
                      />
                    }
                    defaultExpandIcon={
                      <AddRoundedIcon
                        style={{
                          backgroundColor: "#2D62ED",
                          borderRadius: 2,
                          color: "white",
                        }}
                      />
                    }
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                  >
                    {/* {renderTree(data)} */}
                    {data.map((node) => renderTree(node))}
                  </TreeView>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                    style={{ marginTop: 15 }}
                  >
                    <Grid item style={{ flexGrow: 1 }}>
                      <Typography variant="title1">
                        item 11-13 of 13 Total
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="title1">Row per Page</Typography>
                    </Grid>
                    <Grid item>
                      <FormControl
                        variant="outlined"
                        size="small"
                        className={classes.selectPage}
                        style={{ color: themeState.color }}
                      >
                        <InputLabel
                          className={classes.root}
                          style={{
                            color: themeState.color,
                          }}
                          id="demo-simple-select-outlined-label"
                        >
                          Page
                        </InputLabel>
                        <Select
                          value={page}
                          onChange={handleChangePage}
                          label="Page"
                          style={{ color: themeState.color }}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>1-4 of 10</Grid>
                    <Grid item>
                      <IconButton style={{ color: themeState.color }}>
                        <FirstPageRoundedIcon />
                      </IconButton>
                      <IconButton style={{ color: themeState.color }}>
                        <NavigateBeforeRoundedIcon />
                      </IconButton>
                      <IconButton style={{ color: themeState.color }}>
                        <NavigateNextRoundedIcon />
                      </IconButton>
                      <IconButton style={{ color: themeState.color }}>
                        <LastPageRoundedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </React.Fragment>
        </Container>
      ) : configState == "RoleManagement" ? (
        <RoleManagement />
      ) : configState == "RoomManagement" ? (
        <RoomManagement />
      ) : configState == "DeviceManager" ? (
        <DeviceManager />
      ) : configState == "ComputerPrinter" ? (
        <ComputerPrinter />
      ) : (
        <UserManagement />
      )}

      {/* =================================== */}
      <Dialog
        className={classes.root}
        fullWidth="true"
        maxWidth="xs"
        open={dialogAdd}
        onClose={handleDialogAddClose}
        aria-labelledby="form-dialog-title"
        // style={{
        //   backgroundColor: "#000000",
        //   opacity: 0.13,
        // }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            backgroundColor: themeState.paper,
            color: blue[themeState.colorlevel],
          }}
        >
          New Master Config
        </DialogTitle>

        <DialogContent
          style={{
            backgroundColor: themeState.paper,
            color: themeState.color,
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <h2>Parent Name: {addChildName}</h2>
            <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
              <TextField
                className={classes.root}
                autoFocus
                id="outlined-basic"
                label="Code"
                variant="outlined"
                value={code}
                onChange={(e) => handleChangeCode(e)}
                helperText={
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="title1"
                      style={{ color: themeState.color }}
                    >
                      {code.length}/50
                    </Typography>
                  </Grid>
                }
                fullWidth
              />

              <TextField
                autoFocus
                id="outlined-basic"
                label="Name (EN)"
                variant="outlined"
                value={addChildValue}
                onChange={(e) => handleChangeValue(e)}
                helperText={
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="title1"
                      style={{ color: themeState.color }}
                    >
                      {addChildValue.length}/50
                    </Typography>
                  </Grid>
                }
                fullWidth
              />

              <TextField
                autoFocus
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => handleChangeDescription(e)}
                helperText={
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="title1"
                      style={{ color: themeState.color }}
                    >
                      {description.length}/50
                    </Typography>
                  </Grid>
                }
                fullWidth
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
          {errorMessageDu ? (
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
          ) : null}
        </DialogContent>
        <DialogActions
          style={{
            padding: 20,
            backgroundColor: themeState.paper,
            color: themeState.color,
          }}
        >
          <Button onClick={handleDialogAddClose} variant="text" color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className={classes.root}
        fullWidth="true"
        maxWidth="xs"
        open={dialogEdit}
        onClose={handleDialogAddClose}
        aria-labelledby="form-dialog-title"
        // style={{
        //   backgroundColor: "#000000",
        //   opacity: 0.13,
        // }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            backgroundColor: themeState.paper,
            color: blue[themeState.colorlevel],
          }}
        >
          Edit Master Config
        </DialogTitle>

        <DialogContent
          style={{
            backgroundColor: themeState.paper,
            color: themeState.color,
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <h2>Code: {code}</h2>
            <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
              <TextField
                autoFocus
                id="outlined-basic"
                label="Name (EN)"
                variant="outlined"
                // defaultValue={row.name_en}
                value={addChildValue}
                onChange={(e) => handleChangeValue(e)}
                helperText={
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="title1"
                      style={{ color: themeState.color }}
                    >
                      {addChildValue.length}/50
                    </Typography>
                  </Grid>
                }
                fullWidth
              />
            </Grid>

            {lang != "en" ? (
              <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                <TextField
                  autoFocus
                  id="outlined-basic"
                  label={"Name (" + lang.toUpperCase() + ")"}
                  variant="outlined"
                  value={addChildNameLang}
                  onChange={(e) => handleChangeLang(e)}
                  helperText={
                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography
                        variant="title1"
                        style={{ color: themeState.color }}
                      >
                        {addChildNameLang.length}/50
                      </Typography>
                    </Grid>
                  }
                  fullWidth
                />
              </Grid>
            ) : null}

            <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
              <TextField
                autoFocus
                id="outlined-basic"
                label="Description"
                variant="outlined"
                // defaultValue={row.description}
                value={description}
                onChange={(e) => handleChangeDescription(e)}
                helperText={
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="title1"
                      style={{ color: themeState.color }}
                    >
                      {description.length}/50
                    </Typography>
                  </Grid>
                }
                fullWidth
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
          {errorMessageDu ? (
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
            onClick={handleDialogEditClose}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          {lang == "en" ? (
            <Button onClick={handleEdit} variant="contained" color="primary">
              {" "}
              Save
            </Button>
          ) : (
            <Button
              onClick={handleEditLang}
              variant="contained"
              color="primary"
            >
              {" "}
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
