import React from "react";
import AddTransaction from "../components/AddTransaction";
import Chart from "../components/Chart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PieGraph from "../components/PieGraph";
import AreaBarGraph from "../components/AreaBarGraph";

const Dashboard = () => {
  const defaultTheme = createTheme();
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 400,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    height: 400,
                    padding: "30px",
                  }}
                >
                  <AddTransaction />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    height: "300px",
                  }}
                >
                  <PieGraph />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    height: "300px",
                  }}
                >
                  <AreaBarGraph />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
