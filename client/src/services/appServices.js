import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/apps` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createApp = async (payload) => {
  const response = await api.post("/apply", payload);
  return response.data;
};

export const getApps = async () => {
  const response = await api.get("");
  return response.data;
};

export const getPosterApps = async () => {
  const response = await api.get("/review");
  return response.data;
};
export const updateApplication = async (id, payload) => {
  await api.patch(`/${id}`, payload);
};
