export const EDIT_LANG = "EDIT_LANG";
export const EDIT_AUTHORIZATION = "EDIT_AUTHORIZATION";
export const EDIT_PROPERTYS = "EDIT_PROPERTYS";
export const EDIT_COLOR = "EDIT_COLOR";
export const EDIT_COMPWIDTH = "EDIT_COMPWIDTH";
export const EDIT_COMPONENT = "EDIT_COMPONENT";
export const EDIT_DARKMODE = "EDIT_DARKMODE";
export const EDIT_PROPERTY = "EDIT_PROPERTY";
export const EDIT_CONFIGSTATE = "EDIT_CONFIGSTATE";
export const EDIT_PERMISSION = "EDIT_PERMISSION";
export const EDIT_INDEXTAB = "EDIT_INDEXTAB";
export const EDIT_REDIRECT_INDIVIDUAL = "EDIT_REDIRECT_INDIVIDUAL";

export const editAuth = (auth) => {
  return (dispatch) => {
    // console.log("edit auth", auth);
    dispatch({
      type: EDIT_AUTHORIZATION,
      payload: auth,
    });
  };
};

export const editLang = (lang) => {
  return (dispatch) => {
    // console.log("edit lang", lang);
    dispatch({
      type: EDIT_LANG,
      payload: lang,
    });
  };
};

export const indexTab = (indexTab) => {
  return {
    type: EDIT_INDEXTAB,
    payload: {
      indextTab: indexTab,
    },
  };
};

export const nextComponent = (comp) => {
  return {
    type: EDIT_COMPONENT,
    payload: comp,
  };
};

export const permission = (permission) => {
  return {
    type: EDIT_PERMISSION,
    payload: {
      permission: permission,
    },
  };
};

export const editproperty = (property) => {
  return {
    type: EDIT_PROPERTY,
    payload: {
      property: property,
    },
  };
};

export const editRedirectToTableIndividual = (payload) => ({
  type: "EDIT_REDIRECT_INDIVIDUAL",
  payload,
});
