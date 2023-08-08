import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from '@mui/material';

function AuthorisedSideBar({ open, handleDrawerToggle, handleLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div>
        <IconButton onClick={handleDrawerToggle} sx={{ left: '80%' }}>
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        <ListItem component={Link} to="/dashboard" selected={isActive('/dashboard')}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/transactions" selected={isActive('/transactions')}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/categories" selected={isActive('/categories')}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/profile" selected={isActive('/profile')}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default AuthorisedSideBar;
