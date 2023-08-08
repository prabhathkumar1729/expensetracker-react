import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function UnAuthorisedLayout({ children }) {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            walleTracker
          </Typography>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div />
        {children}
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        closeButton={false}
      />
    </div>
  );
}

export default UnAuthorisedLayout;
