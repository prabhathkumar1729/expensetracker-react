import React from "react";
import TransactionsList from "../components/TransactionsList";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Transactions = () => {
  const defaultTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Box>
          <CssBaseline />
          <Container maxWidth="xl" sx={{ margin: "10px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    padding: "0 100px 0 100px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",

                  }}
                >
                  <TransactionsList />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Transactions;
