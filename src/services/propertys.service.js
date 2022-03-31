module.exports = async function (accessToken) {
  return (
    fetch(
      "http://" +
        (process.env.REACT_APP_host || "localhost") +
        ":8000/apis/menuproperty",
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    )
      // .then(data => data.json())
      .then((data) => data.json())
  );
};
