module.exports = {
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
  postRole: async function (accessToken, req) {
    return fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/listrole",
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
  getRoleByID: async function (accessToken, id) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/listrole/${id}`,
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
  updateRole: async function (accessToken, req, id) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/listrole/${id}`,
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
  deleteRoleByID: async function (accessToken, id) {
    return fetch(
      `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/listrole/${id}`,
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
};
