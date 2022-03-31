
module.exports = {
  getReports: async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports`,
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

      return res.json();
    });
  },
  downloadpdf:async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports/download_pdf?name=${req}`,
      {
        method: "GET",
        responseType: 'blob',
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        
        }
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else {
       
         return res;
      } 

      return res;
    });
  },
  downloadExcel:async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports/download_excel?name=${req}`,
      {
        method: "GET",
        responseType: 'blob',
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        
        }
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else {
       
         return res;
      } 

      return res;
    });
  },
  postPdfReports: async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports/pdf`,
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

      return res.json();
    });
  },
  postExcelReports: async function (accessToken, req) {
    return fetch(
      `http://${process.env.REACT_APP_host || "localhost"}:8000/apis/reports/excel`,
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

      return res.json();
    });
  },
};
