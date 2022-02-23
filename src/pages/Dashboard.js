import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import EventBusyIcon from "@mui/icons-material/EventBusy";
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import KingBedIcon from "@mui/icons-material/KingBed";
import RemoveIcon from "@mui/icons-material/Remove";
import SalesLineGraph from "../components/Dashboard/SalesLineGraph";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import CloudIcon from "@mui/icons-material/Cloud";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function Dashboard() {
  const [week,setWeek]= React.useState([
    {day: 'Wednesdy', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Thursday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Friday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Tuesday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Saturday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Sunday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
    {day: 'Monday', icon: <CloudIcon style={{color: "#6581f5"}} />, degree: '16C/ 14C'},
  ])
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ color: "blue" }}
        >
          DASHBOARD
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={6} md={9}>
              <Grid>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    <Grid>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          <Grid
                            item
                            xs={4}
                            style={{
                              backgroundColor: "#4b69e5",
                              padding: "5px",
                              margint: "0px",
                              textAlign: "center",
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                            }}
                          >
                            <Grid>
                            <DangerousIcon style={{marginTop: "15px"}} />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid>
                                  {" "}
                               
                                  <DateRangeIcon style={{ fontSize: "50px" }} />
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    CHECK OUT
                                  </Typography>
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            style={{
                              backgroundColor: "#4f6ff4",
                              padding: "5px",
                              width: "100%",
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                          >
                            <Grid>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    textAlign: "center",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    28
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    80% Out
                                  </Typography>
                                </Grid>
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    28
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    Expected
                                  </Typography>
                                </Grid>
                              </Box>

                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                style={{ textAlign: "center" }}
                              >
                                Depart Date
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <Grid>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          <Grid
                            item
                            xs={4}
                            style={{
                              backgroundColor: "#4b69e5",
                              padding: "5px",
                              margint: "0px",
                              textAlign: "center",
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                            }}
                          >
                            <Grid>
                            <CheckCircleIcon style={{marginTop: "15px"}} />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid>
                                  {" "}
                                  <DateRangeIcon
                                    style={{ fontSize: "50px" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    CHECK IN
                                  </Typography>
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            style={{
                              backgroundColor: "#4f6ff4",
                              padding: "5px",
                              width: "100%",
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                          >
                            <Grid>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    textAlign: "center",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    20
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    Expected
                                  </Typography>
                                </Grid>
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    28
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    20% Arrival
                                  </Typography>
                                </Grid>
                              </Box>

                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                style={{ textAlign: "center" }}
                              >
                                Arrival Today
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <Grid>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          <Grid
                            item
                            xs={4}
                            style={{
                              backgroundColor: "#4b69e5",
                              padding: "5px",
                              margint: "0px",
                              textAlign: "center",
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                            }}
                          >
                            <Grid>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid>
                                  {" "}
                                  <KingBedIcon style={{ fontSize: "50px" }} />
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    Make a Booking
                                  </Typography>
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            style={{
                              backgroundColor: "#4f6ff4",
                              padding: "5px",
                              width: "100%",
                              borderTopRightRadius: "10px",
                              borderBottomRightRadius: "10px",
                            }}
                          >
                            <Grid>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  p: 1,
                                  m: 0,
                                  width: "100%",
                                  borderRadius: 1,
                                }}
                              >
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    textAlign: "center",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    12
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    OCC 90%
                                  </Typography>
                                </Grid>
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    m: 0.5,
                                    width: "100%",
                                    bgcolor: "rgb(101 129 245)",
                                    color: "white",
                                    border: "1px solid",
                                    borderColor: "rgb(101 129 245)",
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                    sx={{ mb: 0, textAlign: "center" }}
                                  >
                                    28
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ textAlign: "center" }}
                                  >
                                    Out
                                  </Typography>
                                </Grid>
                              </Box>

                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                style={{ textAlign: "center" }}
                              >
                                Today Pickup
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Paper sx={{ mt: 2, pb: 2 }}>
                  <Grid container>
                    <Grid
                      container
                      direction="row"
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Grid
                        container
                        style={{
                          marginBottom: 10,
                          marginTop: 15,
                          color: "#000",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h6"
                          style={{ color: "blue" }}
                        >
                          Sales Statistical Overview
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography variant="body1" component="body1">
                          Start Collecting data from February 2019
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button size="small" style={{ color: "#000" }}>
                          1D
                        </Button>
                        <Button size="small" style={{ color: "#000" }}>
                          5D
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            color: "#000",
                            backgroundColor: "white",
                          }}
                          size="small"
                        >
                          1M
                        </Button>
                        <Button size="small" style={{ color: "#000" }}>
                          1Y
                        </Button>
                        <Button size="small" style={{ color: "#000" }}>
                          Max
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      style={{ marginLeft: 15 }}
                      spacing={3}
                    >
                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "blue",
                          }}
                        >
                          Total cost
                        </Typography>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                        >
                          <Grid item sx={6} md={6} lg={6} xl={6}>
                            <Typography variant="h5">15,236</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              89.5% of 20,000 Total
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "blue",
                          }}
                        >
                          Total Revenue
                        </Typography>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                        >
                          <Grid item sx={6} md={6} lg={6} xl={6}>
                            <Typography variant="h5">$753,098</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              10.5% of 20,000 Total
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                          spacing={3}
                        >
                          <RemoveIcon style={{ color: "#72E6D8" }} />
                          <Typography variant="body1">Sales</Typography>
                          <RemoveIcon style={{ color: "#BDA4FE" }} />
                          <Typography variant="body1">Avenue</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      item
                      lg={12}
                      xs={12}
                      md={12}
                      xl={12}
                    >
                      <Paper
                        style={{
                          backgroundColor: "white",
                          width: "100%",
                          height: 250,
                          marginTop: 20,
                        }}
                        elevation={0}
                      >
                        <SalesLineGraph />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={2} md={3}>
              <Grid>
                <div
                  style={{
                    width: "100%",
                    color: "white",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      p: 2,
                      bgcolor: "rgb(31 86 239)",
                      borderRadius: "10px",
                    }}
                  >
                    <Grid sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Tokyo
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Mon, 12:30 PM. Mosty sunny
                      </Typography>
                      <Typography variant="h3" gutterBottom component="div">
                        30 C
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Cloudy
                      </Typography>
                    </Grid>
                    <Grid>
                      <div>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <CloudIcon
                              style={{ color: "white", marginTop: "5px" }}
                            />
                          }
                        >
                          <Avatar
                            alt="Travis Howard"
                            style={{
                              backgroundColor: "yellow",
                              color: "yellow",
                            }}
                          />
                        </Badge>
                      </div>
                    </Grid>
                  </Box>

                  
                  {
                    week.map((item,index)=> (
                      <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1,
                        m: 1,
                        color: "#000",
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                      }}
                      key={index}
                    >
                      <Grid>
                      <Typography variant="subtitle2" gutterBottom component="div">
                   {item.day}
                    </Typography>
                      </Grid>
                      <Grid>
                    {item.icon}
                      </Grid>
                      <Grid>   <Typography variant="subtitle2" gutterBottom component="div">
                      {item.degree}
                    </Typography></Grid>
                    </Box>
                    ))
                  }
              
                 
                  
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
