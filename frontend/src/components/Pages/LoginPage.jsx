import React from 'react';
import { Container, Box} from '@mui/material';
import LoginForm from '../auth/LoginForm'; // Import LoginForm component
import Particles from '../animation/ParticlesHome';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Particles />
      <Box sx={{  position: 'relative' }}>
      <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;

