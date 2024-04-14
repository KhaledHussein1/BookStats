import React from 'react';
import { Container, Box } from '@mui/material';
import RegisterForm from '../auth/RegisterForm';
import Particles from '../animation/ParticlesHome';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Particles />
      <Box sx={{  position: 'relative' }}>
      <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
