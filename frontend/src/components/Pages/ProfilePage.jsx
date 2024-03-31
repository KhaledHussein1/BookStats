// src/components/pages/ProfilePage.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const ProfilePage = () => {
  const username = localStorage.getItem('username');  // Assuming you store username in localStorage upon login

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography>Welcome, {username}!</Typography>
    </Container>
  );
};

export default ProfilePage;
