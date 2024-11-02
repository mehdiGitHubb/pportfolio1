import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Django backend URL

// Example of fetching data from the API
export const fetchExampleData = async () => {
  try {
    const response = await axios.get(`${API_URL}/example/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
