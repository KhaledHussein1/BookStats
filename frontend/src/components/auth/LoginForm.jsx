import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authService'; 

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Adding a new state for managing the error message
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset the error message when user starts typin g
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData); 
      if (response) { 
        localStorage.setItem('username', formData.username); 
        navigate('/profile'); // Redirect to profile page on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      // customize the error message based on the error details - do later
      setError('Login failed. Please check your username and password.'); 
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom textAlign='center'>Login to Account</Typography>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: '50%' }}>
              Login
            </Button>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
