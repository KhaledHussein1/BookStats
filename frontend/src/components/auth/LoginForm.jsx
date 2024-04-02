import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authService'; // Import login API function

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData); // Assuming this is your login function
      if (response) { // You may want to check for a specific condition to confirm login success
        localStorage.setItem('username', formData.username); // Optionally store the username or a token
        navigate('/profile'); // Redirect to profile page on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom textAlign='center'>Login to Account</Typography>
        <form onSubmit={handleSubmit}>
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
