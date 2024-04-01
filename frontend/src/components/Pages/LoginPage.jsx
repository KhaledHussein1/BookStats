import React from 'react';
import { Container } from '@mui/material';
import LoginForm from '../auth/LoginForm'; // Import LoginForm component

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;

