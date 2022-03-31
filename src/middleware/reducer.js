import { EDIT_LANG } from "./action";
import { EDIT_AUTHORIZATION } from "./action";
import { EDIT_PROPERTYS } from "./action";
import { EDIT_COLOR } from "./action";
import { EDIT_COMPWIDTH } from "./action";
import { EDIT_COMPONENT } from "./action";
import { EDIT_DARKMODE } from "./action";
import { EDIT_PROPERTY } from "./action";
import { EDIT_CONFIGSTATE } from "./action";
import { EDIT_PERMISSION } from "./action";
import { EDIT_INDEXTAB } from "./action";
import { EDIT_REDIRECT_INDIVIDUAL } from "./action";

const initialState = {
  users: [{ id: "0", name: "n" }],
  lang: "en",
  auth: "",
  propertys: [{ propertycode: "Novotel Pattaya" }],
  color: "#2D62ED",
  defaultColor: "#2D62ED",
  username: "",
  compwidth: 0,
  componentState: "",
  themeBackground: "#FFFFFF",
  fontColor: "black",
  property: "",
  role: "Admin",
  configState: "Configuration",
  permission: [],
  indextTab: "",
  redirectToTableIndividual: false,
};

const reducer = (state = initialState, action) => {
  //   console.log("themeBackground", state.themeBackground);
  //   console.log("color", state.color);
  if (action.type != EDIT_COMPWIDTH) {
    // console.log("action,payload", action.type, action.payload);
  }
  const allUsers = [...state.users];
  switch (action.type) {
    case EDIT_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    case EDIT_CONFIGSTATE:
      return {
        ...state,
        configState: action.payload,
      };
    case EDIT_PROPERTY:
      return {
        ...state,
        property: action.payload,
      };
    case EDIT_DARKMODE:
      return {
        ...state,
        themeBackground: action.payload,
      };
    case EDIT_COMPONENT:
      sessionStorage.setItem("curent_component", action.payload);
      return {
        ...state,
        componentState: action.payload,
      };
    case EDIT_COMPWIDTH:
      return {
        ...state,
        compwidth: action.payload,
      };
    case EDIT_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    case EDIT_PROPERTYS:
      return {
        ...state,
        propertys: action.payload,
      };
    case EDIT_AUTHORIZATION:
      return {
        ...state,
        auth: action.payload,
      };
    case EDIT_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    case EDIT_REDIRECT_INDIVIDUAL:
      console.log("redirectToTableIndividual", action.payload);
      return {
        ...state,
        redirectToTableIndividual: action.payload,
      };
    case "DEL_USER":
      const newState = {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
      };
      return newState;
    case "ADD_USER":
      const addedState = {
        ...state,
        users: [action.payload, ...state.users],
      };
      return addedState;
    case "EDIT_USER":
      const indexForEdit = allUsers.findIndex((item) => {
        return item.id === action.payload.id;
      });
      // console.log("index for editing", indexForEdit);
      allUsers[indexForEdit] = {
        id: action.id,
        name: action.name,
        email: action.email,
      };
      const editedState = {
        ...state,
        users: allUsers,
      };
      return editedState;
    case EDIT_INDEXTAB:
      // console.log(" action.payload:", action.payload);
      return {
        ...state,
        indextTab: action.payload,
      };
    default:
      break;
  }
  return state;
};
export default reducer;
