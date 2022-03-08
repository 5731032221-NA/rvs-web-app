module.exports = async function (credentials) {
  return fetch(
    "http://" + (process.env.REACT_APP_host || "localhost") + ":8000/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then(async (data) => {
    let datajson = await data.json();
    console.log("au",data.headers.authorization)
    datajson.authorization = data.headers.authorization;
    // console.log("newdata",datajson)
    return datajson;
  });
};
