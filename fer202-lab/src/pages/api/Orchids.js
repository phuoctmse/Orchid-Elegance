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

export const createOrchid = async (orchid) => {
  try {
    const response = await axios.post(API_URL, orchid);
    return response.data;
  } catch (error) {
    console.error('Error creating orchid:', error);
    throw error;
  }
};

export const updateOrchid = async (id, updatedOrchid) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedOrchid);
    return response.data;
  } catch (error) {
    console.error(`Error updating orchid with id ${id}:`, error);
    throw error;
  }
};

export const deleteOrchid = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting orchid with id ${id}:`, error);
    throw error;
  }
};
