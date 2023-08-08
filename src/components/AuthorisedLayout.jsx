import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Drawer } from '@mui/material';
import AuthorisedSideBar from './AuthorisedSideBar';
import AuthorisedAppBar from './AuthorisedAppBar';

function AuthorisedLayout({ children }) {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <AuthorisedAppBar handleDrawerToggle={handleDrawerToggle} />
      <Drawer anchor="left" open={open}>
        <AuthorisedSideBar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          handleLogout={handleLogout}
        />
      </Drawer>
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

export default AuthorisedLayout;
