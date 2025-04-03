import axios from "axios";

const API_BASE_URL = "http://localhost:5000/family"; // Backend base URL

export const getFamilyTree = async (token: string) => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addFamilyMember = async (data: any, token: string) => {
  const response = await axios.post(API_BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateFamilyMember = async (id: string, data: any, token: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteFamilyMember = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};