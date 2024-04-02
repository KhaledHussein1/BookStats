import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username'); 
    navigate('/'); 
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleSignupClick = () => {
    navigate('/register'); 
  };

  const handleAboutClick = () => {
    navigate('/about'); 
  };

  const handleTextClick = () => {
    navigate('/profile'); 
  };

  return (
    <AppBar position="static">
      <Toolbar>
      {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleHomeClick} startIcon={<HomeIcon />}>Home</Button>
          <Button color="inherit" onClick={handleTextClick} startIcon={<LibraryBooksIcon />}>Texts</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleHomeClick} startIcon={<HomeIcon />}>Home</Button>
            <Button color="inherit" onClick={handleAboutClick} startIcon={<InfoIcon />}>About</Button>
        </Box>
        )}

        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          LexiLytics
        </Typography>

        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button color="inherit" onClick={handleAboutClick} startIcon={<InfoIcon />}>About</Button>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Log Out</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button color="inherit" onClick={handleLoginClick} startIcon={<LoginIcon />}>Login</Button>
            <Button color="inherit" onClick={handleSignupClick} startIcon={<AccountCircleIcon />}>Sign Up</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

