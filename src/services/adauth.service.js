module.exports = async function (username, password) {
  return fetch(
    "http://" + (process.env.REACT_APP_host || "localhost") + ":8000/ldapauth",
    {
      method: "GET",
      headers: {
        Authorization: "ldap " + btoa(username + ":" + password),
      },
    }
  ).then(async (data) => {
    let datajson = await data.json();
    // console.log("au",data.headers.authorization)
    datajson.authorization = data.headers.authorization;
    // console.log("newdata",datajson)
    return datajson;
  });
};
