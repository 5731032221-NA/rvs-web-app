import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import * as actions from "../../middleware/action";
import { getConfigurationByPropertyCode } from "../../services/user.service";
import {
  getIndividualProfileCommunication,
  getIndividualProfileRelation,
  postIndividualProfile,
  updateIndividualProfile,
} from "../../services/individualprofile.service";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { optionnationality } from "../../static/nationality";
// import { optioncountry } from "../../static/country.js";

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

const optionData = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option",
    label: "Option2",
  },
  {
    value: "Option",
    label: "Option3",
  },
];
const optionData2 = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const addressType = [
  {
    label: "Resident",
    value: "Resident",
  },
  {
    label: "Home",
    value: "Home",
  },
  { label: "Organisation", value: "Organisation" },
];

export const ProfileIndividual = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });

  const [optionrelation, setOptionrelation] = React.useState([]);
  const [optionCommunication, setOptionCommunication] = React.useState([]);
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
    // if(props.editdata != null) {
    // let getCommunications = await getIndividualProfileCommunication(
    //   sessionStorage.getItem("auth"),
    //   props.editdata.nameid
    // );
    // let getCommunicationsDatas = {}
    // console.log("getCommunications.contents",getCommunications.contents)
    // getCommunications.contents[0].forEach((element) =>
    //   {if(element.communication == "email"){
    //     console.log("e",element.value)
    //     getCommunicationsDatas.email = element.value
    //   }else if(element.communication == "mobile"){
    //     console.log("m",element.value)
    //     getCommunicationsDatas.mobile = element.value
    //   }else{
    //     console.log("element.communication",element)
    //   }
    //   }
    // );
    // setCommunicationDatas(prev => ({...prev,getCommunicationsDatas}));
    // console.log("getCommunicationsDatas",getCommunicationsDatas,communicationDatas)

    // }
  }, []);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const [list, setList] = React.useState([]);
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
  const [account, setAccount] = useState(sessionStorage.getItem("username"));
  const [nameID, setNameID] = React.useState(
    props.editdata != null ? props.editdata.nameid : "Mr."
  );
  const [nameTitle, setNameTitle] = React.useState(
    props.editdata != null ? props.editdata.nametitle : "Mr."
  );
  const [firstName, setFirstName] = React.useState(
    props.editdata != null ? props.editdata.firstname : ""
  );
  const [lastName, setLastName] = React.useState(
    props.editdata != null ? props.editdata.lastname : ""
  );
  const [namePrefix, setNamePrefix] = React.useState(
    props.editdata != null ? props.editdata.nameprefix : "KHUN1"
  );
  const [nameSuffix, setNameSuffix] = React.useState(
    props.editdata != null ? props.editdata.namesuffix : ""
  );
  const [middleInitial, setMiddleInitial] = React.useState(
    props.editdata != null ? props.editdata.middleinitial : ""
  );
  const [gender, setGender] = React.useState(
    props.editdata != null ? props.editdata.gender : "Male."
  );
  const [religion, setReligion] = React.useState(
    props.editdata != null ? props.editdata.religion : "Buddhism"
  );
  const [statusProfile, setStatusProfile] = React.useState(
    props.editdata != null ? props.editdata.statusprofile : "Y"
  );
  const [organization, setOrganization] = React.useState(
    props.editdata != null ? props.editdata.organization : ""
  );
  const [provinceOfResidence, setProvinceOfResidence] = React.useState(
    props.editdata != null ? props.editdata.provinceofresidence : ""
  );
  const [borderCrossingEntryPlace, setBorderCrossingEntryPlace] =
    React.useState(
      props.editdata != null ? props.editdata.bordercrossingentryplace : ""
    );
  const [borderCrossingEntryDate, setBorderCrossingEntryDate] = React.useState(
    props.editdata != null
      ? props.editdata.bordercrossingentrydate
      : new Date("2021-09-13T21:11:54")
  );
  const [address, setAddress] = React.useState(
    props.editdata != null ? props.editdata.address : "Resident"
  );
  const [address1, setAddress1] = React.useState(
    props.editdata != null ? props.editdata.address1 : ""
  );
  const [address2, setAddress2] = React.useState(
    props.editdata != null ? props.editdata.address2 : ""
  );
  const [conuty, setCountry] = React.useState(
    props.editdata != null ? props.editdata.conuty : ""
  );
  const [city, setCity] = React.useState(
    props.editdata != null ? props.editdata.city : ""
  );
  const [stateProvince, setStateprovince] = React.useState(
    props.editdata != null ? props.editdata.stateprovince : ""
  );
  const [postal, setPostal] = React.useState(
    props.editdata != null ? props.editdata.postal : ""
  );

  const [noPost, setNoPost] = React.useState(
    props.editdata != null ? props.editdata.nopost : "N"
  );
  const [NRG, setNRG] = React.useState(
    props.editdata != null ? props.editdata.nrg : "N"
  );
  const [guestCategory, setGuestCategory] = React.useState(
    props.editdata != null ? props.editdata.guestcategory : "MIDDLE-AGED-ADULTS"
  );
  const [guestType, setGuestType] = React.useState(
    props.editdata != null ? props.editdata.guesttype : "option1"
  );
  const [VVIP, setVVIP] = React.useState(
    props.editdata != null ? props.editdata.vvip : "V20"
  );
  const [birthRegion, setBirthRegion] = React.useState(
    props.editdata != null ? props.editdata.birthregion : "option1"
  );
  const [birthProvince, setBirthProvince] = React.useState(
    props.editdata != null ? props.editdata.birthprovince : "option1"
  );

  const [IDCheck, setIDCheck] = React.useState(
    props.editdata != null ? props.editdata.idcheck : "N"
  );
  const [IDType, setIDType] = React.useState(
    props.editdata != null ? props.editdata.idtype : "option1"
  );
  const [IDNumber, setIDNumber] = React.useState(
    props.editdata != null ? props.editdata.idnumber : ""
  );
  const [nationality, setNationality] = React.useState(
    props.editdata != null ? props.editdata.nationality : "Thai"
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    props.editdata != null
      ? props.editdata.dateofbirth
      : new Date("2021-09-13T21:11:54")
  );
  const [IDIssuedDate, setIDIssuedDate] = React.useState(
    props.editdata != null
      ? props.editdata.idissueddate
      : new Date("2021-09-13T21:11:54")
  );
  const [IDExpirationDate, setIDExpirationDate] = React.useState(
    props.editdata != null
      ? props.editdata.idexpirationdate
      : new Date("2021-09-13T21:11:54")
  );

  const [passportVisaCheck, setPassportVisaCheck] = React.useState(
    props.editdata != null ? props.editdata.passportvisacheck : "N"
  );
  const [visaType, setVisaType] = React.useState(
    props.editdata != null ? props.editdata.visatype : "Tourist"
  );
  const [visaName, setVisaName] = React.useState(
    props.editdata != null ? props.editdata.visaname : ""
  );
  const [visaNumber, setVisaNumber] = React.useState(
    props.editdata != null ? props.editdata.visanumber : ""
  );
  const [visaIssuedDate, setVisaIssuedDate] = React.useState(
    props.editdata != null
      ? props.editdata.visaissueddate
      : new Date("2021-09-13T21:11:54")
  );
  const [visaBeginDate, setVisaBeginDate] = React.useState(
    props.editdata != null
      ? props.editdata.visabegindate
      : new Date("2021-09-13T21:11:54")
  );
  const [visaExpirationDate, setVisaExpirationDate] = React.useState(
    props.editdata != null
      ? props.editdata.visaexpirationdate
      : new Date("2021-09-13T21:11:54")
  );

  const [visaStatus, setVisaStatus] = React.useState(
    props.editdata != null ? props.editdata.visastatus : "Y"
  );
  const [visaNotes, setVisaNotes] = React.useState(
    props.editdata != null ? props.editdata.visanotes : ""
  );
  const [rank, setRank] = React.useState(
    props.editdata != null ? props.editdata.rank : "option1"
  );
  const [grade, setGrade] = React.useState(
    props.editdata != null ? props.editdata.grade : "option1"
  );
  const [guestIdentity, setGuestIdentity] = React.useState(
    props.editdata != null ? props.editdata.guestidentity : ""
  );
  const [isRequired, setIsRequired] = React.useState(false);
  const pageProperty = useSelector((state) => state.reducer.property);

  const handDateChangeBorderCrossingEntryDate = (newDate) => {
    setBorderCrossingEntryDate(newDate);
  };
  const handDateChangeDateOfBirth = (newDate) => {
    setDateOfBirth(newDate);
  };
  const handDateChangesetIDIssuedDate = (newDate) => {
    setIDIssuedDate(newDate);
  };
  const handDateChangeIDExpirationDate = (newDate) => {
    setIDExpirationDate(newDate);
  };
  const handDateChangeVisaIssuedDate = (newDate) => {
    setVisaIssuedDate(newDate);
  };
  const handDateChangeVisaBeginDate = (newDate) => {
    setVisaBeginDate(newDate);
  };
  const handDateChangeVisaExpirationDate = (newDate) => {
    setVisaExpirationDate(newDate);
  };

  const [communicationDatas, setCommunicationDatas] = React.useState({});
  const [relationDatas, setRelationDatas] = React.useState({});
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

  async function updateList() {
    let commu = JSON.parse(JSON.stringify(communicationDatas));
    let rela = JSON.parse(JSON.stringify(relationDatas));
    let getCommunicationsDatas = {};
    let getCommunication = [];
    let getRelation = [];
    console.log("demostate");
    let getConfigData = await getConfigurationByPropertyCode(
      sessionStorage.getItem("auth"),
      pageProperty
    );
    console.log("getConfigData:", getConfigData);
    let configData = getConfigData.content;
    let optionTitle = await getList(configData, "PCINDTT");
    // let optionDocumentType = await getList(configData,"");
    let optionGender = await getList(configData, "PCINDGD");
    let relation = await getList(configData, "PCINDRL");
    let communication = await getList(configData, "PCINDCM");
    // let optionDocumentType = await getList(configData,"");
    setOptionrelation(relation);
    setOptionCommunication(communication);
    // console.log("old data",props.editdata != null , Object.keys(communicationDatas).length === 0 , Object.keys(rela).length === 0,commu,rela,props.editdata)
    if (
      props.editdata != null &&
      Object.keys(commu).length === 0 &&
      Object.keys(rela).length === 0
    ) {
      let getCommunications = await getIndividualProfileCommunication(
        sessionStorage.getItem("auth"),
        props.editdata.nameid
      );
      let getRelations = await getIndividualProfileRelation(
        sessionStorage.getItem("auth"),
        props.editdata.nameid
      );
      console.log("getCommunications.content", getCommunications.content);
      let count = 3;
      getCommunications.content.forEach((element) => {
        const commuid1 = count;
        const commuid2 = count + 1;

        if (element.communication == "email") {
          getCommunicationsDatas.email = element.value;
          setCommunicationDatas((prev) => ({
            ...prev,
            email: element.value,
          }));
        } else if (element.communication == "mobile") {
          getCommunicationsDatas.mobile = element.value;
          setCommunicationDatas((prev) => ({
            ...prev,
            mobile: element.value,
          }));
        } else {
          setCommunicationDatas((prev) => ({
            ...prev,
            [count]: element.communication,
            [count + 1]: element.value,
          }));
          getCommunication.push({
            id: commuid1,
            label: "Choose a communication",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "option",
              data: communication.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.label == element.communication}
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
          getCommunication.push({
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
      console.log(getRelations.content);

      getRelations.content.forEach((element) => {
        const relaid1 = relationid;
        const relaid2 = relationid + 1;
        const relaid3 = relationid + 2;
        setRelationDatas((prev) => ({
          ...prev,
          [relationid]: element.relation,
          [relationid + 1]: element.value,
          [relationid + 2]: element.note,
        }));
        getRelation.push({
          id: relaid1,
          label: "Name Type",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: relation.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
                selected={option.label == element.relation}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) =>
            setRelationDatas((prev) => ({
              ...prev,
              [relaid1]: element.relation,
            })),
        });
        getRelation.push({
          id: relaid2,
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
              [relaid2]: e.target.value,
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
          getCommunication.push({
            id: commuid1,
            label: "Choose a communication",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "option",
              // eslint-disable-next-line no-loop-func
              data: communication.map((option) => (
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
          getCommunication.push({
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
            id: relaid1,
            label: "Name Type",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              // eslint-disable-next-line no-loop-func
              data: relation.map((option) => (
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
                [relaid1]: e.target.value,
              })),
          });
          getRelation.push({
            id: relaid2,
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
                [relaid2]: e.target.value,
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
              defaultvalue: rela[key],
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relaid3]: e.target.value,
              })),
          });
          relationid = relationid + 3;
        }
      }
    }

    setList([
      {
        id: "1",
        title: "Personal",
        expend: true,
        content: [
          {
            id: 0,
            label: "Name Title",
            xl: 1,
            md: 1,
            xs: 4,
            select: {
              status: "option",
              data: [
                { label: "Mr." },
                { label: "Mrs." },
                { label: "Miss" },
              ].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  noWrap
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.nametitle : "Mr.",
            },
            handle: (e) => setNameTitle(e.target.value),
            dataType: "string",
            dataCheck: nameTitle,
          },
          {
            id: 3,
            label: "Name Prefix",
            xl: 2,
            md: 2,
            xs: 8,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.nameprefix : "",
            },
            handle: (e) => setNamePrefix(e.target.value),
            dataType: "string",
            dataCheck: namePrefix,
          },

          {
            id: 1,
            label: "First Name",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              // data: props.editdata.firstname,
              defaultvalue:
                props.editdata != null ? props.editdata.firstname : "",
            },
            handle: (e) => setFirstName(e.target.value),
            dataType: "string",
            dataCheck: firstName,
          },
          {
            id: 4,
            label: "Name Suffix",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              // data: props.editdata.firstname,
              defaultvalue:
                props.editdata != null ? props.editdata.namesuffix : "",
            },
            handle: (e) => setNameSuffix(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 5,
            label: "Middle Initial",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              // data: props.editdata.firstname,
              defaultvalue:
                props.editdata != null ? props.editdata.middleinitial : "",
            },
            handle: (e) => setMiddleInitial(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 2,
            label: "Last Name",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              defaultvalue:
                props.editdata != null ? props.editdata.lastname : "",
            },
            // handle: (e) => setPersonalData({ ...personalData,lastname: e.target.value }),
            handle: (e) => setLastName(e.target.value),
            dataType: "string",
            dataCheck: lastName,
          },
          {
            id: 6,
            label: "Gender",
            xl: 1,
            md: 1,
            xs: 6,
            select: {
              status: "option",
              data: optionGender.map((option) => (
                <option
                  // defaultValue={props.editdata != null ? props.editdata.sex : ""}
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.gender : "Male",
            },
            handle: (e) => setGender(e.target.value),
            dataType: "string",
            dataCheck: gender,
          },
          {
            id: 7,
            label: "Religion",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: [
                { label: "Buddhism", value: "Buddhism" },
                { label: "Judaism", value: "Judaism" },
                { label: "Christianity", value: "Christianity" },
                { label: "Islam", value: "Islam" },
                { label: "Hinduism", value: "Hinduism" },
              ].map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.religion : "Buddhism",
            },
            handle: (e) => setReligion(e.target.value),
            dataType: "string",
            dataCheck: religion,
          },
          {
            id: 8,
            label: "Nationality*",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionnationality.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.nationality : "Thai",
            },
            handle: (e) => setNationality(e.target.value),
            dataType: "string",
            dataCheck: nationality,
          },
          {
            id: 9,
            label: "Date of Birth",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "datetime",
              data: dateOfBirth,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.dateofbirth
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeDateOfBirth(e),
            dataType: "date",
            dataCheck: dateOfBirth,
          },

          {
            id: 10,
            label: "Birth Region",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.birthregion : "option1",
            },
            handle: (e) => setBirthRegion(e.target.value),
            dataType: "string",
            dataCheck: birthRegion,
          },
          {
            id: 11,
            label: "Birth Province",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null
                  ? props.editdata.birthprovince
                  : "option1",
            },
            handle: (e) => setBirthProvince(e.target.value),
            dataType: "string",
            dataCheck: birthProvince,
          },
          {
            id: 12,
            label: "Status",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "status",
              defaultvalue:
                props.editdata != null ? props.editdata.statusprofile : "Y",
              data: "Y",
            },
            handle: (e) => setStatusProfile(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: statusProfile,
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
            label: "Organisation",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.organization : "",
            },

            handle: (e) => setOrganization(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 2,
            label: "Province Of Residence",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata.provinceofresidence
                  : "",
            },
            handle: (e) => setProvinceOfResidence(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 3,
            label: "Border Crossing Entry Place",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null
                  ? props.editdata.bordercrossingentryplace
                  : "",
            },
            handle: (e) => setBorderCrossingEntryPlace(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 4,
            label: "Border Crossing Entry Date",
            xl: 3,
            md: 3,
            xs: 12,
            select: {
              status: "datetime",
              data: borderCrossingEntryDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.bordercrossingentrydate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeBorderCrossingEntryDate(e),
            dataType: "date",
            dataCheck: borderCrossingEntryDate,
          },
          {
            id: 5,
            label: "Address",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "option",
              data: addressType.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.address : "Resident",
            },
            handle: (e) => setAddress(e.target.value),
            dataType: "string",
            dataCheck: address,
          },
          {
            id: 6,
            label: "Address 1",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.address1 : "",
            },
            handle: (e) => setAddress1(e.target.value),
            dataType: "string",
            dataCheck: address1,
          },
          {
            id: 7,
            label: "Address 2",
            xl: 5,
            md: 5,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.address2 : "",
            },
            handle: (e) => setAddress2(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 8,
            label: "Country",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: props.editdata != null ? props.editdata.conuty : "",
            },
            handle: (e) => setCountry(e.target.value),
            dataType: "string",
            dataCheck: conuty,
          },
          {
            id: 9,
            label: "City",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: props.editdata != null ? props.editdata.city : "",
            },
            handle: (e) => setCity(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 10,
            label: "State / Province",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.stateprovince : "",
            },
            handle: (e) => setStateprovince(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 11,
            label: "Postal",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: props.editdata != null ? props.editdata.postal : "",
            },
            handle: (e) => setPostal(e.target.value),
            dataType: "number",
            dataCheck: true,
          },
          {
            id: 12,
            label: "",
            xl: 4,
            md: 4,
            xs: 4,
            select: {
              status: "offset",
              data: "",
            },
            // handle: (e) => handleData(e),
          },
        ],
      },
      {
        id: "3",
        title: "Communication",
        expend: true,
        content: [
          {
            id: 1,
            label: "Email",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "fix",
              data: "Email Address",
            },
            // dataType: "email",
            // dataCheck: "",
          },
          {
            id: 2,
            label: "Email",
            xl: 9,
            md: 9,
            xs: 6,
            select: {
              status: "fillnolabel",
              data: "Email",
              defaultvalue:
                props.editdata != null ? getCommunicationsDatas.email : "",
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                email: e.target.value,
              })),
            dataType: "email",
            dataCheck: communicationDatas,
          },
          {
            id: 3,
            label: "Mobile Number",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "fix",
              data: "Mobile Number",
            },
          },
          {
            id: 4,
            label: "Mobile Number",
            xl: 9,
            md: 9,
            xs: 6,
            select: {
              status: "fillnolabel",
              data: "Mobile Number",
              defaultvalue:
                props.editdata != null ? getCommunicationsDatas.mobile : "",
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                mobile: e.target.value,
              })),
            dataType: "number",
            dataCheck: communicationDatas,
          },
          ...getCommunication,
          {
            id: 99,
            label: "Phone Number",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "AddCommunication",
              data: "+ More Communication",
            },
            // handle: (e) => handleAddCommunication(e),
          },
        ],
      },
      {
        id: "4",
        title: "Relation",
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
            // handle: (e) => handleAddCommunication(e),
          },
        ],
      },
      {
        id: "5",
        title: "Internal Infomation",
        expend: true,
        content: [
          {
            id: 1,
            label: "No Post",
            xl: 1,
            md: 1,
            xs: 6,
            select: {
              status: "check",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.nopost : "N",
            },
            handle: (e) => setNoPost(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: noPost,
          },
          {
            id: 2,
            label: "NRG",
            xl: 1,
            md: 1,
            xs: 6,
            select: {
              status: "check",
              data: "",
              defaultvalue: props.editdata != null ? props.editdata.nrg : "N",
            },
            handle: (e) => setNRG(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: NRG,
          },
          {
            id: 3,
            label: "offset",
            xl: 10,
            md: 10,
            xs: 0,
            select: {
              status: "offset",
              data: "",
            },
            // handle: (e) => handleData(e),
          },
          {
            id: 4,
            label: "Guest Catagory",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "option",
              data: [
                { label: "CHILD" },
                { label: "YOUNG-ADULTS" },
                { label: "MIDDLE-AGED-ADULTS" },
                { label: "OLD-ADGE-ADULTS" },
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
                  ? props.editdata.guestcategory
                  : "option1",
            },
            handle: (e) => setGuestCategory(e.target.value),
            dataType: "string",
            dataCheck: guestCategory,
          },
          {
            id: 5,
            label: "Guest Type",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.guesttype : "option1",
            },
            handle: (e) => setGuestType(e.target.value),
            dataType: "string",
            dataCheck: guestType,
          },
          {
            id: 6,
            label: "VVIP",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: [{ label: "V20" }, { label: "V55" }, { label: "V99" }].map(
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
                props.editdata != null ? props.editdata.vvip : "option1",
            },
            handle: (e) => setVVIP(e.target.value),
            dataType: "string",
            dataCheck: VVIP,
          },
        ],
      },
      {
        id: "6",
        title: "Identification",
        expend: true,
        content: [
          {
            id: 1,
            label: "ID Check",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "check",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.idcheck : "N",
            },

            handle: (e) => setIDCheck(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: IDCheck,
          },
          {
            id: 2,
            label: "offset",
            xl: 10,
            md: 10,
            xs: 6,
            select: {
              status: "offset",
              data: "",
            },
          },
          {
            id: 3,
            label: "ID Type",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.idtype : "option1",
            },

            handle: (e) => setIDType(e.target.value),
            dataType: "string",
            dataCheck: IDCheck == "Y" ? IDType : true,
          },
          {
            id: 4,
            label: "ID Number",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.idnumber : "",
            },
            handle: (e) => setIDNumber(e.target.value),
            dataType: "number",
            dataCheck: IDCheck == "Y" ? IDNumber : true,
          },
          {
            id: 5,
            label: "ID Issue Date",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "date",
              data: IDIssuedDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.idissuedDate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangesetIDIssuedDate(e),
            dataType: "date",
            dataCheck: IDCheck == "Y" ? IDIssuedDate : true,
          },
          {
            id: 6,
            label: "ID Expiration Date",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "date",
              data: IDExpirationDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.idexpirationDate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeIDExpirationDate(e),
            dataType: "date",
            dataCheck: IDCheck == "Y" ? IDExpirationDate : true,
          },
          {
            id: 8,
            label: "Passport Visa Check",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "check",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.passportvisacheck : "N",
            },
            handle: (e) =>
              setPassportVisaCheck(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: passportVisaCheck,
          },
          // {
          //   id: 9,
          //   label: "Offset",
          //   xl: 10,
          //   md: 10,
          //   xs: 6,
          //   select: {
          //     status: "offset",
          //     data: "",
          //   },
          // },
          {
            id: 10,
            label: "Visa Type",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "option",
              data: [{ label: "Tourist" }, { label: "Miliary" }].map(
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
                props.editdata != null ? props.editdata.visatype : "Tourist",
            },
            handle: (e) => setVisaType(e.target.value),
            dataType: "string",
            dataCheck: passportVisaCheck == "Y",
          },
          {
            id: 11,
            label: "Visa Name",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.visaname : "",
            },
            handle: (e) => setVisaName(e.target.value),
            dataType: "string",
            dataCheck: passportVisaCheck == "Y" ? visaName : true,
          },
          {
            id: 12,
            label: "Visa Number",
            xl: 4,
            md: 4,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.visanumber : "",
            },
            handle: (e) => setVisaNumber(e.target.value),
            dataType: "string",
            dataCheck: passportVisaCheck == "Y" ? visaNumber : true,
          },
          {
            id: 12,
            label: "Visa Issued Date",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "date",
              data: visaIssuedDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.visaissueddate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeVisaIssuedDate(e),
            dataType: "date",
            dataCheck: passportVisaCheck == "Y" ? visaIssuedDate : true,

            // handle: (e) => setVisaIssuedDate(convertTimeToString(e)),
          },
          {
            id: 13,
            label: "Visa Begin Date",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "date",
              data: visaBeginDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.visabegindate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeVisaBeginDate(e),
            dataType: "date",
            dataCheck: passportVisaCheck == "Y" ? visaBeginDate : true,
          },
          {
            id: 14,
            label: "Visa Expiration Date",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "date",
              data: visaExpirationDate,
              defaultvalue:
                props.editdata != null
                  ? props.editdata.visaexpirationdate
                  : new Date("2021-09-13T21:11:54"),
            },
            handle: (e) => handDateChangeVisaExpirationDate(e),
            dataType: "date",
            dataCheck: passportVisaCheck == "Y" ? visaExpirationDate : true,
          },
          {
            id: 15,
            label: "Visa Status",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "status",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.visastatus : "Y",
            },
            handle: (e) => setVisaStatus(handleBoolean(e.target.checked)),
            dataType: "string",
            dataCheck: passportVisaCheck == "Y" ? visaStatus : true,
          },
          {
            id: 16,
            label: "Note",
            xl: 12,
            md: 12,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.visanotes : "",
            },
            handle: (e) => setVisaNotes(e.target.value),
            dataType: "string",
            dataCheck: passportVisaCheck == "Y" ? visaNotes : true,
          },
          {
            id: 17,
            label: "Rank",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.rank : "option1",
            },
            handle: (e) => setRank(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 18,
            label: "Grade",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionData.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )),
              defaultvalue:
                props.editdata != null ? props.editdata.grade : "option1",
            },
            handle: (e) => setGrade(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
          {
            id: 19,
            label: "Guest Identity",
            xl: 2,
            md: 2,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue:
                props.editdata != null ? props.editdata.guestidentity : "",
            },
            handle: (e) => setGuestIdentity(e.target.value),
            dataType: "string",
            dataCheck: true,
          },
        ],
      },
    ]);
  }

  React.useEffect(() => {
    async function getConfig() {
      updateList();
    }
    getConfig();
  }, [props.trigger]);

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

  const handleAddAddress = async (id) => {
    console.log("handleAddAddress", id);
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let address = list[index];
      delete address.content[address.content.length - 1];
      let newid = await address.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      address.content.push(
        {
          id: newid + 1,
          label: "Address",
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "option",
            data: [
              { label: "Resident" },
              { label: "Home" },
              { label: "Organisation" },
            ].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
        },
        {
          id: newid + 2,
          label: "Address 1",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 3,
          label: "Address 2",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 4,
          label: "Country",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 5,
          label: "City",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 6,
          label: "State / Province",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 7,
          label: "Postal",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 8,
          label: "",
          xl: 4,
          md: 4,
          xs: 4,
          select: {
            status: "offset",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 99,
          label: "AddAddress",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddAddress",
            data: "+ More Address",
          },
        }
      );
      setList([...list.slice(0, index), address, ...list.slice(index + 1)]);
    }
  };

  React.useEffect(() => {
    // handle change state
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    IDCheck,
    IDExpirationDate,
    IDIssuedDate,
    IDNumber,
    IDType,
    NRG,
    VVIP,
    address,
    address1,
    address2,
    birthProvince,
    birthRegion,
    borderCrossingEntryDate,
    borderCrossingEntryPlace,
    city,
    conuty,
    dateOfBirth,
    firstName,
    gender,
    grade,
    guestCategory,
    guestIdentity,
    guestType,
    lastName,
    middleInitial,
    namePrefix,
    nameSuffix,
    nameTitle,
    nationality,
    noPost,
    organization,
    passportVisaCheck,
    postal,
    props,
    provinceOfResidence,
    rank,
    religion,
    stateProvince,
    statusProfile,
    visaBeginDate,
    visaExpirationDate,
    visaIssuedDate,
    visaName,
    visaNotes,
    visaNumber,
    visaStatus,
    visaType,
  ]);

  const handleAddCommunication = async (id) => {
    console.log("handleAddCommunication", id);
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let communication = list[index];
      delete communication.content[communication.content.length - 1];
      let newid = await communication.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      console.log("optionCommunication2", optionCommunication);
      setCommunicationDatas((prev) => ({
        ...prev,
        [newid + 1]: "Telephone Number",
      }));
      communication.content.push({
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
      communication.content.push({
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
      communication.content.push({
        id: 99,
        label: "AddCommunication",
        xl: 2,
        md: 2,
        xs: 12,
        select: {
          status: "AddCommunication",
          data: "+ More Communication",
        },
      });
      setList([
        ...list.slice(0, index),
        communication,
        ...list.slice(index + 1),
      ]);
    }
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
        [newid + 1]: optionrelation[0].label,
        [newid + 2]: "",
        [newid + 3]: "",
      }));

      relation.content.push({
        id: newid + 1,
        label: "Name Type",
        xl: 2,
        md: 2,
        xs: 6,
        select: {
          status: "option",
          data: optionrelation.map((option) => (
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
            [newid + 1]: e.target.value,
          })),
      });

      relation.content.push({
        id: newid + 2,
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
            [newid + 2]: e.target.value,
          })),
        dataCheck: true,
      });
      relation.content.push({
        id: newid + 3,
        label: "Note",
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
        dataCheck: true,
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
    }
  };

  // const convertTimeToString = (e) => {
  //   let dateNoTiome = e.toISOString();
  //   let T = dateNoTiome.split("T");
  //   // console.log(T);
  //   return T[0];
  // };

  const handleBoolean = (e) => {
    if (e == true) {
      return "Y";
    } else return "N";
  };

  // const HanddleIsRequired = () => {
  //   console.log(setList);
  // };

  const handleData = async (e) => {
    // console.log("Value from handleData : ", e);
    // console.log("Value from handleData : ", e.target.value);
    // console.log("Value from props.editdata : ", props.editdata);
    // console.log("idividualData==", individualData);
    // console.log(
    //   "setvalue check==",
    //   lastName == null || lastName == undefined || lastName == ""
    //     ? individualData.lastname
    //     : lastName
    // );

    console.table(
      "handleData : ",
      nameTitle,
      firstName,
      lastName,
      namePrefix,
      nameSuffix,
      middleInitial,
      gender,
      religion,
      organization,
      statusProfile,
      provinceOfResidence,
      borderCrossingEntryPlace,
      borderCrossingEntryDate,
      address,
      address1,
      address2,
      conuty,
      city,
      stateProvince,
      postal,
      noPost,
      NRG,
      guestCategory,
      VVIP,
      birthRegion,
      birthProvince,
      guestType,
      IDCheck,
      IDType,
      IDNumber,
      nationality,
      dateOfBirth,
      IDIssuedDate,
      IDExpirationDate,
      passportVisaCheck,
      visaType,
      visaName,
      visaNumber,
      visaIssuedDate,
      visaBeginDate,
      visaExpirationDate,
      visaStatus,
      visaNotes,
      rank,
      grade,
      guestIdentity
    );
  };

  const handleAddDataToDatabase = async (e) => {
    console.log("handleAddDataToDatabase");
    // let index = list.findIndex((x) => x.title == "Communication");
    // let communications = list[index];
    // delete communications.content[communications.content.length - 1];
    let indexRelation = list.findIndex((x) => x.title == "Relation");
    let relations = list[indexRelation];
    delete relations.content[relations.content.length - 1];
    let req = {
      nametitle: nameTitle,
      firstname: firstName,
      lastname: lastName,
      nameprefix: namePrefix,
      namesuffix: nameSuffix,
      middleinitial: middleInitial,
      gender: gender,
      religion: religion,
      statusprofile: statusProfile,
      organization: organization,
      provinceofresidence: provinceOfResidence,
      bordercrossingentryplace: borderCrossingEntryPlace,
      bordercrossingentrydate: borderCrossingEntryDate,
      address: address,
      address1: address1,
      address2: address2,
      conuty: conuty,
      city: city,
      stateprovince: stateProvince,
      postal: postal,
      nopost: noPost,
      nrg: NRG,
      guestcategory: guestCategory,
      vvip: VVIP,
      birthregion: birthRegion,
      birthprovince: birthProvince,
      guesttype: guestType,
      idcheck: IDCheck,
      idtype: IDType,
      idnumber: IDNumber,
      nationality: nationality,
      dateofbirth: dateOfBirth,
      idissueddate: IDIssuedDate,
      idexpirationdate: IDExpirationDate,
      passportvisacheck: passportVisaCheck,
      visatype: visaType,
      visaname: visaName,
      visanumber: visaNumber,
      visaissueddate: visaIssuedDate,
      visabegindate: visaBeginDate,
      visaexpirationdate: visaExpirationDate,
      visastatus: visaStatus,
      visanotes: visaNotes,
      rank: rank,
      grade: grade,
      guestidentity: guestIdentity,
      communications: communicationDatas,
      relations: relationDatas,
      createdby: account,
    };
    const data = await postIndividualProfile(
      sessionStorage.getItem("auth"),
      req
    );
    console.log("datafrom post", data);
  };

  const handleEditDataToDatabase = async (e) => {
    let id = nameID;

    let req = {
      nametitle: nameTitle,
      firstname: firstName,
      lastname: lastName,
      nameprefix: namePrefix,
      namesuffix: nameSuffix,
      middleinitial: middleInitial,
      gender: gender,
      religion: religion,
      statusprofile: statusProfile,
      organization: organization,
      provinceofresidence: provinceOfResidence,
      bordercrossingentryplace: borderCrossingEntryPlace,
      bordercrossingentrydate: borderCrossingEntryDate,
      address: address,
      address1: address1,
      address2: address2,
      conuty: conuty,
      city: city,
      stateprovince: stateProvince,
      postal: postal,
      nopost: noPost,
      nrg: NRG,
      guestcategory: guestCategory,
      vvip: VVIP,
      birthregion: birthRegion,
      birthprovince: birthProvince,
      guesttype: guestType,
      idcheck: IDCheck,
      idtype: IDType,
      idnumber: IDNumber,
      nationality: nationality,
      dateofbirth: dateOfBirth,
      idissueddate: IDIssuedDate,
      idexpirationdate: IDExpirationDate,
      passportvisacheck: passportVisaCheck,
      visatype: visaType,
      visaname: visaName,
      visanumber: visaNumber,
      visaissueddate: visaIssuedDate,
      visabegindate: visaBeginDate,
      visaexpirationdate: visaExpirationDate,
      visastatus: visaStatus,
      visanotes: visaNotes,
      rank: rank,
      grade: grade,
      guestidentity: guestIdentity,
      communications: communicationDatas,
      relations: relationDatas,
      updatedby: account,
    };
    console.log("update", req);
    const data = await updateIndividualProfile(
      sessionStorage.getItem("auth"),
      id,
      req
    );
    console.log("datafrom post", data);
  };

  const [validationStatus, setValidationStatus] = React.useState(true);
  React.useEffect(() => {
    ///check is required in every field
    var _IsRequired =
      nameTitle === null ||
      nameTitle === "" ||
      firstName === " " ||
      firstName === null ||
      firstName === "" ||
      firstName === " " ||
      lastName === null ||
      lastName === "" ||
      lastName === " " ||
      gender === null ||
      gender === "" ||
      gender === " " ||
      religion === null ||
      religion === "" ||
      religion === " " ||
      statusProfile === null ||
      statusProfile === "" ||
      statusProfile === " " ||
      address === null ||
      address === "" ||
      address === " " ||
      address1 === null ||
      address1 === "" ||
      address1 === " " ||
      conuty === null ||
      conuty === "" ||
      conuty === " " ||
      noPost === null ||
      noPost === "" ||
      noPost === " " ||
      NRG === null ||
      NRG === "" ||
      NRG === " " ||
      guestCategory === null ||
      guestCategory === "" ||
      guestCategory === " " ||
      VVIP === null ||
      VVIP === "" ||
      VVIP === " " ||
      birthRegion === null ||
      birthRegion === "" ||
      birthRegion === " " ||
      birthProvince === null ||
      birthProvince === "" ||
      birthProvince === " " ||
      guestType === null ||
      guestType === "" ||
      guestType === " " ||
      IDCheck === null ||
      IDCheck === "" ||
      IDCheck === " " ||
      nationality === null ||
      nationality === "" ||
      nationality === " " ||
      dateOfBirth === null ||
      dateOfBirth === "" ||
      dateOfBirth === " " ||
      passportVisaCheck === null ||
      passportVisaCheck === "" ||
      passportVisaCheck === " ";

    // console.log("_IsRequired :: ", _IsRequired);
    // console.log("add by account:", account);
    console.log(validationStatus);
    setValidationStatus(_IsRequired);
    if (_IsRequired === false) {
      setIsRequired(false);
      props.handleRedirectToTableIndividual(true);
    } else {
      props.handleRedirectToTableIndividual(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    IDCheck,
    IDExpirationDate,
    IDIssuedDate,
    IDNumber,
    IDType,
    NRG,
    VVIP,
    address,
    address1,
    address2,
    birthProvince,
    birthRegion,
    borderCrossingEntryDate,
    borderCrossingEntryPlace,
    city,
    conuty,
    dateOfBirth,
    firstName,
    gender,
    grade,
    guestCategory,
    guestIdentity,
    guestType,
    lastName,
    middleInitial,
    namePrefix,
    nameSuffix,
    nameTitle,
    nationality,
    noPost,
    organization,
    passportVisaCheck,
    postal,
    props,
    provinceOfResidence,
    rank,
    religion,
    stateProvince,
    statusProfile,
    visaBeginDate,
    visaExpirationDate,
    visaIssuedDate,
    visaName,
    visaNotes,
    visaNumber,
    visaStatus,
    visaType,
  ]);

  //data from button for  trigger (add or delete)
  React.useEffect(() => {
    async function handlebutton() {
      if (props.action === "add") {
        console.log("action add", props.action);
        console.log("validationStatus", validationStatus);
        if (validationStatus === false) {
          await setIsRequired(false);
          await handleAddDataToDatabase();
        } else {
          setIsRequired(true);
        }
      } else if (props.action === "edit") {
        if (validationStatus === false) {
          await setIsRequired(false);

          await handleEditDataToDatabase();
        } else {
          setIsRequired(true);
        }
        console.log("action edit", props.action);
      }
    }
    handlebutton();
  }, [props.trigger, props.action]);

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
                minHeight: 750, //blank paper while loading data
              }}
            >
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
                        {item.title == "Personal" ? null : (
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
                        )}
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
                                {detail.select.status == "offset" ? (
                                  <div />
                                ) : detail.select.status === "status" ? (
                                  <div style={{ paddingTop: 10 }}>
                                    <a>Status</a>
                                    {detail.select.defaultvalue == "Y" ? (
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
                                ) : detail.select.status === "AddRelation" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    noWrap
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddRelation(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "AddAddress" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddAddress(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status ===
                                  "AddCommunication" ? (
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
                                      handleAddCommunication(item.id)
                                    }
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "fix" ? (
                                  <TextField
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "#EFEFEF",
                                      borderColor: "white",
                                    }}
                                    // disabled={true}
                                    value={detail.select.data}
                                    defaultValue={detail.select.defaultvalue}
                                    onFocus={false}
                                  />
                                ) : detail.select.status === "fillnolabel" ? (
                                  <TextField
                                    type={detail.datatype}
                                    className={classes.root}
                                    // label={detail.label}
                                    variant="outlined"
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    noWrap
                                    InputLabelProps={{
                                      style: { color: "#AAAAAA" },
                                    }}
                                    fullWidth
                                    defaultValue={detail.select.defaultvalue}
                                    onBlur={detail.handle}
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
                                        helperText={
                                          detail.dataCheck == null ||
                                          detail.dataCheck === ""
                                            ? `${detail.label} is Required`
                                            : false
                                        }
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        InputProps={{
                                          style: headerTableStyle,
                                        }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        onBlur={detail.handle}
                                      />
                                    ) : (
                                      <TextField
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        InputProps={{
                                          style: headerTableStyle,
                                        }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        //onChange={detail.handle}
                                        onBlur={detail.handle}
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
                                    // value={detail.select.defaultvalue}
                                    onChange={detail.handle}
                                    textOverflow="ellipsis"

                                    // InputLabelProps={{style: {overflow: "hidden", textOverflow: "ellipsis", width: '3rem',whiteSpace:"nowrap"}}}
                                  >
                                    {detail.select.data}
                                  </TextField>
                                ) : detail.select.status === "check" ? (
                                  [
                                    detail.select.defaultvalue === "Y" ||
                                    detail.select.defaultvalue === true ? (
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
                                    ),
                                  ]
                                ) : (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.root}
                                      label={detail.label}
                                      inputVariant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      format="dd/MM/yyyy"
                                      value={detail.select.data}
                                      onChange={detail.handle}
                                      fullWidth
                                      defaultValue={detail.select.defaultvalue}
                                    />
                                  </MuiPickersUtilsProvider>
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
    handleRedirectToTableIndividual: (status) => {
      return dispatch(actions.editRedirectToTableIndividual(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndividual);
