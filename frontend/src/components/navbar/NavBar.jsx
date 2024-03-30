import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';

const NavBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleHomeClick} startIcon={<HomeIcon />}>Home</Button>
          <Button color="inherit" startIcon={<InfoIcon />}>About</Button>
        </Box>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          LexiLytics
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <Button color="inherit" startIcon={<LoginIcon />}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

