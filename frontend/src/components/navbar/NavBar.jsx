import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon  from '@mui/icons-material/Menu'; 
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('username');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Toolbar>
        {isMobile ? (
          <>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', ml: 10 }}>
              LexiLytics
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleHomeClick()} >
              <ListItemIcon>
                <HomeIcon /> 
              </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>
              <MenuItem onClick={() => handleAboutClick()}>
              <ListItemIcon>
                <InfoIcon /> 
              </ListItemIcon>
                <ListItemText primary="About" />
              </MenuItem>
              {isLoggedIn && <MenuItem onClick={() => handleTextClick()}>
              <ListItemIcon>
                <LibraryBooksIcon /> 
              </ListItemIcon>
                <ListItemText primary="Texts" />
                </MenuItem>}
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                <LogoutIcon /> 
              </ListItemIcon>
                <ListItemText primary="Log Out" />
                </MenuItem>
              ) : null}
              {!isLoggedIn && <MenuItem onClick={() => handleLoginClick()} >
              <ListItemIcon>
                <LoginIcon /> 
              </ListItemIcon>
                <ListItemText primary="Login" />
              </MenuItem>}
              {!isLoggedIn && <MenuItem onClick={() => handleSignupClick()}>
              <ListItemIcon>
                <AccountCircleIcon /> 
              </ListItemIcon>
                <ListItemText primary="Register" />
                </MenuItem>}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" onClick={() => navigate('/')} startIcon={<HomeIcon />}>Home</Button>
              {isLoggedIn ? <Button color="inherit" onClick={() => navigate('/profile')} startIcon={<LibraryBooksIcon />}>Texts</Button> : null}
              <Button color="inherit" onClick={() => navigate('/about')} startIcon={<InfoIcon />}>About</Button>
            </Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              LexiLytics
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Log Out</Button>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/login')} startIcon={<LoginIcon />}>Login</Button>
                  <Button color="inherit" onClick={() => navigate('/register')} startIcon={<AccountCircleIcon />}>Register</Button>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

