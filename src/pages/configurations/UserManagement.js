import React, { useState, useContext } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { VpnKey } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";
import MaterialTable from "material-table";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import {
  Container,
  Grid,
  Typography,
  Button,
  MenuItem,
  Breadcrumbs,
  Link,
  TextField,
  Chip,
  Divider,
} from "@material-ui/core";

import {
  changeStatus,
  listUser,
  postUser,
  updateUser,
  listPropertyByRoles,
  deleteUserByUserName,
  rolePermissionByRole,
  userRoleByUserName,
  userPropertyByUserName,
  getPosition,
  postPosition,
  getUserPermission,
  getUserComponentPermision,
  // listAllProperty,
  // getUserByID,
  // getUser,
  // listrole,
} from "../../services/user.service";
import { listRole } from "../../services/roleManagement.service";
import { EDIT_CONFIGSTATE } from "../../middleware/action";
import MaterialTableComponent from "../../components/Table/MaterialTableComponent";
import MaterialBreadcrumbsComponent from "../../components/Breadcrumbs/MaterialBreadcrumbsComponent";
import MaterialButtonComponent from "../../components/Button/MaterialButtonComponent";
// import user from "../services/user.service";

// Generate Order Data
function createData(
  id,
  userID,
  firstname,
  lastname,
  position,
  roles,
  property,
  status,
  name,
  adaccount
) {
  return {
    id,
    userID,
    firstname,
    lastname,
    position,
    roles,
    property,
    status,
    name,
    adaccount,
  };
}

const property = [
  {
    key: "1",
    label: "Novotel Pattaya",
  },
  {
    key: "2",
    label: "Novotel Bangkok",
  },
  {
    key: "3",
    label: "Novotel Rayong",
  },
];
const RoleValues = "";
const PropertyValues = "";

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
  pagination: (themeState) => ({
    "& .MTablePaginationInner-root": {
      backgroundColor: themeState.color,
    },
    color: themeState.color,
  }),
}));

var roles = [];

