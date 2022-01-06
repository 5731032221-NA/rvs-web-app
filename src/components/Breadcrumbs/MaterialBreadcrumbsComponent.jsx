import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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
        borderColor: themeState.color,
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

function MaterialBreadcrumbsComponent(props) {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const classes = useStyles(themeState);
  const [mainColor, setMainColor] = React.useState("#2D62ED");
  //   const maincolor = useSelector((state) => state.reducer.color);
//   React.useEffect(() => {
//     console.log(props);
//   }, []);
  return (
    <>
      <Breadcrumbs
        separator={
          <Typography
            variant="h6"
            style={{
              marginBottom: 15,
              fontSize: 20,
              color: themeState.color,
            }}
          >
            /
          </Typography>
        }
      >
        {props.Datacrumbs.map((element, index) => (
          <Link color="inherit" href="#" onClick={element.handle}>
            <Typography
              variant="h6"
              style={
                index == 0
                  ? { marginBottom: 15, fontSize: 20, color: mainColor }
                  : { marginBottom: 15, fontSize: 14, color: themeState.color }
              }
            >
              {element.text}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
}

export default MaterialBreadcrumbsComponent;
