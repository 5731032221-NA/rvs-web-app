module.exports = async function (accessToken, id, username) {
  return fetch(
    `http://${
      process.env.REACT_APP_host || "localhost"
    }:8000/apis/propertyrole/${id}/${username}`,
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
      window.location.reload(false);
    } else return res.json();
  });
};
