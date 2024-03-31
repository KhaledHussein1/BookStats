import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Paper, Typography, Box } from '@mui/material';
import { register } from '../../api/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData); // Assuming this is your registration function
      if (response) { // You may want to check for a specific condition to confirm registration success
        // Optionally, if you automatically log users in after registration:
        localStorage.setItem('username', formData.username); // Store username or token
        navigate('/profile'); // Redirect to profile page
        // Otherwise, redirect to the login page:
        // navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
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

