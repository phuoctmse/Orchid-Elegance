// src/services/orchidService.js
import axios from 'axios';

const API_URL = 'https://667ad942bd627f0dcc90cb69.mockapi.io/Lab-Orchids';

export const fetchOrchids = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orchids:', error);
    throw error;
  }
};

export const fetchOrchidById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orchid with id ${id}:`, error);
    throw error;
  }
};