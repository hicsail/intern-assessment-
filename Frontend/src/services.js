import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCompletedTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/completed`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPendingTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/pending`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const create = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTaskTitle = async (id,task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
}

  export const updateTaskStatus = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/completed/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};
