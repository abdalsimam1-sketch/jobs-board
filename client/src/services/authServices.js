import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/auth` });

export const login = async (payload) => {
  const response = await api.post("/login", payload);
  return response.data;
};
export const register = async (payload) => {
  const response = await api.post("/register", payload);
  return response.data;
};
