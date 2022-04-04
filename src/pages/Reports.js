import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import detailData from './a.json';
import Button from "@material-ui/core/Button";
import datacsv from './csv.json';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import xlsx from 'node-xlsx';
import download from 'downloadjs';

// import * as actions from "../middleware/action";
// import { json } from 'express'
import { getReports,postPdfReports,downloadpdf, downloadExcel,postExcelReports } from "../services/reports.service";

// var detailData = require('./a.json');
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  selectPage: {
    minWidth: 90,
    textAlign: "center",
    flexGrow: 1,
  },
  searchLayout: {
    flexGrow: 1,

    marginLeft: 20,
    marginRight: 20,
  },
  root: (themeState) => ({
    "& label.MuiInputLabel-root": {
      color: themeState.color,
    },
    "& label.Mui-focused": {
      color: blue[themeState.colorlevel],
    },
    "& .MuiInput-underline:after": {
      borderColor: themeState.color,
      color: themeState.color,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey.500",
        color: themeState.color,
      },
      "&:hover fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
    },
    "&.MuiPaper-root": {
      backgroundColor: themeState.paper,
    },
    "&.MuiMenu-paper": {
      backgroundColor: themeState.paper,
    },
  }),
}));

export const Reports = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });

  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#666666",
        paper: "#FFFFFF",
        colorlevel: "A400",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
        holderColor: "A9A9AC",
        // matStyle: this.classes.darkmode
      });
    }
  }, [themeBackground]);

  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const maincolor = useSelector((state) => state.reducer.color);
  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setMainColor(maincolor);
    } else {
      setMainColor("#2D62ED");
    }
  }, [maincolor]);
  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);
  }, []);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const [reportsData, setReportsData] = useState("");
  const [titleTable, setTitleTable] = useState([]);
  const [titleExport, setTitleExport] = useState([]);
  const [rows, setRows] = useState([]);
  const dataBike = [
    { Cat1: "cat 1", Cat2: "sub cat 1", ProductDesc: 'productdesc', Amount: 300, freightAmt: 252.32 },
    { Cat1: "cat 2", Cat2: "sub cat 2", ProductDesc: 'productdesc', Amount: 200, freightAmt: 25.3 },
    { Cat1: "cat 2", Cat2: "sub cat 2", ProductDesc: 'productdesc', Amount: 100, freightAmt: 25.3 },
    { Cat1: "cat 2", Cat2: "sub cat 2", ProductDesc: 'productdesc555', Amount: 300, freightAmt: 25.3 },
    { Cat1: "cat 2", Cat2: "sub cat 2", ProductDesc: 'productdesc555', Amount: 500, freightAmt: 25.3 },
    { Cat1: "cat 2", Cat2: "sub cat 3", ProductDesc: 'productdesc555', Amount: 600, freightAmt: 25.3 },
  ]
  const [configBike, setConfigBike] = useState({
    rptName: "Chatchawarn Family",
    version: 1,
    createdDate: "2021-12-08T00:00:00.000Z",
    modifiedDate: "2021-12-08T00:00:00.000Z",
    production: true,
    defaultTitle: {
      title1: "12345",
      title2: "John Doe",
    },
    Columns: [
      {
        "ColTitle": "SubCategory",
        "rptData": "Cat2",
        "SubGroup": {
          "level": "2",
          "subDesc": "$",
        

        }
      },
      {
        "ColTitle": "Product Name",
        "rptData": "ProductDesc",
        "rptTotal": "COUNT"
      },
      {
        "ColTitle": "Sales Amount",
        "rptData": "Amount",
        "ColFormat": 2,
        "ColAlign": "right",
        "rptTotal": "SUM"
      },
     
      {
        "ColTitle": "Category",
        "rptData": "Cat1",
        "SubGroup": {
          "level": "1",
          "subDesc": "$",
          "SubPageBreak": "Y"
        }
      },
      {
        "ColTitle": "Freight",
        "rptData": "freightAmt",
        "ColFormat": 2,
        "ColAlign": "right",
        "rptTotal": "SUM"
      },
      {
        "ColTitle": "Tax Amount",
        "rptData": "Amount*7/100",
        "DataCal": ["Amount"],
        "ColFormat": 2,
        "ColAlign": "right",
        "rptTotal": "COUNT"
      },
      {
        "ColTitle": "Average Extended Amount",
        "rptData": "(Amount*7/100)+freightAmt",
        "DataCal": ["Amount", "freightAmt"],
        "ColFormat": 2,
        "ColAlign": "right",
        "rptTotal": "AVG"
      },
      {
        "ColTitle": "Faked Amount",
        "rptData": "Amount+freightAmt",
        DataCal: ["Amount", "freightAmt"],
        "ColFormat": 2,
        "ColAlign": "right",
        "rptTotal": "SUM"
      }
     


    ]
  });



  const [reportCongf, setReportCongf] = useState({
    rptName: "Chatchawarn Family",
    version: 1,
    createdDate: "2021-12-08T00:00:00.000Z",
    modifiedDate: "2021-12-08T00:00:00.000Z",
    production: true,
    defaultTitle: {
      title1: "12345",
      title2: "John Doe",
    },
    filters: {
      p1: {
        par: "rptDate",
        type: "Range",
        inputFormat: "dd/mm/yy hh:mm",
      },
    },
    Columns: [
      {
        ColTitle: "Property Name",
        rptData: "Property_desc",
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "Code",
        rptData: "Property",
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "Managed Type",
        rptData: "Property_Type",
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "Status",
        rptData: "Status",
        SubGroup: {
          level: "1",
          subDesc: "$",
          "SubPageBreak": "Y",
          "ColSum": ["No_of_Room"]
        },
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "#Rooms",
        rptData: "No_of_Room",
        rptTotal: "SUM",
        sum: 0,
        StatusSum: false,
        ColAlign: "right"
      },
      {
        ColTitle: "Category",
        rptData: "Hotel_Categories",
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "Country",
        rptData: "Country",
        SubGroup: {
          level: "2",
          subDesc: "$",
          
          "ColSum": ["No_of_Room"]
        },
        sum: 0,
        StatusSum: false,
      },
      {
        ColTitle: "Zone",
        rptData: "Zone_Chr",
        SubGroup: {
          level: "3",
          subDesc: "$",
          "ColSum": ["No_of_Room"]
        },

        sum: "Sum",
        StatusSum: false,
      },
    ],
    total: {
      TotalDesc: "Grand Total",
    },
    footer: "Y",
  });

  const [reportData, setReportData] = useState(
    {
      content: [
        {
          "id": 1, "reportid": 1, "reportjson":
            //  {"titles":[{"title":(sessionStorage.getItem("property")+" Department")},{"title":"12345"},{"title":"John Doe"}],"columns":[{"title":"Category","field":"Cat1"},{"title":"SubCategory","field":"Cat2"},{"title":"Product Name","field":"ProductDesc"},{"align":"right","title":"Sales Amount","field":"Amount"},{"align":"right","title":"Freight","field":"freightAmt"},{"align":"right","title":"Tax Amount","field":"Tax Amount"},{"align":"right","title":"Extended Amount","field":"Extended Amount"}],"details":[{"total":{"name":"cat1 total","column":"Cat1","value":{"Amount":"300.00","freightAmt":"252.32","Tax Amount":"21.00","Extended Amount":"273.32"}},"sub":[{"total":{"name":"cat4 total","column":"Cat2","value":{"Amount":"300.00","freightAmt":"252.32","Tax Amount":"21.00","Extended Amount":"273.32"}},"sub":[{"detail":[{"Cat1":"cat1","Cat2":"cat4","ProductDesc":"productdesc","Amount":"300.00","freightAmt":"252.32","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"21.00","Extended Amount":"273.32"}]}]}]},{"total":{"name":"cat2 total","column":"Cat1","value":{"Amount":"1700.00","freightAmt":"126.50","Tax Amount":"119.00","Extended Amount":"245.50"}},"sub":[{"total":{"name":"cat4 total","column":"Cat2","value":{"Amount":"1100.00","freightAmt":"101.20","Tax Amount":"77.00","Extended Amount":"178.20"}},"sub":[{"detail":[{"Cat1":"cat2","Cat2":"cat4","ProductDesc":"productdesc","Amount":"200.00","freightAmt":"25.30","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"14.00","Extended Amount":"39.30"},{"Cat1":"cat2","Cat2":"cat4","ProductDesc":"productdesc","Amount":"100.00","freightAmt":"25.30","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"7.00","Extended Amount":"32.30"},{"Cat1":"cat2","Cat2":"cat4","ProductDesc":"productdesc555","Amount":"300.00","freightAmt":"25.30","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"21.00","Extended Amount":"46.30"},{"Cat1":"cat2","Cat2":"cat4","ProductDesc":"productdesc555","Amount":"500.00","freightAmt":"25.30","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"35.00","Extended Amount":"60.30"}]}]},{"total":{"name":"cat5 total","column":"Cat2","value":{"Amount":"600.00","freightAmt":"25.30","Tax Amount":"42.00","Extended Amount":"67.30"}},"sub":[{"detail":[{"Cat1":"cat2","Cat2":"cat5","ProductDesc":"productdesc555","Amount":"600.00","freightAmt":"25.30","create_at":"2021-12-08T00:00:00.000Z","Tax Amount":"42.00","Extended Amount":"67.30"}]}]}]}],"grand_total":{"name":"Grand Total","column":"Cat1","value":{"Amount":"2000.00","freightAmt":"378.82","Tax Amount":"140.00","Extended Amount":"519.00"}}}
            { "titles": [{ "title": (sessionStorage.getItem("property")) }, { "title": "12345" }, { "title": "John Doe" }], "columns": [{ "title": "Category", "field": "Cat1" }, { "title": "SubCategory", "field": "Cat2" }, { "title": "Product Name", "field": "ProductDesc" }, { "align": "right", "title": "Sales Amount", "field": "Amount" }, { "align": "right", "title": "Freight", "field": "freightAmt" }, { "align": "right", "title": "Tax Amount", "field": "Tax Amount" }, { "align": "right", "title": "Extended Amount", "field": "Extended Amount" }], "details": [{ "total": { "name": "cat 1 total", "column": "Cat1", "value": { "Amount": "300.00", "freightAmt": "252.32", "Tax Amount": "21.00", "Extended Amount": "273.32" } }, "sub": [{ "total": { "name": "sub cat 1 total", "column": "Cat2", "value": { "Amount": "300.00", "freightAmt": "252.32", "Tax Amount": "21.00", "Extended Amount": "273.32" } }, "sub": [{ "detail": [{ "Cat1": "cat 1", "Cat2": "sub cat 1", "ProductDesc": "productdesc", "Amount": "300.00", "freightAmt": "252.32", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "21.00", "Extended Amount": "273.32" }] }] }] }, { "total": { "name": "cat 2 total", "column": "Cat1", "value": { "Amount": "1700.00", "freightAmt": "126.50", "Tax Amount": "119.00", "Extended Amount": "245.50" } }, "sub": [{ "total": { "name": "sub cat 2 total", "column": "Cat2", "value": { "Amount": "1100.00", "freightAmt": "101.20", "Tax Amount": "77.00", "Extended Amount": "178.20" } }, "sub": [{ "detail": [{ "Cat1": "cat 2", "Cat2": "sub cat 2", "ProductDesc": "productdesc", "Amount": "200.00", "freightAmt": "25.30", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "14.00", "Extended Amount": "39.30" }, { "Cat1": "cat 2", "Cat2": "sub cat 2", "ProductDesc": "productdesc", "Amount": "100.00", "freightAmt": "25.30", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "7.00", "Extended Amount": "32.30" }, { "Cat1": "cat 2", "Cat2": "sub cat 2", "ProductDesc": "productdesc555", "Amount": "300.00", "freightAmt": "25.30", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "21.00", "Extended Amount": "46.30" }, { "Cat1": "cat 2", "Cat2": "sub cat 2", "ProductDesc": "productdesc555", "Amount": "500.00", "freightAmt": "25.30", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "35.00", "Extended Amount": "60.30" }] }] }, { "total": { "name": "sub cat 3 total", "column": "Cat2", "value": { "Amount": "600.00", "freightAmt": "25.30", "Tax Amount": "42.00", "Extended Amount": "67.30" } }, "sub": [{ "detail": [{ "Cat1": "cat 2", "Cat2": "sub cat 3", "ProductDesc": "productdesc555", "Amount": "600.00", "freightAmt": "25.30", "create_at": "2021-12-08T00:00:00.000Z", "Tax Amount": "42.00", "Extended Amount": "67.30" }] }] }] }], "grand_total": { "name": "Grand Total", "column": "Cat1", "value": { "Amount": "2000.00", "freightAmt": "378.82", "Tax Amount": "140.00", "Extended Amount": "519.00" } } }
        }
      ]
    }
  )
  // function listData(data) {
  //   let subDatas = [];
  //   // data.forEach((groupData) => {
  //   Object.keys(data).forEach(function(key){
  //     if (data.hasOwnProperty("detail")) {
  //       console.log("data if",data)
  //       data.detail.forEach((row) => {
  //         subDatas.push(row);
  //       });
  //       subDatas.push(data[key].total);
  //     } else {
  //       console.log("data else",data)
  //       subDatas.push(...listData(data[key].sub));
  //       subDatas.push(data[key].total);
  //     }
  //   });
  //   return subDatas;
  // }

  function listData(data) {
    let subDatas = [];
    console.log(data)
    data.forEach((groupData) => {
      if (groupData.hasOwnProperty("detail")) {
        console.log("data if", groupData, groupData.detail)
        groupData.detail.forEach((row) => {
          subDatas.push(row);
          console.log("subDatas 2 ", subDatas)
        });
        // subDatas.push(groupData.total);
      } else {
        console.log("data else", data)
        subDatas.push(...listData(groupData.sub));
        subDatas.push({
          ...{ [groupData.total.column]: groupData.total.name },
          ...groupData.total.value
        });
      }
    });
    console.log("subDatas l ", subDatas)
    return subDatas;
  }

  function handleLab() {
    console.log("lab")
    a(datacsv, reportCongf);
    getReportsData();
  }

  function handleSample() {
    console.log("Sample")
    a(dataBike, configBike);
    getReportsData();
  }

 async function handleExcel() {
    console.log("Excel")
    // exportProductToExcel(products, title, titlesales, titlefrom, workSheetColumnName, workSheetName, filePath);
    try { 

      const resp = await postExcelReports(sessionStorage.getItem("auth"),reportData);
     

     await setTimeout( async () => {
        const res = await downloadExcel(sessionStorage.getItem("auth"),resp.name);
        //Create a Blob from the PDF Stream
        const blob = await res.blob();
        download(blob, resp.name + ".xlsx");
       
      }, 3000);
      
      
    } catch (error) {
      
    }

  }

  async function handlePDF() {
    console.log("PDF")
    console.log("reportData",reportData)
    try { 

      const resp = await postPdfReports(sessionStorage.getItem("auth"),reportData);
      

     await setTimeout( async () => {
        const res = await downloadpdf(sessionStorage.getItem("auth"),resp.name);
        //Create a Blob from the PDF Stream
        const blob = await res.blob();
        download(blob, resp.name + ".pdf");
      
      }, 3000);
      
      
    } catch (error) {
      
    }
     
    // pdf.create(html, option).toStream(function (err, stream) {
    //   stream.pipe(fs.createWriteStream("./report.pdf"));
    // });
  }

  

  async function getReportsData() {
    console.log("detailData", detailData)
    const newReportsData = reportData.content[0].reportjson;
    if (reportData) {
      setReportsData(reportData.content[0].reportjson);

      const getTitleTable = [];
      const getTitleExport = [];
      Object.values(newReportsData.titles).forEach((element) => {
        getTitleTable.push(element);
        // getTitleExport.push(element.title);
      });
      for (let i = 0; i < newReportsData.titles.length - 1; i++) {
        getTitleExport.push(newReportsData.titles[i].title);
      }
      setTitleTable(getTitleTable);
      setTitleExport(getTitleExport.join());

      // ==============================================
      console.log("newListData", newReportsData.grand_total.column, newReportsData.grand_total.name, {
        ...{ [newReportsData.grand_total.column]: newReportsData.grand_total.name },
        ...newReportsData.grand_total.value
      })
      let newListData = [];
      const newRowsTable = newReportsData.details;
      newListData.push(...listData(newRowsTable));
      // newListData.push(newReportsData.grand_total);
      newListData.push({
        ...{ [newReportsData.grand_total.column]: newReportsData.grand_total.name },
        ...newReportsData.grand_total.value
      })
      console.log("newListData", newListData)
      setRows(newListData);
      // console.table(JSON.stringify(newListData));
    }
  }

  React.useEffect(() => {

    getReportsData();
  }, []);

  const NewTitle = titleTable.map((title) => {
    return (
      <div>
        <Grid container justifyContent="center">
          <Typography
            variant="h6"
            noWrap
            style={{
              // fontSize: parseInt(title.style.fontSize),
              color: themeState.color,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              // fontWeight: title.style.fontWeight,
              marginLeft: 25,
            }}
          >
            {title.title}
          </Typography>
        </Grid>
      </div>
    );
  });

  function subGroups(data, groupList, level, config) {

    if (groupList.length == level) {
      data.forEach(row => {
        config.forEach(item => {
          // console.log(row,item.rptData,item.ColFormat)
          if (item.ColFormat && !item.DataCal) {
            row[item.rptData] = Number(row[item.rptData]).toFixed(item.ColFormat)
          }
        })

        // getTitleExport.push(element.title);

      });
      return [{
        // "total": data.reduce((sum, row) => sum + row.Amount, 0),
        detail: data,
      }];
    }
    else {
      let subData = []
      let subGroup = new Set();

      data.map(row => subGroup.add(row[groupList[level].rptData]))
      subGroup.forEach(subName => {

        const filterdData = data.filter(row =>
          row[groupList[level].rptData] == subName
        );

        filterdData.forEach((data, inx) => {
          if (config.length > 0) {

            config.forEach(item => {

              if (item.DataCal) {
                let asrptdata = item.rptData;
                item.DataCal.forEach(reitem => {
                  asrptdata = asrptdata.replace(reitem, filterdData[inx][reitem])
                });
                filterdData[inx][item.ColTitle] = eval(asrptdata).toFixed(item.ColFormat)
              }

            });
          }
        });

        let subNext = subGroups(filterdData, groupList, (level + 1), config);
        // console.log("filterdData:",filterdData.reduce((text , row) => text + row[groupList[level].rptData], ""));
        let sumdata = {};
        if (groupList[level].SubGroup.ColSum != undefined) {
          if (groupList[level].SubGroup.ColSum.length > 0) {
            groupList[level].SubGroup.ColSum.forEach(item => {
              if (config.length > 0) {
                let formator = 0;
                config.forEach(ic => {
                  if (ic.ColFormat != undefined && (ic.ColTitle == item || ic.rptData == item)) {
                    formator = ic.ColFormat
                  }
                });
                sumdata[item] = filterdData.reduce((sum, row) => Number(sum) + (isNaN(Number(row[item])) ? 0 : Number(row[item])), 0).toFixed(formator)
              } else {
                sumdata[item] = filterdData.reduce((sum, row) => Number(sum) + (isNaN(Number(row[item])) ? 0 : Number(row[item])), 0)
              }
            });
          }
        }

        if (groupList[level].SubGroup.ColCount != undefined) {
          if (groupList[level].SubGroup.ColCount.length > 0) {
            groupList[level].SubGroup.ColCount.forEach(item => {
              sumdata[item] = filterdData.reduce((sum, row) => Number(sum) + 1, 0)
            })
          }
        }


        if (groupList[level].SubGroup.ColAvg != undefined) {
          if (groupList[level].SubGroup.ColAvg.length > 0) {
            groupList[level].SubGroup.ColAvg.forEach(item => {
              let formator = 0;
              config.forEach(ic => {
                if (ic.ColFormat != undefined && (ic.ColTitle == item || ic.rptData == item)) {
                  formator = ic.ColFormat
                }
              });

              let dataArray = []
              filterdData.forEach(itemdata => {
                if (itemdata[item]) {
                  dataArray.push(itemdata[item])
                }
              });
              sumdata[item] = (dataArray.reduce((p, c) => Number(p) + Number(c), 0) / dataArray.length).toFixed(formator)
            })
          }
        }


        subData.push({
          total: {
            name: subName + " total",
            column: groupList[level].rptData,
            value: sumdata,
          },
          sub: subNext,
        })
      });
      return subData;
    }
  }

  const deepMergeSum = (obj1, obj2) => {
    return Object.keys(obj1).reduce((acc, key) => {
      if (typeof obj2[key] === 'object') {
        acc[key] = deepMergeSum(obj1[key], obj2[key]);
      } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
        acc[key] = Number(obj1[key]) + Number(obj2[key])
      }
      return acc;
    }, {});
  };



  async function a(dataBike, configBike) {

    // set title
    let title = [{ "title": (sessionStorage.getItem("property")) }]
    Object.keys(configBike.defaultTitle).forEach(function (key) {
      title.push({ "title": configBike.defaultTitle[key] })
    });
    // const title = [
    //   { "title": configBike.defaultTitle.title1 },
    //   { "title": configBike.defaultTitle.title2 },
    //   { "title": configBike.createdDate },
    // ];


    // var groupList = config.filter(conf => conf.hasOwnProperty("SubGroup"));
    //var groupList = reportCongf.Columns.filter(conf => conf.hasOwnProperty("SubGroup"));
    //   let title = []
    // Object.keys(configBike.defaultTitle).forEach(function(key){
    //   title.push({"title": configBike.defaultTitle[key]})
    // });
    // const title = [
    //   { "title": configBike.defaultTitle.title1 },
    //   { "title": configBike.defaultTitle.title2 },
    //   { "title": configBike.createdDate },
    // ];


    // var groupList = config.filter(conf => conf.hasOwnProperty("SubGroup"));
    //var groupList = reportCongf.Columns.filter(conf => conf.hasOwnProperty("SubGroup"));
    var groupList = configBike.Columns.filter(conf => conf.hasOwnProperty("SubGroup"));


    console.log("filter group", groupList)
    groupList.sort(function (x, y) { return x.SubGroup.level - y.SubGroup.level });
    console.log("sort by level", groupList)
    var setgroupList = [];
    groupList.forEach(item => {
      item.SubGroup['ColSum'] = []
      item.SubGroup['ColCount'] = []
      item.SubGroup['ColAvg'] = []
      configBike.Columns.forEach(iconfig => {

        if (iconfig.rptTotal) {
          if (iconfig.DataCal && iconfig.rptTotal == 'SUM') {
            item.SubGroup['ColSum'].push(iconfig.ColTitle)
          } else if (iconfig.DataCal && iconfig.rptTotal == 'COUNT') {
            item.SubGroup['ColCount'].push(iconfig.ColTitle)
          } else if (iconfig.DataCal && iconfig.rptTotal == 'AVG') {
            item.SubGroup['ColAvg'].push(iconfig.ColTitle)
          } else {

            if (iconfig.rptTotal == 'SUM') {
              item.SubGroup['ColSum'].push(iconfig.rptData)
            } else if (iconfig.rptTotal == 'COUNT') {
              item.SubGroup['ColCount'].push(iconfig.rptData)
            } else if (iconfig.rptTotal == 'AVG') {
              item.SubGroup['ColAvg'].push(iconfig.rptData)
            }


          }

        }
      });

      setgroupList.push(item)

    });


    var rows = [];
    // rows = subGroups(data, groupList, 0,config)
    //rows = subGroups(data22, groupList, 0,reportCongf.Columns)
    rows = subGroups(dataBike, setgroupList, 0, configBike.Columns)
    //  console.log("rows",rows)

    let grand_total_value = [];
    for (const [key, value] of Object.entries(rows)) {
      grand_total_value.push(value.total.value);
    }

    const result = grand_total_value.reduce((acc, obj) => acc = deepMergeSum(acc, obj));



    let totalValue = {};
    for (const key in result) {
      if (result.hasOwnProperty.call(result, key)) {
        let formator = 0;
        configBike.Columns.forEach(ic => {
          //reportCongf.Columns.forEach(ic => {
          //config.forEach(ic => {            
          if (ic.ColFormat != undefined && (ic.HdrTitle == key || ic.rptData == key)) {
            formator = ic.ColFormat
          }
          totalValue[key] = result[key].toFixed(formator)

        });

      }
    }

    var setcolums = []
    setcolums = setgroupList
    configBike.Columns.filter(conf => !conf.hasOwnProperty("SubGroup")).forEach(item => {
      setcolums.push(item)
    });


    let listColumns = []

    setcolums.forEach(element => {
      let align = {}
      if (element.ColAlign) align = { "align": "right" }
      if (element.DataCal) listColumns.push({ ...align, ...{ "title": element.ColTitle, "field": element.ColTitle } })
      else listColumns.push({ ...align, ...{ "title": element.ColTitle, "field": element.rptData } })
    });

    console.log("listColumns:", listColumns)
    configBike.Columns.forEach(item => {
      if (item.DataCal) {
        console.log(totalValue, item.ColTitle)
        if (item.ColFormat) totalValue[item.ColTitle] = parseFloat(totalValue[item.ColTitle]).toFixed(item.ColFormat)
      }
    })


    //set data return
    const retu = {
      titles: title,
      columns: listColumns,
      details: rows,
      grand_total: {
        "name": "Grand Total", "column": setgroupList[0].rptData,
        "value": totalValue
      }
    }
    console.log(configBike);
    setReportData({
      content: [
        {
          "id": 1, "reportid": 1, "reportjson":
            retu, "config": configBike
        }
      ]
    })
    //  console.log(JSON.stringify(retu))

    //   resp.content.push(retu);
    //   resp.status = "2000";
    //   resp.msg = "Success";
    //   res.send(resp);
    // } catch (error) {
    //   console.log(error);
    //   res.send(resp);
    // }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 20,
        color: themeState.color,
        marginTop: 15,
        backgroundColor: themeState.background,
      }}
    >
      <Button
        onClick={handleSample}
      >
        Data 1
      </Button>
      <Button
        onClick={handleLab}
      >
        Data 2
      </Button>

      <Button
        onClick={handleExcel}
      >
        Save Excel
      </Button>

      <Button
        onClick={handlePDF}
      >
        Save PDF
      </Button>

      <MaterialTable
        localization={{
          body: {
            emptyDataSourceMessage: (
              <>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ fontSize: 25, color: themeState.color }}
                >
                  <ErrorOutlineOutlinedIcon
                    style={{ fontSize: 100, color: "lightgray" }}
                  />
                </Typography>
                <Typography
                  align="center"
                  variant="h2"
                  style={{
                    fontWeight: 400,
                    fontSize: 30,
                    color: "rgb(0 0 0 / 47%)",
                    marginBottom: 20,
                  }}
                >
                  No Data Available
                </Typography>
                {/* <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    // onClick={() => handleNewData()}
                  >
                    New Data
                  </Button>
                </Grid> */}
              </>
            ),
          },
        }}
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          color: themeState.color,
          backgroundColor: themeState.paper,
        }}
        components={{
          Toolbar: (props) => (
            <Grid container style={{ paddingBottom: 10 }}>
              <Grid item xs={6} sm={4} md={4} lg={4} xl={4}></Grid>
              <Grid
                item
                justifyContent="center"
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
              >
                <MTableToolbar {...props} />
              </Grid>
            </Grid>
          ),
        }}
        title={NewTitle}
        columns={reportsData.columns}
        data={rows}
        options={{
          toolbar: true,
          showTitle: true,
          search: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, { value: rows.length, label: "All" }],
          headerStyle: headerTableStyle,
          exportButton: true,
          exportAllData: true,

          exportFileName: titleExport,
          rowStyle: (rowData) => {
            if (!rowData.Category || !rowData.SubCategory) {
              return { fontWeight: "bold" };
            }
            // else if (!rowData.SubCategory) {
            //   return { fontWeight: "bold", fontSize: 16 };
            // }
          },
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
