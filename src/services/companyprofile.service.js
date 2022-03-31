module.exports = {
    getCompanyProfileCommunication: async function (accessToken, id) {
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/companyprofilecommunication/${id}`, {
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
    getCompanyProfileRelation: async function (accessToken, id) {
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/companyprofilerelation/${id}`, {
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
    getTAProfile: async function (accessToken) {
        return fetch(
            "http://" +
            (process.env.REACT_APP_host || "localhost") +
            ":8000/apis/taprofile", {
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
    getTAProfileById: async function (accessToken, id) {
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/taprofile/${id}`, {
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
    getCompanyProfile: async function (accessToken) {
        return fetch(
            "http://" +
            (process.env.REACT_APP_host || "localhost") +
            ":8000/apis/companyprofile", {
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
    postCompanyProfile: async function (accessToken, req) {
        return fetch(
            "http://" +
            (process.env.REACT_APP_host || "localhost") +
            ":8000/apis/companyprofile", {
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
    getCompanyProfileById: async function (accessToken, id) {
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/companyprofile/${id}`, {
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

    updateCompanyProfile: async function (accessToken, id, req) {
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/companyprofile/${id}`, {
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
    deleteCompanyProfileById: async function (accessToken, id) {
        console.log("deleteCompanyProfileById", id);
        return fetch(
            `http://${
        process.env.REACT_APP_host || "localhost"
      }:8000/apis/companyprofile/${id}`, {
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