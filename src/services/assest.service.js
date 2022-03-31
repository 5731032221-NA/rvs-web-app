module.exports = {
  getAsset: async function () {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/auth/asset`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (data) => {
      let datajson = await data.json();
      // console.log("au",data.headers.authorization)
      datajson.authorization = data.headers.authorization;
      // console.log("newdata",datajson)
      return datajson;
    });
  },

  updateAsset: async function (accessToken, data) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/asset`,
      {
        method: "PUT",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        window.location.reload(false);
      } else return res.json();
    });
  },
};
