module.exports = {
  changeStatus: async function (accessToken, username, status) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/changestatus/${username}/${status}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  getUserComponentPermision: async function (accessToken, username, component) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/usercomponentpermision/${username}/${component}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  getUserNameByProperty: async function (accessToken, propertycode) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/usernamebyproperty/${propertycode}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  getConfigurationByPropertyCode: async function (accessToken, propertycode) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/configurationbypropertycode/${propertycode}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        // window.location.reload(false);
      } else return res.json();
    });
  },
  updateConfiguration: async function (accessToken, req) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/configuration`,
      {
        method: "PUT",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  getUserPermission: async function (accessToken, username) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/userpermissionbyusername/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  getPosition: async function (accessToken) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/position`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  postPosition: async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/position`,
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  userPropertyByUserName: async function (accessToken, username) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/userpropertybyusername/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  userRoleByUserName: async function (accessToken, username) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/userrolebyusername/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  rolePermissionByRole: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/rolepermissionbyrole",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  listRole: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/listrole",
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  listUser: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/listuser",
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  listPropertyByRoles: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/listpropertybyroles",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  listAllProperty: async function (accessToken) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/listallproperty",
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },

  postUser: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/user",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  updateUser: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/user",
      {
        method: "PUT",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  postRole: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/rolegroup",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  updateRole: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/rolegroup",
      {
        method: "PUT",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },

  deleteUserByUserName: async function (accessToken, username) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/user/${username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  deleteRoleByCode: async function (accessToken, code) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/rolegroup/${code}`,
      {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },

  getUserByID: async function (accessToken, id) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/listuser/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },

  deleteUserByID: async function (accessToken, req, id) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/listuser/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },

  getGroup: async function (accessToken) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/getADGroups`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
};