const defaultData = [
  {
    name: "Dashboard",
    code: "DB",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Reservartion",
    code: "RV",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Front Desk",
    code: "FD",
    permision: false,
    children: [
      {
        name: "Walk-in",
        code: "FD-WN",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Check-in",
        code: "FD-CI",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Checkout",
        code: "FD-CO",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "RoomStatus",
        code: "FD-RS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Cashier",
    code: "CS",
    permision: false,
    children: [
      {
        name: "Folio Management",
        code: "CS-FM",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Reports",
        code: "CS-RP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Profile",
    code: "PF",
    permision: false,
    children: [
      {
        name: "Individual",
        code: "PF-ID",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Travel Agen",
        code: "PF-TA",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Company",
        code: "PF-CP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Group",
        code: "PF-GR",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Night Auditor",
    code: "NA",
    permision: false,
    children: [
      {
        name: "Reports",
        code: "NA-RP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Hotel Date Maintenance",
        code: "NA-HD",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Close-Day Procedure",
        code: "NA-CD",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Auto-Sequence Reports",
        code: "NA-AS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "House Keeping",
    code: "HK",
    permision: false,
    children: [
      {
        name: "Item Management",
        code: "HK-IM",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Room Status",
        code: "HK-RS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Engineering",
    code: "EN",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Reporting Systems",
    code: "RS",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Configuration",
    code: "CF",
    permision: false,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
    children: [
      {
        name: "PMS Configuration",
        code: "CF-PC",
        permision: false,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
        children: [
          {
            name: "Property Configuration",
            code: "CF-PC-PC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Room Configuration",
            code: "CF-PC-RC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Item Configuration",
            code: "CF-PC-IC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Reservation Configuration",
            code: "CF-PC-RE",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
        ],
      },
      {
        name: "System Configuration",
        code: "CF-SC",
        permision: false,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
        children: [
          {
            name: "User Management",
            code: "CF-UM",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Role Management",
            code: "CF-RM",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
        ],
      },
    ],
  },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const [CRUD, setCRUD] = useState({ C: true, R: true, U: true, D: false });
  const [position, setPosition] = useState([
    { key: "Administrator", label: "Administrator" },
  ]);
  const [dialogAddUser, setDialogAddUser] = React.useState(false);
  const [dialogEditUser, setDialogEditUser] = React.useState(false);
  const [dialogDeleteUser, setDialogDeleteUser] = React.useState(false);
  const [selectPosition, setSelectPosition] = React.useState(null);
  // const [selectProperty, setSelectProperty] = React.useState(null);
  const [permissionDialog, setPermissionDialog] = React.useState(false);
  const [chipRolesDialog, setChipRolesDialog] = React.useState([]);
  const [chipPropertyDialog, setChipPropertyDialog] = React.useState([]);
  const [dialogSize, setDialogSize] = React.useState("sm");
  const [dialogRatio, setDialogRatio] = React.useState(12);
  const [pageData, setPageData] = React.useState([]);
  const [editLastName, setEditLastName] = React.useState(null);
  const [editFirstName, setEditFirstName] = React.useState(null);
  const [editUserName, setEditUserName] = React.useState(null);
  const [editUserID, setEditUserID] = React.useState(null);
  const [oldUserName, setoldUserName] = React.useState(null);
  const [newPosition, setNewPosition] = React.useState(null);
  const [editAD, setEditAD] = useState("");
  // const [editFirstname, setEditFirstname] = React.useState(null);
  // const [editLastname, setEditLastname] = React.useState(null);
  // const [editID, setEditID] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [editStatus, setEditStatus] = React.useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);
  const [errorMessageDu, setErrorMessageDu] = useState(false);
  const [errorParameterDu, setErrorParameterDu] = useState(null);

  const { store } = useContext(ReactReduxContext);
  React.useEffect(async () => {
    // let userComponentPermission = await getUserComponentPermision(
    //   sessionStorage.getItem("auth"),
    //   sessionStorage.getItem("username"),
    //   "CF-UM"
    // );
    // setCRUD({
    //   C: userComponentPermission.content[0].permissioncreate,
    //   R: userComponentPermission.content[0].permissionread,
    //   U: userComponentPermission.content[0].permissionupdate,
    //   D: userComponentPermission.content[0].permissiondelete,
    // });
    let dataRole = await listRole(sessionStorage.getItem("auth"));
    console.log("listRole", dataRole.content[dataRole.content.length - 1]);
    roles = [];
    dataRole.content[dataRole.content.length - 1].forEach((element) => {
      if (element.status == "Active")
        roles.push({
          key: element.rolecode,
          label: element.rolename,
        });
    });
    console.log("roles", roles);

    const data = await listUser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.username,
          element.firstname,
          element.lastname,
          element.position,
          element.roles,
          element.property,
          element.status,
          element.firstname + " " + element.lastname,
          element.adaccount
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log(userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
    setSelectPosition(position[0].label);
  }, []);

  const handleComponentState = async (comp) => {
    const comlower = comp.toLowerCase();
    navigate.replace(`/${comlower}`);
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp,
    });
  };

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  const handleDialogAddUser = async () => {
    let position_json = [];
    let listPosition = await getPosition(sessionStorage.getItem("auth"));
    listPosition.content[listPosition.content.length - 1].forEach((element) => {
      position_json.push({ key: element.position, label: element.position });
    });
    position_json.push({ key: "Add new position", label: "Add new position" });
    setPosition(position_json);
    setSelectPosition(position_json[0].label);
    setNewPosition(null);
    setPermissionDialog(false);
    setChipRolesDialog([]);
    setChipPropertyDialog([]);
    setEditAD("");
    setEditFirstName(null);
    setEditLastName(null);
    setEditStatus(true);
    setErrorMessage(false);
    setErrorMessageDu(false);
    setDialogAddUser(true);
  };

  const handleDialogAddUserClose = () => {
    setDialogAddUser(false);
  };

  const handleDialogEditUser = async (rowData) => {
    let username = rowData.userID;
    let firstname = rowData.firstname;
    let lastname = rowData.lastname;
    let position = rowData.position;
    let status = rowData.status;
    let adaccount = rowData.adaccount;

    // const databyid = await getUserByID(sessionStorage.getItem("auth"), id);
    // setEditFirstName(databyid.content[databyid.content.length - 1].firstname);
    // setEditLastName(databyid.content[databyid.content.length - 1].lastname);
    // setEditUserName(databyid.content[databyid.content.length - 1].username);
    // setEditStatus(databyid.content[databyid.content.length - 1].status);
    // setSelectPosition(databyid.content[databyid.content.length - 1].position);

    // setChipRolesDialog([]);
    // if (databyid.content[databyid.content.length - 1].roles) {
    //   const roleDataEdit = databyid.content[databyid.content.length - 1].roles;
    //   var tempRole = roleDataEdit.split(", ");
    //   for (let i in roles) {
    //     if (tempRole.includes(roles[i].key)) {
    //       setChipRolesDialog((prevState) => [
    //         ...prevState,
    //         { key: roles[i].key, label: roles[i].label },
    //       ]);
    //     }
    //   }
    // }
    // console.log("Edit databyid:", databyid);
    // console.log("Edit ID:", id);
    // setEditID(id);

    setPermissionDialog(false);
    let userrole = await userRoleByUserName(
      sessionStorage.getItem("auth"),
      username
    );
    let userproperty = await userPropertyByUserName(
      sessionStorage.getItem("auth"),
      username
    );
    console.log("userrole", userrole.content[userrole.content.length - 1]);
    let role = [];
    const setrole = new Set();
    if (userrole.content[userrole.content.length - 1] != "") {
      userrole.content[userrole.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (role.filter((x) => x.label === element).length == 0) {
            //&& roles.some(role => role.label == element)
            role.push({ key: element, label: element });
            setrole.add(element);
          }
        });
    }
    console.log("role", role);

    await listProperty(Array.from(setrole));
    let property = [];
    if (userproperty.content[userproperty.content.length - 1] != "") {
      userproperty.content[userproperty.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (property.filter((x) => x.label === element).length == 0) {
            property.push({ key: element, label: element });
          }
        });
    }
    let position_json = [];
    let listPosition = await getPosition(sessionStorage.getItem("auth"));
    listPosition.content[listPosition.content.length - 1].forEach((element) => {
      if (
        position_json.filter((x) => x.label === element.position).length == 0
      ) {
        position_json.push({ key: element.position, label: element.position });
      }
    });
    position_json.push({ key: "Add new position", label: "Add new position" });

    const temp = new Set();
    if (role.length) {
      let userper = await getUserPermission(
        sessionStorage.getItem("auth"),
        username
      );

      if (Object.keys(userper.content[userper.content.length - 1]).length > 0) {
        for (var i in role) {
          temp.add(role[i].key);
        }
        let roleper = await rolePermissionByRole(
          sessionStorage.getItem("auth"),
          { roles: Array.from(temp) }
        );
        console.log("roleper", roleper);
        let _data = JSON.parse(JSON.stringify(defaultData));

        rolePermissionEdit(
          _data,
          roleper.content[roleper.content.length - 1],
          userper.content[userper.content.length - 1]
        );
        setData(_data);
        setData((prevState) => [...prevState]);
        setPermissionDialog(true);
      }
    }

    setEditUserName(username);
    setoldUserName(username);
    setEditAD(adaccount);
    setEditFirstName(firstname);
    setEditLastName(lastname);
    setSelectPosition(position);
    setEditStatus(status);
    setChipRolesDialog((prev) => role);
    setChipPropertyDialog((prev) => property);
    setPosition((prev) => position_json);
    setSelectPosition(position_json[0].label);
    setNewPosition(null);
    setErrorMessage(false);
    setErrorMessageDu(false);
    setDialogEditUser(true);
  };

  const handleDialogEditUserClose = () => {
    setDialogEditUser(false);
  };

  const rolePermission = async (array, permission) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (permission.hasOwnProperty(obj.code)) {
        obj.create = !!parseInt(permission[obj.code].permissioncreate);
        obj.read = !!parseInt(permission[obj.code].permissionread);
        obj.update = !!parseInt(permission[obj.code].permissionupdate);
        obj.delete = !!parseInt(permission[obj.code].permissiondelete);
      }
      if (obj.children) {
        // list = [...list, ...propertyList(obj.children)];
        rolePermission(obj.children, permission);
      }
    }
    return list;
  };

  const handlePermission = async () => {
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      let roleper = await rolePermissionByRole(sessionStorage.getItem("auth"), {
        roles: Array.from(temp),
      });
      console.log("roleper", roleper);
      let _data = JSON.parse(JSON.stringify(defaultData));
      rolePermission(_data, roleper.content[roleper.content.length - 1]);
      setData(_data);
      setData((prevState) => [...prevState]);
    } else {
      setData(JSON.parse(JSON.stringify(defaultData)));
    }

    setPermissionDialog(true);
    // if (permissionDialog) {
    //   setDialogSize("sm");
    //   setDialogRatio(12);
    // } else {
    //   setDialogSize("md");
    //   setDialogRatio(12);
    // }
  };

  const rolePermissionEdit = async (array, permission, userpermission) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (permission.hasOwnProperty(obj.code)) {
        if (userpermission.hasOwnProperty(obj.code)) {
          if (userpermission[obj.code].permissioncreate == 0)
            obj.create = !!parseInt(permission[obj.code].permissioncreate);
          else {
            obj.create = userpermission[obj.code].permissioncreate == 1;
            obj.edited_create = true;
          }
          if (userpermission[obj.code].permissionread == 0)
            obj.read = !!parseInt(permission[obj.code].permissionread);
          else {
            obj.read = userpermission[obj.code].permissionread == 1;
            obj.edited_read = true;
          }
          if (userpermission[obj.code].permissionupdate == 0)
            obj.update = !!parseInt(permission[obj.code].permissionupdate);
          else {
            obj.update = userpermission[obj.code].permissionupdate == 1;
            obj.edited_update = true;
          }
          if (userpermission[obj.code].permissiondelete == 0)
            obj.delete = !!parseInt(permission[obj.code].permissiondelete);
          else {
            obj.delete = userpermission[obj.code].permissiondelete == 1;
            obj.edited_delete = true;
          }
        } else {
          obj.create = !!parseInt(permission[obj.code].permissioncreate);
          obj.read = !!parseInt(permission[obj.code].permissionread);
          obj.update = !!parseInt(permission[obj.code].permissionupdate);
          obj.delete = !!parseInt(permission[obj.code].permissiondelete);
        }
      } else if (userpermission.hasOwnProperty(obj.code)) {
        if (userpermission[obj.code].permissioncreate == 1) {
          obj.create = true;
          obj.edited_create = true;
        } else if (userpermission[obj.code].permissioncreate == -1) {
          obj.edited_create = true;
        }

        if (userpermission[obj.code].permissionread == 1) {
          obj.read = true;
          obj.edited_read = true;
        } else if (userpermission[obj.code].permissionread == -1) {
          obj.edited_read = true;
        }

        if (userpermission[obj.code].permissionupdate == 1) {
          obj.update = true;
          obj.edited_update = true;
        } else if (userpermission[obj.code].permissionupdate == -1) {
          obj.edited_update = true;
        }

        if (userpermission[obj.code].permissiondelete == 1) {
          obj.delete = true;
          obj.edited_delete = true;
        } else if (userpermission[obj.code].permissiondelete == -1) {
          obj.edited_delete = true;
        }
      }
      if (obj.children) {
        // list = [...list, ...propertyList(obj.children)];
        rolePermissionEdit(obj.children, permission, userpermission);
      }
    }
    return list;
  };

  const handlePermissionEdit = async () => {
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      let roleper = await rolePermissionByRole(sessionStorage.getItem("auth"), {
        roles: Array.from(temp),
      });
      console.log("roleper", roleper);
      let _data = JSON.parse(JSON.stringify(defaultData));
      let userper = await getUserPermission(
        sessionStorage.getItem("auth"),
        oldUserName
      );

      rolePermissionEdit(
        _data,
        roleper.content[roleper.content.length - 1],
        userper.content[userper.content.length - 1]
      );
      setData(_data);
      setData((prevState) => [...prevState]);
    } else {
      setData(JSON.parse(JSON.stringify(defaultData)));
    }

    setPermissionDialog(!permissionDialog);
    if (permissionDialog) {
      setDialogSize("sm");
      setDialogRatio(12);
    } else {
      setDialogSize("md");
      setDialogRatio(12);
    }
  };

  // const handlePermissionClose = () => {
  //   setPermissionDialog(false);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   updatePageData(rows, newPage, rowsPerPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   setPage(0);
  //   updatePageData(rows, 0, event.target.value);
  // };

  const propertyList = async (array, code) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (
        obj.edited_create ||
        obj.edited_read ||
        obj.edited_update ||
        obj.edited_delete
      ) {
        list.push({
          username: code,
          componentcode: obj.code,
          permissioncreate: obj.edited_create ? (obj.create ? 1 : -1) : 0,
          permissionread: obj.edited_read ? (obj.read ? 1 : -1) : 0,
          permissionupdate: obj.edited_update ? (obj.update ? 1 : -1) : 0,
          permissiondelete: obj.edited_delete ? (obj.delete ? 1 : -1) : 0,
        });
      }
      if (obj.children) {
        // list = [...list, ...propertyList(obj.children)];
        let append = await propertyList(obj.children, code);
        if (append.length > 0) list = list.concat(append);
      }
    }
    return list;
  };

  const handleInsertUser = async (
    code,
    firstName,
    lastName,
    status,
    position,
    role,
    ad
  ) => {
    // setEditFirstName(null);
    // setEditLastName(null);
    setErrorMessageDu(false);
    if (code == null || code == "") {
      setErrorMessage(true);
      setErrorParameter("UserID");
    } else if (firstName == null || firstName == "") {
      setErrorMessage(true);
      setErrorParameter("Firstname");
    } else if (lastName == null || lastName == "") {
      setErrorMessage(true);
      setErrorParameter("Lastname");
    } else if (chipRolesDialog.length == 0) {
      setErrorMessage(true);
      setErrorParameter("Roles");
    } else if (chipPropertyDialog.length == 0) {
      setErrorMessage(true);
      setErrorParameter("Property");
    } else {
      setErrorMessage(false);
      if (position == "Add new position") {
        let addPosition = await postPosition(sessionStorage.getItem("auth"), {
          position: newPosition,
        });
      }
      let perm = await propertyList(data, code);
      console.log(perm);
      const roletemp = new Set();
      if (chipRolesDialog.length) {
        for (let i in chipRolesDialog) {
          roletemp.add(chipRolesDialog[i].key);
        }
      }
      const roleTempArray = Array.from(roletemp).join(",");
      const propertytemp = new Set();
      if (chipPropertyDialog.length) {
        for (let i in chipPropertyDialog) {
          propertytemp.add(chipPropertyDialog[i].key);
        }
      }
      const propertyTempArray = Array.from(propertytemp).join(",");
      console.log(firstName, lastName, status, position, role);
      let insert = await postUser(sessionStorage.getItem("auth"), {
        firstname: firstName,
        lastname: lastName,
        code: code,
        status: status ? "Active" : "Inactive",
        position: position == "Add new position" ? newPosition : position,
        userproperty: propertyTempArray,
        role: roleTempArray,
        permission: perm,
        adaccount: ad,
      });
      console.log(insert);
      if (insert.status == "2000") {
        const data = await listUser(sessionStorage.getItem("auth"));
        let userdata = [];
        data.content[data.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.username,
              element.firstname,
              element.lastname,
              element.position,
              element.roles,
              element.property,
              element.status,
              element.firstname + " " + element.lastname,
              element.adaccount
            )
          )
        );
        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setDialogAddUser(false);
      } else if (insert.status == "1000") {
        setErrorMessageDu(true);
        setErrorParameterDu(insert.msg);
      }
    }
  };

  const handleSelectPosition = (event) => {
    setSelectPosition(event.target.value);
  };
  // const handleSelectProperty = (event) => {
  //   setSelectProperty(event.target.value);
  // };

  const listProperty = async (role) => {
    // let oldproperty = properties;
    let changeProperty = await listPropertyByRoles(
      sessionStorage.getItem("auth"),
      { roles: role }
    );
    console.log("changeProperty", changeProperty);
    let tempProperty = [];

    changeProperty.content[changeProperty.content.length - 1]
      .split(",")
      .forEach((element) => {
        if (tempProperty.filter((x) => x.label === element).length == 0) {
          tempProperty.push({
            key: element,
            label: element,
          });
        }
      });
    console.log("tempProperty", tempProperty);
    setProperties(tempProperty);

    // console.log("prop",oldproperty,properties)
    setChipPropertyDialog((chips) =>
      chips.filter((chips) =>
        tempProperty.some((property) => property.key === chips.key)
      )
    );
  };

  const handleSelectRoles = async (event, key) => {
    setPermissionDialog(false);
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      if (temp.has(key.props.name)) {
        // console.log("had value");
      } else {
        setChipRolesDialog([
          ...chipRolesDialog,
          { key: key.props.name, label: event.target.value },
        ]);
        temp.add(key.props.name);
        console.log("temp", temp);
        listProperty(Array.from(temp));
      }
    } else {
      setChipRolesDialog([
        ...chipRolesDialog,
        { key: key.props.name, label: event.target.value },
      ]);
      temp.add(key.props.name);
      console.log("temp", temp);
      listProperty(Array.from(temp));
    }
  };
  const handleDeleteRoles = (chipToDelete) => async () => {
    setPermissionDialog(false);
    setChipRolesDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
    const temp = new Set();
    for (var i in chipRolesDialog) {
      if (chipRolesDialog[i].key != chipToDelete.key)
        temp.add(chipRolesDialog[i].key);
    }
    listProperty(Array.from(temp));
  };

  const handleSelectProperty = (event, key) => {
    const temp = new Set();
    if (chipPropertyDialog.length) {
      for (var i in chipPropertyDialog) {
        temp.add(chipPropertyDialog[i].key);
      }
      if (temp.has(key.props.name)) {
        // console.log("had value");
      } else {
        setChipPropertyDialog([
          ...chipPropertyDialog,
          { key: key.props.name, label: event.target.value },
        ]);
      }
    } else {
      setChipPropertyDialog([
        ...chipPropertyDialog,
        { key: key.props.name, label: event.target.value },
      ]);
    }
  };
  const handleDeleteProperty = (chipToDelete) => () => {
    setChipPropertyDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

  const editingCreate = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_create = !obj.edited_create;
        obj.create = !obj.create;
      } else if (obj.children) {
        editingCreate(obj.children, label);
      }
    }
  };

  const handleCheckPermisionCreate = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editingCreate(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editingRead = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_read = !obj.edited_read;
        obj.read = !obj.read;
      } else if (obj.children) {
        editingRead(obj.children, label);
      }
    }
  };

  const handleCheckPermisionRead = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editingRead(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editingUpdate = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_update = !obj.edited_update;
        obj.update = !obj.update;
      } else if (obj.children) {
        editingUpdate(obj.children, label);
      }
    }
  };

  const handleCheckPermisionUpdate = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editingUpdate(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editingDelete = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_delete = !obj.edited_delete;
        obj.delete = !obj.delete;
      } else if (obj.children) {
        editingDelete(obj.children, label);
      }
    }
  };

  const handleCheckPermisionDelete = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editingDelete(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editingAll = async (array, label, checked) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        if (obj.delete == checked) {
          obj.edited_delete = !obj.edited_delete;
          obj.delete = !obj.delete;
        }
        if (obj.update == checked) {
          obj.edited_update = !obj.edited_update;
          obj.update = !obj.update;
        }
        if (obj.read == checked) {
          obj.edited_read = !obj.edited_read;
          obj.read = !obj.read;
        }
        if (obj.create == checked) {
          obj.edited_create = !obj.edited_create;
          obj.create = !obj.create;
        }
      } else if (obj.children) {
        editingAll(obj.children, label, checked);
      }
    }
  };

  const handleCheckPermisionAll = async (nodes, event) => {
    let _data = data;
    console.log("nid", nodes.code, event.target.checked);
    await editingAll(_data, nodes.code, !event.target.checked);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const [data, setData] = React.useState([]);
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

  const renderTree = (nodes) => (
    <div>
      <TreeItem
        key={nodes.code}
        nodeId={nodes.code}
        label={
          <div>
            {nodes.permision ? (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item style={{ flexGrow: 1 }}>
                    <Typography>
                      {nodes.create ||
                      nodes.read ||
                      nodes.update ||
                      nodes.delete ? (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{
                            color: "#1F51FF",
                            fontSize: 16,
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          {nodes.name} <VpnKey style={{ fontSize: 16 }} />
                        </Typography>
                      ) : (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{
                            fontSize: 16,
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}
                        >
                          {nodes.name}
                        </Typography>
                      )}
                      {nodes.edited_create ||
                      nodes.edited_read ||
                      nodes.edited_update ||
                      nodes.edited_delete ? (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{
                            color: "green",
                            fontSize: 16,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                          }}
                        >
                          <PersonAddIcon style={{ fontSize: 16 }} />
                        </Typography>
                      ) : null}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          color="primary"
                          checked={
                            nodes.create &&
                            nodes.read &&
                            nodes.update &&
                            nodes.delete
                          }
                          onClick={(event) =>
                            handleCheckPermisionAll(nodes, event)
                          }
                        />
                      }
                      label={
                        <Typography
                          variant="title1"
                          color="initial"
                          style={{ fontSize: 12 }}
                        >
                          All
                        </Typography>
                      }
                      labelPlacement="end"
                    />
                    {nodes.edited_create ? (
                      nodes.create ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "green",
                              }}
                              checked={nodes.create}
                              onChange={() => handleCheckPermisionCreate(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Create
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "red",
                              }}
                              checked={nodes.create}
                              onChange={() => handleCheckPermisionCreate(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Create
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.create}
                            onChange={() => handleCheckPermisionCreate(nodes)}
                          />
                        }
                        label={
                          <Typography
                            variant="title1"
                            color="initial"
                            style={{ fontSize: 12 }}
                          >
                            Create
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    )}
                    {nodes.edited_read ? (
                      nodes.read ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "green",
                              }}
                              checked={nodes.read}
                              onChange={() => handleCheckPermisionRead(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Read
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "red",
                              }}
                              checked={nodes.read}
                              onChange={() => handleCheckPermisionRead(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Read
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.read}
                            onChange={() => handleCheckPermisionRead(nodes)}
                          />
                        }
                        label={
                          <Typography
                            variant="title1"
                            color="initial"
                            style={{ fontSize: 12 }}
                          >
                            Read
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    )}
                    {nodes.edited_update ? (
                      nodes.update ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "green",
                              }}
                              checked={nodes.update}
                              onChange={() => handleCheckPermisionUpdate(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Update
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "red",
                              }}
                              checked={nodes.update}
                              onChange={() => handleCheckPermisionUpdate(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Update
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.update}
                            onChange={() => handleCheckPermisionUpdate(nodes)}
                          />
                        }
                        label={
                          <Typography
                            variant="title1"
                            color="initial"
                            style={{ fontSize: 12 }}
                          >
                            Update
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    )}
                    {nodes.edited_delete ? (
                      nodes.delete ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "green",
                              }}
                              checked={nodes.delete}
                              onChange={() => handleCheckPermisionDelete(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Delete
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              style={{
                                color: "red",
                              }}
                              checked={nodes.delete}
                              onChange={() => handleCheckPermisionDelete(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Delete
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.delete}
                            onChange={() => handleCheckPermisionDelete(nodes)}
                          />
                        }
                        label={
                          <Typography
                            variant="title1"
                            color="initial"
                            style={{ fontSize: 12 }}
                          >
                            Delete
                          </Typography>
                        }
                        labelPlacement="end"
                      />
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </div>
            ) : (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item style={{ flexGrow: 1 }}>
                    <Typography
                      style={{
                        fontSize: 16,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      {nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.create === true
                          );
                        else return item.create === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.read === true
                          );
                        else return item.read === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.update === true
                          );
                        else return item.update === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.delete === true
                          );
                        else return item.delete === true;
                      }) ? (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{ color: "#1F51FF", fontSize: 16 }}
                        >
                          {nodes.name} <VpnKey style={{ fontSize: 16 }} />
                        </Typography>
                      ) : (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{ fontSize: 16, height: 50 }}
                        >
                          {nodes.name}
                        </Typography>
                      )}
                      {nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.edited_create === true
                          );
                        else return item.edited_create === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.edited_read === true
                          );
                        else return item.edited_read === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.edited_update === true
                          );
                        else return item.edited_update === true;
                      }) ||
                      nodes.children.some((item) => {
                        if (item.permision == false)
                          return item.children.some(
                            (childitem) => childitem.edited_delete === true
                          );
                        else return item.edited_delete === true;
                      }) ? (
                        <Typography
                          display="inline"
                          variant="h6"
                          color="initial"
                          style={{
                            color: "green",
                            fontSize: 16,
                            paddingLeft: 10,
                          }}
                        >
                          <PersonAddIcon style={{ fontSize: 16 }} />
                        </Typography>
                      ) : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            )}
          </div>
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  const handleSaveEdit = async (
    code,
    firstName,
    lastName,
    status,
    position,
    role,
    ad
  ) => {
    console.log(
      "Handle save Edit : id, firstname, userName, status",
      code,
      firstName,
      lastName,
      status,
      position,
      role,
      ad
    );

    setErrorMessageDu(false);
    if (code == null || code == "") {
      setErrorMessage(true);
      setErrorParameter("UserID");
    } else if (firstName == null || firstName == "") {
      setErrorMessage(true);
      setErrorParameter("Firstname");
    } else if (lastName == null || lastName == "") {
      setErrorMessage(true);
      setErrorParameter("Lastname");
    } else if (chipRolesDialog.length == 0) {
      setErrorMessage(true);
      setErrorParameter("Roles");
    } else if (chipPropertyDialog.length == 0) {
      setErrorMessage(true);
      setErrorParameter("Property");
    } else {
      setErrorMessage(false);
      if (position == "Add new position") {
        let addPosition = await postPosition(sessionStorage.getItem("auth"), {
          position: newPosition,
        });
      }
      let perm = await propertyList(data, code);
      console.log(perm);
      const roletemp = new Set();
      if (chipRolesDialog.length) {
        for (let i in chipRolesDialog) {
          roletemp.add(chipRolesDialog[i].key);
        }
      }
      const roleTempArray = Array.from(roletemp).join(",");
      const propertytemp = new Set();
      if (chipPropertyDialog.length) {
        for (let i in chipPropertyDialog) {
          propertytemp.add(chipPropertyDialog[i].key);
        }
      }
      const propertyTempArray = Array.from(propertytemp).join(",");
      console.log(firstName, lastName, status, position, role);
      let update = await updateUser(sessionStorage.getItem("auth"), {
        oldUserName: oldUserName,
        firstname: firstName,
        lastname: lastName,
        code: code,
        status: status,
        position: position == "Add new position" ? newPosition : position,
        userproperty: propertyTempArray,
        role: roleTempArray,
        permission: perm,
        adaccount: ad,
      });

      if (update.status == "2000") {
        const _data = await listUser(sessionStorage.getItem("auth"));
        let userdata = [];
        _data.content[_data.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.username,
              element.firstname,
              element.lastname,
              element.position,
              element.roles,
              element.property,
              element.status,
              element.firstname + " " + element.lastname,
              element.adaccount
            )
          )
        );

        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setDialogEditUser(false);
      } else if (update.status == "1000") {
        setErrorMessageDu(true);
        setErrorParameterDu(update.msg);
      }
    }
  };

  const handleResetToDefault = () => {
    handlePermission();
  };

  const handleDialogDeleteUserClose = () => {
    setDialogDeleteUser(false);
  };
  const handleDialogDeleteUserOpen = async (data) => {
    // setEditID(id);
    // const databyid = await getUserByID(sessionStorage.getItem("auth"), id);
    // console.log("delete dialog", data);
    setEditUserName(data.userID);
    setEditFirstName(data.firstname);
    setEditLastName(data.lastname);
    // setEditAD(adaccount);
    setDialogDeleteUser(true);
  };

  const handleactive = async (username, status) => {
    let changedstatus = await changeStatus(
      sessionStorage.getItem("auth"),
      username,
      status
    );
    if (changedstatus.status == "2000") {
      let data = await listUser(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content[data.content.length - 1].forEach((element) =>
        userdata.push(
          createData(
            element.code,
            element.username,
            element.firstname,
            element.lastname,
            element.position,
            element.roles,
            element.property,
            element.status,
            element.firstname + " " + element.lastname,
            element.adaccount
          )
        )
      );
      console.log(sessionStorage.getItem("auth"));
      console.log(userdata);
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
    }
  };

  const handleDialogDelete = async (username, fname, lname) => {
    // console.log("DeleteID:", id);
    console.log("DeleteUsername:", username);
    console.log("DeleteFname:", fname);
    console.log("DeleteLname:", lname);

    const deleteuser = await deleteUserByUserName(
      sessionStorage.getItem("auth"),
      username
    );
    console.log("userupdate func:", deleteuser);
    const data = await listUser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.username,
          element.firstname,
          element.lastname,
          element.position,
          element.roles,
          element.property,
          element.status,
          element.firstname + " " + element.lastname,
          element.adaccount
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log(userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);

    setDialogDeleteUser(false);
  };

  return (
    <Container maxWidth="xl">
      <React.Fragment>
        <Grid container style={{ padding: 20 }}>
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
                  text: "User Management",
                  handle: () => {
                    "";
                  },
                },
              ]}
            />
          </Grid>
          {CRUD.C ? (
            <MaterialButtonComponent
              handleNewData={handleDialogAddUser}
              handleNewText="New User"
            />
          ) : null}
        </Grid>

        <div style={{ maxWidth: "100%" }}>
          {CRUD.R ? (
            <MaterialTableComponent
              placeHolder="Search by Username, Full Name, Position, Roles, Property,AD Account"
              title="User Management"
              rows={rows}
              handleNewData={handleDialogAddUser}
              handleEditData={handleDialogEditUser}
              handleDialogDeleteOpen={handleDialogDeleteUserOpen}
              columns={[
                {
                  title: "Username",
                  field: "userID",
                  headerStyle: headerTableStyle,
                },
                {
                  title: "Full Name",
                  field: "name",
                  headerStyle: headerTableStyle,
                },
                {
                  title: "Position",
                  field: "position",
                  headerStyle: headerTableStyle,
                },
                {
                  title: "Roles",
                  field: "roles",
                  headerStyle: headerTableStyle,
                },
                {
                  title: "Property",
                  field: "property",
                  headerStyle: headerTableStyle,
                },
                {
                  title: "AD Account",
                  field: "adaccount",
                  headerStyle: headerTableStyle,
                },
                {
                  render: (rowData) => {
                    return rowData.status == "Active" ? (
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: 20,
                          backgroundColor: mainColor,
                          color: "white",
                        }}
                        onClick={() =>
                          handleactive(rowData.userID, rowData.status)
                        }
                      >
                        {rowData.status}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: 20,
                          backgroundColor: "#DEDFE0",
                          color: "black",
                        }}
                        onClick={() =>
                          handleactive(rowData.userID, rowData.status)
                        }
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
          ) : null}
        </div>

        {/* ==================== Dialog New User========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogAddUser}
          onClose={handleDialogAddUserClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid
              item
              xs={dialogRatio}
              sm={dialogRatio}
              md={dialogRatio}
              lg={dialogRatio}
              xl={dialogRatio}
            >
              <DialogTitle
                id="form-dialog-title"
                style={{
                  backgroundColor: themeState.paper,
                  color: mainColor,
                }}
              >
                New User
              </DialogTitle>

              <DialogContent style={headerTableStyle}>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditUserID(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="AD Account"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditAD(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Lastname"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // value={" "}
                        onChange={(e) => setEditLastName(e.target.value)}
                      ></TextField>
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
                      selectSelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      label="Roles"
                      select
                      value={RoleValues}
                      onChange={(event, name) => handleSelectRoles(event, name)}
                    >
                      {roles.map((option) => (
                        <MenuItem
                          className={classes.root}
                          style={headerTableStyle}
                          key={option.key}
                          name={option.key}
                          value={option.label}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {chipRolesDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteRoles(data)}
                        />
                      );
                    })}
                  </Grid>
                  <Grid style={{ paddingTop: 10 }}>
                    <Divider />
                  </Grid>
                  <TextField
                    className={classes.root}
                    fullWidth
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    variant="outlined"
                    selectSelectProps={{
                      native: true,
                    }}
                    label="Property"
                    select
                    value={PropertyValues}
                    onChange={(event, name) =>
                      handleSelectProperty(event, name)
                    }
                  >
                    {properties.map((option) => (
                      <MenuItem
                        className={classes.root}
                        style={headerTableStyle}
                        key={option.key}
                        name={option.key}
                        value={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {chipPropertyDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteProperty(data)}
                      />
                    );
                  })}
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        value={selectPosition}
                        onChange={handleSelectPosition}
                      >
                        {position.map((option) => (
                          <option
                            style={headerTableStyle}
                            key={option.key}
                            value={option.label}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid
                      container
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ alignContent: "center", padding: 20 }}
                    >
                      <FormControlLabel
                        value="Status"
                        control={
                          <Switch
                            defaultChecked={true}
                            color="primary"
                            onChange={(e) =>
                              e.target.checked
                                ? setEditStatus("Active")
                                : setEditStatus("Inactive")
                            }
                          />
                        }
                        label="Status"
                        labelPlacement="start"
                      />
                    </Grid>
                  </Grid>
                  {selectPosition == "Add new position" ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewPosition(e.target.value)}
                      />
                    </Grid>
                  ) : null}
                </Container>
                {permissionDialog ? (
                  <Grid>
                    <Grid
                      container
                      alignItems="center"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{ paddingTop: 10 }}
                    ></Grid>
                    <Divider
                      style={{
                        marginTop: 10,
                        backgroundColor: themeState.color,
                      }}
                    />
                    <Container disableGutters>
                      <Button
                        style={{ margin: 15 }}
                        variant="contained"
                        onClick={() => handleResetToDefault()}
                      >
                        Reset to Default
                      </Button>
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
                              backgroundColor: blue[themeState.colorlevel],
                              borderRadius: 2,
                              color: "white",
                            }}
                          />
                        }
                      >
                        {data.map((node) => renderTree(node))}
                      </TreeView>
                    </Container>
                  </Grid>
                ) : null}
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
            </Grid>
          </Grid>
          <DialogActions
            className={classes.root}
            style={{
              padding: 20,
              backgroundColor: themeState.paper,
              color: blue[themeState.colorlevel],
            }}
          >
            {!permissionDialog ? (
              <Grid item style={{ flexGrow: 1 }}>
                <Button
                  onClick={handlePermission}
                  variant="contained"
                  style={{ backgroundColor: "#20C1BB", color: "white" }}
                >
                  <VpnKeyOutlinedIcon style={{ marginRight: 15 }} />
                  Permission
                </Button>
              </Grid>
            ) : null}
            <Button
              onClick={handleDialogAddUserClose}
              variant="text"
              style={{ color: mainColor }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "#FFFFFF" }}
              onClick={() =>
                handleInsertUser(
                  editUserID,
                  editFirstName,
                  editLastName,
                  editStatus,
                  selectPosition,
                  chipRolesDialog,
                  editAD
                )
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* ---------------------------------------- */}
        {/* ==================== Dialog Edit User========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogEditUser}
          onClose={handleDialogEditUserClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid
              item
              xs={dialogRatio}
              sm={dialogRatio}
              md={dialogRatio}
              lg={dialogRatio}
              xl={dialogRatio}
            >
              <DialogTitle
                id="form-dialog-title"
                style={{
                  backgroundColor: themeState.paper,
                  color: mainColor,
                }}
              >
                Edit User
              </DialogTitle>
              <DialogContent style={headerTableStyle}>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditUserName(e.target.value)}
                        defaultValue={editUserName}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="AD Account"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditAD(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditFirstName(e.target.value)}
                        defaultValue={editFirstName}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Lastname"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // value={" "}
                        defaultValue={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                      ></TextField>
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
                      selectSelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                      label="Roles"
                      select
                      value={RoleValues}
                      onChange={(event, name) => handleSelectRoles(event, name)}
                    >
                      {roles.map((option) => (
                        <MenuItem
                          className={classes.root}
                          style={headerTableStyle}
                          key={option.key}
                          name={option.key}
                          value={option.label}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {chipRolesDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteRoles(data)}
                        />
                      );
                    })}
                  </Grid>
                  <Grid style={{ paddingTop: 10 }}>
                    <Divider />
                  </Grid>
                  <TextField
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    selectSelectProps={{
                      native: true,
                    }}
                    label="Property"
                    select
                    value={PropertyValues}
                    onChange={(event, name) =>
                      handleSelectProperty(event, name)
                    }
                  >
                    {properties.map((option) => (
                      <MenuItem
                        className={classes.root}
                        style={headerTableStyle}
                        key={option.key}
                        name={option.key}
                        value={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {chipPropertyDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteProperty(data)}
                      />
                    );
                  })}
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        value={selectPosition}
                        // defaultValue={selectPosition}
                        onChange={handleSelectPosition}
                      >
                        {position.map((option) => (
                          <option
                            style={headerTableStyle}
                            key={option.key}
                            value={option.label}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      container
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ alignContent: "center", padding: 20 }}
                    >
                      <FormControlLabel
                        label="Status"
                        labelPlacement="start"
                        value="Status"
                        control={
                          editStatus === "Active" || editStatus === "active" ? (
                            <Switch
                              defaultChecked={true}
                              color="primary"
                              onChange={(e) =>
                                e.target.checked
                                  ? setEditStatus("Active")
                                  : setEditStatus("Inactive")
                              }
                            />
                          ) : (
                            <Switch
                              defaultChecked={false}
                              color="primary"
                              onChange={(e) =>
                                e.target.checked
                                  ? setEditStatus("Active")
                                  : setEditStatus("Inactive")
                              }
                            />
                          )
                        }
                      />
                    </Grid>

                    {selectPosition == "Add new position" ? (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          className={classes.root}
                          id="outlined-basic"
                          label="Position"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setNewPosition(e.target.value)}
                        />
                      </Grid>
                    ) : null}
                  </Grid>
                </Container>

                {permissionDialog ? (
                  <Grid>
                    <Grid
                      container
                      alignItems="center"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{ paddingTop: 10 }}
                    ></Grid>
                    <Divider
                      style={{
                        marginTop: 10,
                        backgroundColor: themeState.color,
                      }}
                    />
                    <Container disableGutters>
                      <Button
                        style={{ margin: 15 }}
                        variant="contained"
                        onClick={() => handleResetToDefault()}
                      >
                        Reset to Default
                      </Button>
                      <TreeView
                        // className={classes.root}
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
                              backgroundColor: blue[themeState.colorlevel],
                              borderRadius: 2,
                              color: "white",
                            }}
                          />
                        }
                      >
                        {data.map((node) => renderTree(node))}
                      </TreeView>
                    </Container>
                  </Grid>
                ) : null}
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
                className={classes.root}
                style={{
                  padding: 20,
                  backgroundColor: themeState.paper,
                  color: mainColor,
                }}
              >
                <Grid container>
                  <Grid item style={{ flexGrow: 1 }}>
                    {!permissionDialog ? (
                      <Button
                        onClick={handlePermissionEdit}
                        variant="contained"
                        // color="#20C1BB"
                        style={{ backgroundColor: "#20C1BB", color: "white" }}
                      >
                        <VpnKeyOutlinedIcon style={{ marginRight: 15 }} />
                        Permission
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleDialogEditUserClose}
                      variant="text"
                      color="primary"
                      style={{ color: mainColor }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleSaveEdit(
                          editUserName,
                          editFirstName,
                          editLastName,
                          editStatus,
                          selectPosition,
                          chipRolesDialog,
                          editAD
                        )
                      }
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: mainColor }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>

        {/* ==================== Dialog Delete User========================= */}
        <Dialog
          className={classes.root}
          maxWidth="sm"
          open={dialogDeleteUser}
          onClose={handleDialogDeleteUserClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle
                id="form-dialog-title"
                style={{
                  color: mainColor,
                  backgroundColor: themeState.paper,
                }}
              >
                Confirm Delete User
              </DialogTitle>
              <DialogContent style={headerTableStyle}>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Username:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {editUserName}
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Firstname:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {editFirstName}
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Lastname:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {editLastName}
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
                      onClick={handleDialogDeleteUserClose}
                      variant="contained"
                      color="default"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm={6} md={6} lg={6} xl={6}>
                    <Button
                      fullWidth
                      onClick={() =>
                        handleDialogDelete(
                          editUserName,
                          editFirstName,
                          editLastName
                        )
                      }
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
