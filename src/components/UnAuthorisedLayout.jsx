//create a layout for unauthorised users with an app bar having login button on it and title of the app

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UnAuthorisedLayout = ({ children }) => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} Color="inherit">
            walleTracker
          </Typography>
          <Button variant="contained" color="warning" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div />
        {children}
      </main>
    </div>
  );
};

export default UnAuthorisedLayout;
