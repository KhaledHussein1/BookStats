// Base URL for the API
const BASE_URL = "http://127.0.0.1:5000";

// Function to make a POST request to register a new user
export const register = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
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
      
      const data = await response.json();
      localStorage.setItem('token', data.access_token); // Store the token
      localStorage.setItem('username', formData.username); // Store the username
  
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  
// Function to make a POST request to login a user
export const login = async (formData) => {
  try {
      const response = await fetch(`${BASE_URL}/login`, {
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

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', formData.username);

      return data;
  } catch (error) {
      console.error("Error logging in:", error);
      throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

