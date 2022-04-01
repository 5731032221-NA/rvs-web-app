import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getConfigurationByPropertyCode } from "../../services/user.service";
import { nextComponent } from "../../middleware/action";
import DateFnsUtils from "@date-io/date-fns";
import {
  getCompanyProfileCommunication,
  getCompanyProfileRelation,
  postCompanyProfile,
  updateCompanyProfile,
  // getCompanyProfile,
  // getCompanyProfileById,
  // deleteCompanyProfileById,
} from "../../services/companyprofile.service";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  defaultTheme: (themeState) => ({
    backgroundColor: themeState.paper,
    color: themeState.color,
  }),
}));

const optionData = [
  {
    value: "1",
    label: "Option1",
  },
  {
    value: "2",
    label: "Option2",
  },
  {
    value: "3",
    label: "Option3",
  },
];
const optionData2 = [
  {
    value: "10",
    label: "Option10",
  },
  {
    value: "20",
    label: "Option20",
  },
  {
    value: "30",
    label: "Option30",
  },
  {
    value: "40",
    label: "Option40",
  },
];

const optionCurrency = [
  {
    value: "1",
    label: "Baht ฿",
  },
  {
    value: "2",
    label: "Dollar $",
  },
];

const optionCreditRating = [
  {
    value: "1",
    label: "5",
  },
  {
    value: "2",
    label: "4",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "2",
  },
  {
    value: "5",
    label: "1",
  },
];

const optionRelation = [
  {
    value: "employer",
    label: "employer",
  },
  {
    value: "parentcompany",
    label: "Parent Company",
  },
  {
    value: "childcompany",
    label: "Child Company",
  },
  {
    value: "ManagerProfile",
    label: "Manager",
  },
];

const optionCommunication = [
  {
    value: "Telephone",
    label: "Telephone Number",
  },
  {
    value: "Email",
    label: "Email Address",
  },
  {
    value: "Twitter",
    label: "Twitter",
  },
  {
    value: "Instagram",
    label: "Instagram",
  },
  {
    value: "Facebook",
    label: "Facebook",
  },
  {
    value: "TripAdvisor",
    label: "Trip Advisor",
  },
  {
    value: "www",
    label: "www",
  },
  {
    value: "BookingDotCom",
    label: "Booking Website",
  },
];

