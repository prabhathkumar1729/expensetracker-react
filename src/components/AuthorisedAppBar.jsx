import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AuthorisedAppBar({ handleDrawerToggle }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">WalleTracker</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AuthorisedAppBar;
