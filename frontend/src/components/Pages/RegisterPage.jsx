import React from 'react';
import { Container } from '@mui/material';
import RegisterForm from '../auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
