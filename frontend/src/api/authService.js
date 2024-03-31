// Base URL for the API
const BASE_URL = "http://127.0.0.1:5000";

// API endpoint for user login
const LOGIN_URL = '/login';

// API endpoint for user registration
const REGISTER_URL = '/register';

// Function to make a POST request to register a new user
export const register = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}${REGISTER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to make a POST request to login a user
export const login = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}${LOGIN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
