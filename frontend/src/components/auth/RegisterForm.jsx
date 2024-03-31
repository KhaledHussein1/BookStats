import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Typography, Box } from '@mui/material';
import { register } from '../../api/authService';

const RegisterForm = () => {
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
      const response = await register(formData);
      console.log(response); // Optionally handle successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      // Optionally display an error message to the user
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

