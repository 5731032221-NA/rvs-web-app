module.exports = async function (accessToken, id, username) {
  return fetch(
    `http://${
      process.env.REACT_APP_host || "localhost"
    }:8000/apis/propertypermission/${id}/${username}`,
    {
      method: "GET",
      headers: {
        Origin:
          "http://" + (process.env.REACT_APP_host || "localhost") + ":3000",
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
};
