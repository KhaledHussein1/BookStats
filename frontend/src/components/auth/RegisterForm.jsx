import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { register } from '../../api/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset the error message when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before attempting to register
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return; // Stop the form submission
    }

    try {
      const response = await register({
        username: formData.username,
        password: formData.password
      }); // Adjusted to match the expected API payload
      if (response) { 
        localStorage.setItem('username', formData.username); 
        navigate('/profile');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom textAlign='center'>Create an Account</Typography>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: '50%' }}>
              Register
            </Button>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