export const ProfileCompany = (props) => {
  // const { store } = useContext(ReactReduxContext);
  // const [action, setAction] = React.useState(props.action);

  // React.useEffect(async( ) => {
  //  console.log("props.action:",props.action);
  //              await handleAddDatatoDatabase();
  // },[props.action])

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
        color: "#000000",
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

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  // const [isRequired, setIsRequired] = React.useState(false);
  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  const pageProperty = useSelector((state) => state.reducer.property);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);

    async function handleInitialData() {
      let getConfigData = await getConfigurationByPropertyCode(
        sessionStorage.getItem("auth"),
        pageProperty
      );
      console.log("getConfigData:", getConfigData);
      let configData = getConfigData.content[getConfigData.content.length - 1];
      let optionTitle = await getList(configData, "PCINDTT");
      // let optionDocumentType = await getList(configData,"");
      console.log("optionTitle:", optionTitle);
      let optionGender = await getList(configData, "PCINDGD");
      console.log("optionGender:", optionGender);
      let relation = await getList(configData, "PCINDRL");
      console.log("relation:", relation);
      let communication = await getList(configData, "PCINDCM");
      console.log("communication:", communication);
      // let optionDocumentType = await getList(configData,"");

      console.log("propseditData:", props.editdata);
    }
    handleInitialData();
  }, []);

  async function getList(config, field) {
    for (var i = 0; i < config.length; i++) {
      var obj = config[i];
      if (obj.code === field) {
        let list = [];
        obj.children.forEach((element) =>
          list.push({
            value: element.name_en,
            label: element.name_en,
          })
        );
        return list;
      } else if (obj.children) {
        let getListData = await getList(obj.children, field);
        if (getListData) return getListData;
      }
    }
  }

  const [nameOne, setNameOne] = useState(
    props.editdata != null ? props.editdata[0].name : ""
  );
  const [nameTwo, setNameTwo] = React.useState(
    props.editdata != null ? props.editdata[0].name2 : ""
  );
  const [companyTypeCode, setCompanyTypeCode] = React.useState(
    props.editdata != null ? props.editdata[0].companytypecode : "Government"
  );
  const [abbreviation, setAbbreviation] = React.useState(
    props.editdata != null ? props.editdata[0].abbreviation : ""
  );
  const [guaranteeMethodCode, setGuaranteeMethodCode] = React.useState(
    props.editdata != null ? props.editdata[0].guaranteemethodcode : ""
  );
  const [property, setProperty] = React.useState(
    props.editdata != null ? props.editdata[0].property : "SPJ1"
  );
  const [currency, setCurrency] = React.useState(
    props.editdata != null ? props.editdata[0].currencycode : "THB"
  );
  const [creditRating, setCreditRating] = React.useState(
    props.editdata != null
      ? props.editdata[0].creditrating
      : optionCreditRating[0].value
  );
  const [IATA, setIATA] = React.useState(
    props.editdata != null ? props.editdata[0].iata : ""
  );
  const [status, setStatus] = React.useState(
    props.editdata != null ? props.editdata[0].statuscode : true
  );
  const [streetAddress, setStreetAddress] = React.useState(
    props.editdata != null ? props.editdata[0].address : ""
  );
  const [chooseCountry, setChooseCountry] = React.useState(
    props.editdata != null ? props.editdata[0].countrycode : ""
  );
  const [city, setCity] = React.useState(
    props.editdata != null ? props.editdata[0].city : ""
  );
  const [stateProvince, setStateProvince] = React.useState(
    props.editdata != null ? props.editdata[0].stateprovince : ""
  );
  const [postal, setPostal] = React.useState(
    props.editdata != null ? props.editdata[0].postalcode : 0
  );
  const [sameAsAddress, setSameAsAddress] = React.useState(false);

  const [BStreetAddress, setBStreetAddress] = React.useState(
    props.editdata != null ? props.editdata[0].billingaddress : ""
  );
  const [BChooseacountry, setBChooseacountry] = React.useState(
    props.editdata != null ? props.editdata[0].billingcountrycode : ""
  );
  const [BCity, setBCity] = React.useState(
    props.editdata != null ? props.editdata[0].billingcity : ""
  );
  const [BState, setBState] = React.useState(
    props.editdata != null ? props.editdata[0].billingstateprovince : ""
  );
  const [BPostal, setBPostal] = React.useState(
    props.editdata != null ? props.editdata[0].billingpostalcode : 0
  );
  const [TaxID, setTaxID] = React.useState(
    props.editdata != null ? props.editdata[0].taxid : ""
  );
  const [TaxID2, setTaxID2] = React.useState(
    props.editdata != null ? props.editdata[0].taxid2 : ""
  );

  const [creditCardNumber, setCreditCardNumber] = React.useState(
    props.editdata != null ? props.editdata[0].creditcardid : 0
  );
  const [outstandingAmount, setOutstandingAmount] = React.useState(
    props.editdata != null ? props.editdata[0].outstandingamout : 0
  );
  const [floatingDepositionAmount, setFloatingDepositionAmount] =
    React.useState(
      props.editdata != null ? props.editdata[0].floatingdepositamount : 0
    );
  const [ARNumber, setARNumber] = React.useState(
    props.editdata != null ? props.editdata[0].ar_number : 0
  );
  const [salesUserName, setSalesUserName] = React.useState(
    props.editdata != null ? props.editdata[0].salesusername : ""
  );
  const [industry, setIndustry] = React.useState(
    props.editdata != null ? props.editdata[0].industrycode : "Insurrance"
  );
  const [marketSegment, setMarketSegment] = React.useState(
    props.editdata != null ? props.editdata[0].marketsegmentcode : "Code1"
  );
  const [sourceOfBusiness, setSourceOfBusiness] = React.useState(
    props.editdata != null ? props.editdata[0].sourceofbusinesscode : "Code1"
  );
  const [trackCode, setTrackCode] = React.useState(
    props.editdata != null ? props.editdata[0].trackcode : "Code1"
  );
  const [reasonForStay, setReasonForStay] = React.useState(
    props.editdata != null ? props.editdata[0].reasonforstaycode : "Code1"
  );
  const [geographic, setGeographic] = React.useState(
    props.editdata != null ? props.editdata[0].geographiccode : "SEA"
  );
  const [rateContractCode, setRateContractCode] = React.useState(
    props.editdata != null ? props.editdata[0].ratecontractcode : ""
  );
  const [negotiatedRateOnly, setNegotiatedRatesOnly] = React.useState(
    props.editdata != null ? props.editdata[0].negotiatedratesonly : false
  );

  const [communicationDatas, setCommunicationDatas] = React.useState({});

  const [communication, setCommunication] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [relationDatas, setRelationDatas] = React.useState({});
  const [isRequired, setIsRequired] = React.useState(false);

  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    async function getConfig() {
      updateList();
      console.log("list:", list);
    }
    getConfig();
  }, []);

  async function updateList() {
    let commu = JSON.parse(JSON.stringify(communicationDatas));
    let rela = JSON.parse(JSON.stringify(relationDatas));
    let getCommunicationsDatas = {};
    let getComunication = [];
    let getRelation = [];
    console.log("demoState");
    if (
      props.editdata != null &&
      Object.keys(commu).length === 0 &&
      Object.keys(rela).length === 0
    ) {
      console.log("props.editdata", props.editdata);
      let getCommunications = await getCompanyProfileCommunication(
        sessionStorage.getItem("auth"),
        props.editdata[0].id
      );
      let getRelations = await getCompanyProfileRelation(
        sessionStorage.getItem("auth"),
        props.editdata[0].id
      );
      console.log("getCommunications.contents", getCommunications.contents);
      let count = 1;
      getCommunications.contents[0].forEach((element) => {
        const commuid1 = count;
        const commuid2 = count + 1;
        if (element.communication == "email") {
          getCommunicationsDatas.email = element.value;
        } else if (element.communication == "mobile") {
          getCommunicationsDatas.mobile = element.value;
        } else {
          setCommunicationDatas((prev) => ({
            ...prev,
            [count]: element.communication,
            [count + 1]: element.value,
          }));
          getComunication.push({
            id: commuid1,
            label: "Choose a communication",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "option",
              data: optionCommunication.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.value == element.communication}
                  // defaultValue={element.communication}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                [commuid1]: e.target.value,
              })),
          });
          getComunication.push({
            id: commuid2,
            label: "communication",
            xl: 9,
            md: 9,
            xs: 6,
            select: {
              status: "fillnolabel",
              data: "",
              defaultvalue: element.value,
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                [commuid2]: e.target.value,
              })),
          });
          count = count + 2;
        }
      });
      let relationid = 1;
      console.log(getRelations.contents[0]);

      getRelations.contents[0].forEach((element) => {
        const relaid1 = relationid;
        const relaid2 = relationid + 1;
        const relaid3 = relationid + 2;
        setRelationDatas((prev) => ({
          ...prev,
          [relationid + 1]: element.relation,
          [relationid]: element.value,
          [relationid + 2]: element.note,
        }));
        getRelation.push({
          id: relaid2,
          label: "Name Type",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: optionRelation.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
                selected={option.value == element.relation}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) =>
            setRelationDatas((prev) => ({
              ...prev,
              [relaid2]: e.target.value,
            })),
        });
        getRelation.push({
          id: relaid1,
          label: "Name",
          xl: 4,
          md: 4,
          xs: 6,
          select: {
            status: "fill",
            data: "",
            defaultvalue: element.value,
          },
          handle: (e) =>
            setRelationDatas((prev) => ({
              ...prev,
              [relaid1]: e.target.value,
            })),
        });
        getRelation.push({
          id: relaid3,
          label: "Note",
          xl: 6,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
            defaultvalue: element.note,
          },
          handle: (e) =>
            setRelationDatas((prev) => ({
              ...prev,
              [relaid3]: e.target.value,
            })),
        });
        relationid = relationid + 3;
      });
      console.log("getRelation", getRelation);
    } else {
      let count = 3;
      console.log("commu", commu);
      console.log("rela", rela);
      for (var key in commu) {
        if (key % 2 == 0) {
          const commuid1 = count;
          const commuid2 = count + 1;
          getComunication.push({
            id: commuid1,
            label: "Choose a communication",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "option",
              data: optionCommunication.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.label == commu[key - 1]}
                  // defaultValue={element.communication}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                [commuid1]: e.target.value,
              })),
          });
          getComunication.push({
            id: commuid2,
            label: "communication",
            xl: 9,
            md: 9,
            xs: 6,
            select: {
              status: "fillnolabel",
              data: "",
              defaultvalue: commu[key],
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                [commuid2]: e.target.value,
              })),
          });
          count = count + 2;
        }
      }

      let relationid = 1;
      for (var key in rela) {
        if (key % 3 == 0) {
          const relaid1 = relationid;
          const relaid2 = relationid + 1;
          const relaid3 = relationid + 2;
          getRelation.push({
            id: relaid2,
            label: "Name Type",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionRelation.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.label == rela[key - 1]}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relaid2]: e.target.value,
              })),
          });
          getRelation.push({
            id: relaid1,
            label: "Name",
            xl: 4,
            md: 4,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: rela[key - 2],
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relaid1]: e.target.value,
              })),
            dataType: "string",
            dataCheck: true,
          });
          getRelation.push({
            id: relaid3,
            label: "Note",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue: rela[key],
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relationid + 2]: e.target.value,
              })),
            dataType: "string",
            dataCheck: true,
          });
          relationid = relaid3;
        }
      }
    }

    setList([
      {
        id: "1",
        title: "Company Account",
        expend: true,
        content: [
          {
            id: 1,
            label: "Company Name1",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].name : "",
            },
            handle: (e) => setNameOne(e.target.value),
            dataType: "string",
            dataCheck: nameOne,
          },
          {
            id: 2,
            label: "Company Name2",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].name2 : "",
            },
            handle: (e) => setNameTwo(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 3,
            label: "Company Type",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Government" }, { label: "Association" }].map(
                (option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )
              ),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].companytypecode
                  : "Government",
            },
            handle: (e) => setCompanyTypeCode(e.target.value),
          },
          {
            id: 4,
            label: "Abbreviation",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].abbreviation : "",
            },
            handle: (e) => setAbbreviation(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 5,
            label: "Hotel Origin",
            xl: 4,
            md: 4,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "SPJ1" }, { label: "SPJ2" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata[0].property : "SPJ1",
            },
            handle: (e) => setProperty(e.target.value),
          },
          {
            id: 6,
            label: "Guarantee Method",
            xl: 4,
            md: 4,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].guaranteemethodcode
                  : "",
            },
            handle: (e) => setGuaranteeMethodCode(e.target.value),
            dataType: "string",
            dataCheck: guaranteeMethodCode,
          },
          {
            id: 7,
            label: "Currency",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "THB" }, { label: "USD" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata[0].currencycode : "THB",
            },
            handle: (e) => setCurrency(e.target.value),
          },
          {
            id: 8,
            label: "Credit Rating",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "option",
              data: optionCreditRating.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].creditrating
                  : optionCreditRating[0].value,
            },
            handle: (e) => setCreditRating(e.target.value),
          },
          {
            id: 9,
            label: "IATA",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].iata : "",
            },
            handle: (e) => setIATA(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 10,
            label: "Status",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "status",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].statuscode : status,
            },
            handle: (e) => setStatus(e.target.checked),
          },
        ],
      },
      {
        id: "2",
        title: "Address",
        expend: true,
        content: [
          {
            id: 1,
            label: "Address",
            xl: 12,
            md: 12,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].address : "",
            },
            handle: (e) => setStreetAddress(e.target.value),
            dataType: "string",
            dataCheck: streetAddress,
          },
          {
            id: 5,
            label: "Country",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].countrycode : "",
            },
            dataCheck: chooseCountry,
            handle: (e) => setChooseCountry(e.target.value),
          },
          {
            id: 6,
            label: "City",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].city : "",
            },
            handle: (e) => setCity(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 7,
            label: "State",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].stateprovince : "",
            },
            handle: (e) => setStateProvince(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 8,
            label: "Postal",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].postalcode : 0,
            },
            handle: (e) => setPostal(e.target.value),
            dataType: "number",
            dataCheck: true,
          },
        ],
      },
      {
        id: "3",
        title: "Billing Address",
        expend: true,
        content: [
          {
            id: 1,
            label: "same as billing address",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "check",
              data: "",
            },
            handle: (e) => setSameAsAddress(e.target.checked),
          },
          {
            id: 2,
            label: "Address",
            xl: 12,
            md: 12,
            xs: 12,
            select: {
              status: "fill",
              data: BStreetAddress,
              defaultvalue:
                props.editdata != null ? props.editdata[0].billingaddress : "",
            },
            handle: (e) => setBStreetAddress(e.target.value),
            dataType: "string",
            dataCheck: sameAsAddress ? true : BStreetAddress,
            disable: sameAsAddress,
          },
          {
            id: 5,
            label: "Billing Country",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: BChooseacountry,
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].billingcountrycode
                  : "",
            },
            handle: (e) => setBChooseacountry(e.target.value),
            dataCheck: sameAsAddress ? true : BChooseacountry,
            disable: sameAsAddress,
          },
          {
            id: 6,
            label: "City",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: BCity,
              defaultvalue:
                props.editdata != null ? props.editdata[0].billingcity : "",
            },
            handle: (e) => setBCity(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: sameAsAddress,
          },
          {
            id: 7,
            label: "State",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: BState,
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].billingstateprovince
                  : "",
            },
            handle: (e) => setBState(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: sameAsAddress,
          },
          {
            id: 8,
            label: "Postal",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: sameAsAddress ? "" : BPostal,
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].billingpostalcode
                  : 0,
            },
            handle: (e) => setBPostal(e.target.value),
            dataType: "number",
            dataCheck: true,
            disable: sameAsAddress,
          },
          {
            id: 9,
            label: "TaxID",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].taxid : "",
            },
            handle: (e) => setTaxID(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: false,
          },
          {
            id: 10,
            label: "TaxID2",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].taxid2 : "",
            },
            handle: (e) => setTaxID2(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: false,
          },
        ],
      },
      {
        id: "4",
        title: "Communication",
        expend: true,
        content: [
          ...getComunication,
          {
            id: 99,
            label: "Phone Number",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "AddComunication",
              data: "+ More Communication",
            },
          },
        ],
      },
      {
        id: "5",
        title: "Relationship (Internal)",
        expend: true,
        content: [
          ...getRelation,
          {
            id: 99,
            label: "Relation",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "AddRelation",
              data: "+ More Relation",
            },
            // handle: (e) => handleAddComunication(e),
          },
        ],
      },
      {
        id: "6",
        title: "A/R Number",
        expend: true,
        content: [
          // {
          //   id: 1,
          //   label: "IATA",
          //   xl: 3,
          //   md: 3,
          //   xs: 12,
          //   select: {
          //     status: "fill",
          //     data: "",
          //   },
          //   handle: (e) => handleData(e),
          // },
          {
            id: 2,
            label: "Credit Card Number",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].creditcardid : "",
            },
            handle: (e) => setCreditCardNumber(e.target.value),
            dataType: "number",
            dataCheck: true,
            disable: false,
          },
          {
            id: 3,
            label: "Outstanding Amount",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].outstandingamout
                  : "",
            },
            handle: (e) => setOutstandingAmount(e.target.value),
            dataType: "number",
            dataCheck: true,
            disable: false,
          },
          {
            id: 4,
            label: "Floating Deposition Amount",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].floatingdepositamount
                  : "",
            },
            handle: (e) => setFloatingDepositionAmount(e.target.value),
            dataType: "number",
            dataCheck: true,
            disable: false,
          },
          {
            id: 5,
            label: "AR Number",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].ar_number : "",
            },
            handle: (e) => setARNumber(e.target.value),
            dataType: "number",
            dataCheck: true,
            disable: false,
          },
        ],
      },
      // {
      //   id: "6",
      //   title: "More Information",
      //   expend: true,
      //   content: [
      //     {
      //       id: 1,
      //       label: "Tax ID",
      //       xl: 3,
      //       md: 6,
      //       xs: 12,
      //       select: {
      //         status: "fill",
      //         data: "",
      //       },
      //       handle: (e) => handleData(e),
      //     },
      //     {
      //       id: 2,
      //       label: "Billing Instruction",
      //       xl: 3,
      //       md: 6,
      //       xs: 12,
      //       select: {
      //         status: "option",
      //         data: optionData.map((option) => (
      //           <option
      //             style={headerTableStyle}
      //             key={option.value}
      //             value={option.value}
      //           >
      //             {option.label}
      //           </option>
      //         )),
      //       },
      //       handle: (e) => handleData(e),
      //     },
      //   ],
      // },

      {
        id: "7",
        title: "Rate/Contract Information",
        expend: false,
        content: [
          {
            id: 1,
            label: "Negotiated Rates Only",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "check",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].negotiatedratesonly
                  : "",
            },
            handle: (e) => setNegotiatedRatesOnly(e.target.checked),
          },
          {
            id: 2,
            label: "Rate Contract",
            xl: 2,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].ratecontractcode
                  : "",
            },
            handle: (e) => setRateContractCode(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: false,
          },
        ],
      },
      {
        id: "8",
        title: "Sales Information",
        expend: false,
        content: [
          {
            id: 1,
            label: "Sales User Name",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata[0].salesusername : "",
            },
            handle: (e) => setSalesUserName(e.target.value),
            dataType: "string",
            dataCheck: true,
            disable: false,
          },
          {
            id: 2,
            label: "Industry",
            xl: 2,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [
                { label: "Insurrance" },
                { label: "Government" },
                { label: "Educcation" },
              ].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].industrycode
                  : "Insurrance",
            },
            handle: (e) => setIndustry(e.target.value),
          },
          // {
          //   id: 3,
          //   label: "IATA",
          //   xl: 3,
          //   md: 6,
          //   xs: 12,
          //   select: {
          //     status: "fill",
          //     data: ""
          //   },
          //   handle: (e) => handleData(e),
          // },
          {
            id: 4,
            label: "Market Segment",
            xl: 4,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].marketsegmentcode
                  : "Code1",
            },
            handle: (e) => setMarketSegment(e.target.value),
          },
          {
            id: 5,
            label: "Source Of Business",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].sourceofbusinesscode
                  : "Code1",
            },
            handle: (e) => setSourceOfBusiness(e.target.value),
          },
          {
            id: 6,
            label: "Track Code",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata[0].trackcode : "Code1",
            },
            handle: (e) => setTrackCode(e.target.value),
          },
          {
            id: 7,
            label: "Reason For Stay",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].reasonforstaycode
                  : "Code1",
            },
            handle: (e) => setReasonForStay(e.target.value),
          },
          {
            id: 8,
            label: "Geographic",
            xl: 3,
            md: 6,
            xs: 12,
            select: {
              status: "option",
              data: [
                { label: "SEA" },
                { label: "EUROPE" },
                { label: "CHINA" },
                { label: "AFRICA" },
              ].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.label}
                  value={option.label}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata[0].geographiccode
                  : "SEA",
            },
            handle: (e) => setGeographic(e.target.value),
          },
          // ,
          // {
          //   id: "1",
          //   title: "Commission",
          //   expend: true,
          //   content: [
          //     {
          //       id: 1,
          //       label: "Commission Flag",
          //       xl: 3,
          //       md: 3,
          //       xs: 12,
          //       select: {
          //         status: "option",
          //         data: [{ label: "Pay" }, { label: "Not Pay" }].map((option) => (
          //           <option
          //             style={headerTableStyle}
          //             key={option.label}
          //             value={option.label}
          //           >
          //             {option.label}
          //           </option>
          //         )),
          //       }
          //     },
          //     {
          //       id: 2,
          //       label: "Commission Type",
          //       xl: 3,
          //       md: 3,
          //       xs: 12,
          //       select: {
          //         status: "option",
          //         data: [{ label: "Percent" }, { label: "Amount" }].map((option) => (
          //           <option
          //             style={headerTableStyle}
          //             key={option.label}
          //             value={option.label}
          //           >
          //             {option.label}
          //           </option>
          //         )),
          //       },
          //     },
          //   ]
          // }
        ],
      },
    ]);
    // }
    // getconfig();
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setList(reorder(list, result.source.index, result.destination.index));
    console.log(result);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "lightblue",
    }),
  });

  const handleAddDatatoDatabase = async (e) => {
    // props.setAction("none");
    // const checkvali = await checkvalidate();
    // if(checkvali){
    //   setIsRequired(true);
    // } else {
    //   setIsRequired(false);
    let index = list.findIndex((x) => x.title == "Communication");
    let communications = list[index];
    console.log("communications:", communications);
    // let index = list.findIndex((x) => x.title == "Communication");
    let relations = list[index];
    console.log("relations:", relations);
    let req = {
      recordtype: "C",
      nameOne: nameOne,
      nameTwo: nameTwo,
      companyTypeCode: companyTypeCode,
      abbreviation: abbreviation,
      guaranteeMethodCode: guaranteeMethodCode,
      property: property,
      currency: currency,
      creditRating: creditRating,
      IATA: IATA,
      status: status,
      streetAddress: streetAddress,
      chooseCountry: chooseCountry,
      city: city,
      stateProvince: stateProvince,
      postal: postal,
      BStreetAddress: BStreetAddress,
      BChooseacountry: BChooseacountry,
      BCity: BCity,
      BState: BState,
      BPostal: BPostal,
      TaxID: TaxID,
      TaxID2: TaxID2,
      communication: communication,
      relationship: relationship,
      creditCardNumber: creditCardNumber,
      outstandingAmount: outstandingAmount,
      floatingDepositionAmount: floatingDepositionAmount,
      ARNumber: ARNumber,
      salesUserName: salesUserName,
      industry: industry,
      marketSegment: marketSegment,
      sourceOfBusiness: sourceOfBusiness,
      trackCode: trackCode,
      reasonForStay: reasonForStay,
      geographic: geographic,
      negotiatedRateOnly: negotiatedRateOnly,
      rateContractCode: rateContractCode,
      communications: communicationDatas,
      relations: relationDatas,
    };

    console.log("datafrom post", req);
    const resp = await postCompanyProfile(sessionStorage.getItem("auth"), req);

    if (resp.status == "2000") {
      props.setAction("success");
    } else {
      props.setAction("dupic");
      setErrorParameter(resp.msg);
      setErrorMessage(true);
    }

    // console.log("datafrom post", data);
    // }
  };

  const handleAddDataEdittoDatabase = async (e) => {
   try {
    props.setAction("none");

    let req = {
      recordtype: "C",
      nameOne: nameOne,
      nameTwo: nameTwo,
      companyTypeCode: companyTypeCode,
      abbreviation: abbreviation,
      guaranteeMethodCode: guaranteeMethodCode,
      property: property,
      currency: currency,
      creditRating: creditRating,
      IATA: IATA,
      status: status,
      streetAddress: streetAddress,
      chooseCountry: chooseCountry,
      city: city,
      stateProvince: stateProvince,
      postal: postal,
      BStreetAddress: BStreetAddress,
      BChooseacountry: BChooseacountry,
      BCity: BCity,
      BState: BState,
      BPostal: BPostal,
      TaxID: TaxID,
      TaxID2: TaxID2,
      communication: communication,
      relationship: relationship,
      creditCardNumber: creditCardNumber,
      outstandingAmount: outstandingAmount,
      floatingDepositionAmount: floatingDepositionAmount,
      ARNumber: ARNumber,
      salesUserName: salesUserName,
      industry: industry,
      marketSegment: marketSegment,
      sourceOfBusiness: sourceOfBusiness,
      trackCode: trackCode,
      reasonForStay: reasonForStay,
      geographic: geographic,
      negotiatedRateOnly: negotiatedRateOnly,
      rateContractCode: rateContractCode,
      communications: communicationDatas,
      relations: relationDatas,
    };
    console.log("datafrom update", req);

    const resp = await updateCompanyProfile(
      sessionStorage.getItem("auth"),
      props.editdata[0].id,
      req
    );

    if (resp.status == "2000") {
      console.log("success:",resp);
      props.setAction("success");
    } else {
      props.setAction("dupic");
      setErrorParameter(resp.msg);
      setErrorMessage(true);
    }
     
   } catch (error) {
     console.log("error:",error);
   }
  };

  React.useEffect(() => {
    async function handleSameAddress() {
      if (sameAsAddress === true) {
        // await setBStreetAddress(null);
        // await setBChooseacountry(null);
        // await setBCity(null);
        // await setBState(null);
        // await setBPostal(null);
        // await updateList();
      }
      await updateList();
    }
    handleSameAddress();
    console.log("sameAsAddress:", sameAsAddress);
  }, [
    sameAsAddress,

    // BStreetAddress, BChooseacountry, BCity, BState, BPostal
  ]);

  const [validationStatus, setValidationStatus] = React.useState(true);
  const [initial , setInitial] = React.useState(true);
  React.useEffect(() => {
    let _IsRequired;
    if(!initial){
    if (!sameAsAddress) {
      console.log("sameAsAddress22:", sameAsAddress);
      _IsRequired =
        nameOne === null ||
        // abbreviation === null ||
        guaranteeMethodCode === null ||
        // IATA === null ||
        streetAddress === null ||
        chooseCountry === null ||
        // city === null ||
        // stateProvince === null ||
        postal === null ||
        BStreetAddress === null ||
        BChooseacountry === null ||
        // BCity === null ||
        // BState === null ||
        // BPostal === null ||
        // TaxID === null ||
        industry === null ||
        marketSegment === null ||
        sourceOfBusiness === null ||
        trackCode === null ||
        reasonForStay === null ||
        geographic === null ||
        nameOne.trim() === "" ||
        // abbreviation.trim() === "" ||
        guaranteeMethodCode.trim() === "" ||
        // IATA.trim() === "" ||
        streetAddress.trim() === "" ||
        chooseCountry.trim() === "" ||
        // city.trim() === "" ||
        // stateProvince.trim() === "" ||
        // postal === 0 ||
        BStreetAddress.trim() === "" ||
        BChooseacountry.trim() === "" ||
        // BCity.trim() === "" ||
        // BState.trim() === "" ||
        // BPostal === 0 ||
        // TaxID.trim() === "" ||
        industry.trim() === "" ||
        marketSegment.trim() === "" ||
        sourceOfBusiness.trim() === "" ||
        trackCode.trim() === "" ||
        reasonForStay.trim() === "" ||
        geographic.trim() === "";
    } else {
      _IsRequired =
        nameOne === null ||
        guaranteeMethodCode === null ||
        streetAddress === null ||
        chooseCountry === null ||
        postal === null ||
        industry === null ||
        marketSegment === null ||
        sourceOfBusiness === null ||
        trackCode === null ||
        reasonForStay === null ||
        geographic === null ||
        nameOne.trim() === "" ||
        guaranteeMethodCode.trim() === "" ||
        industry.trim() === "" ||
        marketSegment.trim() === "" ||
        sourceOfBusiness.trim() === "" ||
        trackCode.trim() === "" ||
        reasonForStay.trim() === "" ||
        geographic.trim() === "";
    }

    console.log("_IsRequired:",_IsRequired);
    setValidationStatus(_IsRequired);
    if (_IsRequired === false) {
      setIsRequired(false);
      // props.handleRedirectToTableIndividual(true);
    } else {
      setIsRequired(true);
      // props.handleRedirectToTableIndividual(false);
    }
    updateList();
  }
 
  }, [
    initial,
    abbreviation,
    chooseCountry,
    guaranteeMethodCode,
    IATA,
    streetAddress,
    city,
    stateProvince,
    postal,
    BStreetAddress,
    BCity,
    BState,
    BPostal,
    TaxID,
    industry,
    marketSegment,
    sourceOfBusiness,
    trackCode,
    reasonForStay,
    geographic,
    nameOne,
    guaranteeMethodCode,
    streetAddress,
    postal,
    industry,
    marketSegment,
    sameAsAddress,
    BChooseacountry,
  ]);

  //data from button for  trigger (add or delete)
  React.useEffect(() => {
    async function handlebutton() {
      console.log("props.action",props.action)
      if (props.action === "add") {
        console.log("ok");
        if(initial){
          setInitial(false);
        }
        console.log("action add", props.action);
        console.log("validationStatus", validationStatus);
       
        // await props.handleRedirectToTableIndividual(false);
        if (validationStatus === false) {
          // await props.handleRedirectToTableIndividual(true);
          await setIsRequired(false);
          await handleAddDatatoDatabase();
        } else {
          setIsRequired(true);
        }
      } else if (props.action === "edit") {
        if(initial){
          setInitial(false);
        }
        if (validationStatus === false) {
          // await props.handleRedirectToTableIndividual(true);
          await setIsRequired(false);

          await handleAddDataEdittoDatabase();
        } else {
          setIsRequired(true);
        }
        console.log("action edit", props.action);
      }
    }
    handlebutton();
  }, [props.trigger, props.action]);

  // React.useEffect( () => {
  //   if (props.action == "add") {
  //     console.log("action add", props.action);
  //       props.setAction("none");
  //       // updateList();

  //   } else  (props.action == "edit") {

  //     if (isRequired == false) {
  //       await handleAddDataEdittoDatabase();

  //       console.log("action edit", props.action);
  //     } else {
  //       setIsRequired(true);
  //       console.log("isRequired", isRequired);
  //       props.setAction("none");
  //       // updateList();
  //     }

  // }, [props.action,props.trigger]);

  const handleData = (e) => {};

  const handleExpend = (id, expend) => {
    let index = list.findIndex((x) => x.id === id);

    console.log(Object.assign({}, list[index], { expend: !expend }));
    if (index === -1) return;
    else {
      let new_data = list[index];
      new_data.expend = !expend;
      setList([...list.slice(0, index), new_data, ...list.slice(index + 1)]);
    }
  };

  const handleAddComunication = async (id) => {
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let comunication = list[index];
      delete comunication.content[comunication.content.length - 1];
      let newid = await comunication.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      setCommunicationDatas((prev) => ({
        ...prev,
        [newid + 1]: optionCommunication[0].label,
      }));
      console.log("communicationDatas:", communicationDatas);
      comunication.content.push({
        id: newid + 1,
        label: "Choose a communication",
        xl: 3,
        md: 3,
        xs: 6,
        select: {
          status: "option",
          data: optionCommunication.map((option) => (
            <option
              style={headerTableStyle}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )),
        },
        handle: (e) =>
          setCommunicationDatas((prev) => ({
            ...prev,
            [newid + 1]: e.target.value,
          })),
      });
      comunication.content.push({
        id: newid + 2,
        label: "communication",
        xl: 9,
        md: 9,
        xs: 6,
        select: {
          status: "fillnolabel",
          data: "",
        },
        handle: (e) =>
          setCommunicationDatas((prev) => ({
            ...prev,
            [newid + 2]: e.target.value,
          })),
      });
      comunication.content.push({
        id: 99,
        label: "AddComunication",
        xl: 2,
        md: 2,
        xs: 12,
        select: {
          status: "AddComunication",
          data: "+ More Communication",
        },
      });
      setList([
        ...list.slice(0, index),
        comunication,
        ...list.slice(index + 1),
      ]);
      console.log("communicationDatas:", communicationDatas);
    }
    console.log("demoData[index]:", list[index]);
  };

  const handleAddRelation = async (id) => {
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let relation = list[index];
      delete relation.content[relation.content.length - 1];
      let newid = await relation.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      setRelationDatas((prev) => ({
        ...prev,
        [newid + 1]: "",
        [newid + 2]: optionRelation[0].label,
        [newid + 3]: "",
      }));

      relation.content.push({
        id: newid + 2,
        label: "Name Type",
        xl: 2,
        md: 2,
        xs: 6,
        select: {
          status: "option",
          data: optionRelation.map((option) => (
            <option
              style={headerTableStyle}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )),
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 2]: e.target.value,
          })),
      });

      relation.content.push({
        id: newid + 1,
        label: "Name",
        xl: 4,
        md: 4,
        xs: 6,
        select: {
          status: "fill",
          data: "",
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 1]: e.target.value,
          })),
      });
      relation.content.push({
        id: newid + 3,
        label: "Notes",
        xl: 6,
        md: 6,
        xs: 12,
        select: {
          status: "fill",
          data: "",
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 3]: e.target.value,
          })),
      });
      relation.content.push({
        id: 99,
        label: "AddRelation",
        xl: 2,
        md: 2,
        xs: 12,
        select: {
          status: "AddRelation",
          data: "+ More Relation",
        },
      });
      setList([...list.slice(0, index), relation, ...list.slice(index + 1)]);

      console.log("relationDatas:", relationDatas);
    }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 5,
        color: themeState.color,
        backgroundColor: themeState.background,
      }}
    >
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="01">
          {(provided, snapshot) => (
            <Paper
              elevation={3}
              style={{
                padding: 20,

                color: themeState.color,
                backgroundColor: themeState.paper,
              }}
            >
              {/* <Container maxWidth="xl">
                <Grid container alignItems="center">
                  <Grid item style={{ flexGrow: 1 }}>
                    {" "}
                  </Grid>
                  <Grid item style={{ paddingRight: 20 }}>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Negotiated Rates Only"
                      labelPlacement="start"
                    />
                  </Grid>
                </Grid>
              </Container> */}

              {errorMessage ? (
                <div
                  style={{
                    background: "#ff0033",
                    textAlign: "center",
                    color: "white",
                    height: "30px",
                    marginTop: 5,
                    paddingTop: 5,
                  }}
                >
                  {errorParameter}
                </div>
              ) : null}

              <Container
                maxWidth="xl"
                disableGutters
                style={{ marginTop: 10, backgroundColor: themeState.paper }}
                ref={provided.innerRef}
              >
                {list.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Accordion
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={classes.defaultTheme}
                        expanded={item.expend}
                      >
                        <AccordionSummary
                          style={{ color: mainColor, fontSize: 18 }}
                          onClick={() => handleExpend(item.id, item.expend)}
                        >
                          <div style={{ color: "blue" }}>
                            {item.title}&nbsp;
                          </div>{" "}
                          {item.expend ? (
                            <ArrowDropDownIcon style={{ color: "blue" }} />
                          ) : (
                            <ArrowDropUpIcon style={{ color: "blue" }} />
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {item.content.map((detail, index) => (
                              <Grid
                                item
                                key={detail.id}
                                index={index}
                                xl={detail.xl}
                                md={detail.md}
                                xs={detail.xs}
                              >
                                {detail.select.status === "check" ? (
                                  // <FormControlLabel
                                  //   // value="start"
                                  //   control={<Checkbox color="primary" />}
                                  //   label={detail.label}
                                  //   labelPlacement="end"
                                  // />
                                  <span>
                                    {detail.select.defaultvalue === true ? (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            defaultChecked={true}
                                            color="primary"
                                          />
                                        }
                                        label={detail.label}
                                        labelPlacement="end"
                                        onChange={detail.handle}
                                      />
                                    ) : (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            defaultChecked={false}
                                            color="primary"
                                          />
                                        }
                                        label={detail.label}
                                        labelPlacement="end"
                                        onChange={detail.handle}
                                      />
                                    )}
                                  </span>
                                ) : detail.select.status == "checkbox" ? (
                                  <FormControlLabel
                                    value="start"
                                    control={<Checkbox color="primary" />}
                                    label={detail.select.data}
                                    labelPlacement="start"
                                  />
                                ) : detail.select.status === "status" ? (
                                  <div style={{ paddingTop: 10 }}>
                                    <a>Status</a>
                                    {/* <Switch
                                      defaultChecked={Status}
                                      value={Status}
                                      color="primary"
                                      onChange={(e) => changeSwitch(e)}
                                    /> */}

                                    {detail.select.defaultvalue === true ? (
                                      <Switch
                                        defaultChecked={true}
                                        color="primary"
                                        onChange={detail.handle}
                                      />
                                    ) : (
                                      <Switch
                                        defaultChecked={false}
                                        color="primary"
                                        onChange={detail.handle}
                                      />
                                    )}
                                  </div>
                                ) : detail.select.status ===
                                  "AddComunication" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() =>
                                      handleAddComunication(item.id)
                                    }
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "fillnolabel" ? (
                                  <TextField
                                    className={classes.root}
                                    // label={detail.label}
                                    variant="outlined"
                                    defaultValue={detail.select.defaultvalue}
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#AAAAAA" },
                                    }}
                                    fullWidth
                                    onChange={detail.handle}
                                  />
                                ) : detail.select.status === "AddRelation" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddRelation(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "fix" ? (
                                  <TextField
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{ backgroundColor: "#EEEEEE" }}
                                    // disabled={true}
                                    value={detail.select.data}
                                    defaultValue={detail.select.defaultvalue}
                                    onFocus={false}
                                  />
                                ) : detail.select.status === "fill" ? (
                                  [
                                    isRequired ? (
                                      <TextField
                                        error={
                                          detail.dataCheck == null ||
                                          detail.dataCheck === "" ||
                                          detail.dataCheck === " "
                                            ? true
                                            : false
                                        }
                                        // error={detail.dataCheck}
                                        helperText={
                                          detail.dataCheck == null ||
                                          detail.dataCheck === ""
                                            ? `${detail.label} is Required`
                                            : false
                                        }
                                        // required={true}
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        disabled={detail.disable}
                                        style={
                                          detail.disable
                                            ? {
                                                backgroundColor: "#EFEFEF",
                                                borderColor: "white",
                                              }
                                            : {}
                                        }
                                        // InputProps={{
                                        //   style: headerTableStyle,
                                        // }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        value={detail.data}
                                        onBlur={detail.handle}
                                        // onBlur={handleValidation(detail.dataCheck)}
                                      />
                                    ) : (
                                      <TextField
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        disabled={detail.disable}
                                        style={
                                          detail.disable
                                            ? {
                                                backgroundColor: "#EFEFEF",
                                                borderColor: "white",
                                              }
                                            : {}
                                        }
                                        // InputProps={{
                                        //   style: headerTableStyle,

                                        // }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        value={detail.data}
                                        onBlur={detail.handle}
                                        // onBlur={handleValidation(detail.dataCheck)}
                                      />
                                    ),
                                  ]
                                ) : detail.select.status === "option" ? (
                                  <TextField
                                    className={classes.root}
                                    label={detail.label}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    defaultValue={detail.select.defaultvalue}
                                    SelectProps={{
                                      native: true,
                                    }}
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    onChange={detail.handle}
                                  >
                                    {detail.select.data}
                                  </TextField>
                                ) : detail.select.status === "datetime" ? (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.root}
                                      label={detail.label}
                                      inputVariant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      defaultValue={detail.select.defaultvalue}
                                      // format="dd/MM/yyyy"
                                      // value={selectedDateStartEdit}
                                      // onChange={handleDateStartEdit}
                                      onChange={detail.handle}
                                      fullWidth
                                    />
                                  </MuiPickersUtilsProvider>
                                ) : (
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                    style={{
                                      paddingBottom: 10,
                                      paddingTop: 10,
                                      color: "blue",
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Container>
            </Paper>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompany);
