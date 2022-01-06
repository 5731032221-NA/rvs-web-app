import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import MaterialTable from "material-table";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const func1Default = () => {
  console.log("func1");
};

const func2Default = () => {
  console.log("func2");
};

const func3Default = () => {
  console.log("func2");
};

export default function MaterialTableComponent({
  placeHolder = "Search",
  rows = [],
  columns = columns,
  title = title,
  handleNewData = func1Default,
  handleEditData = func2Default,
  handleDialogDeleteOpen = func3Default
}) {

  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  
  let customStyle = {
    padding: theme.spacing(0, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%"
  };
  
  if (smUp) {
    customStyle = {
      ...customStyle,
      width: "54ch",
      // color: "red",
      }
    };
  // const [companyData, setCompanyData] = React.useState([]);
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

  return (
    <div>
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: placeHolder
          },
          body: {
            emptyDataSourceMessage: (
              <>
                {" "}
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
                <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => handleNewData()}
                  >
                    New Data
                  </Button>
                </Grid>
              </>
            ),
          },
       
        }}
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          color: themeState.color,
          backgroundColor: themeState.paper,
        }}
        title={
              <Grid>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ fontSize: 25, color: themeState.color }}
                >
                  {title}
                </Typography>
              </Grid>
            }
        columns={columns}
        data={rows}
        options={{
          searchFieldAlignment: "left",
          showTitle: true,
          search: true,
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [
            10,
            20,
            30,
            { value: rows.length, label: "All" },
          ],
          headerStyle: headerTableStyle,
          searchFieldStyle: customStyle,
        }}
        actions={[
          {
            icon: "edit",
            iconProps: { style: { color: themeState.color } },
            tooltip: "Edit",
            onClick: (event, rowData) => {
              handleEditData(rowData);
            },
          },
          {
            icon: "delete",
            iconProps: { style: { color: themeState.color } },
            tooltip: "Delete",
            onClick: (event, rowData) => {
              handleDialogDeleteOpen(
                rowData
               
              );
            },
          },
        ]}
      />
    </div>

  );
}