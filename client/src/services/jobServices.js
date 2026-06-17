import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/jobs` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//get all jobs with filters
export const getAllJobs = async (type, location, search) => {
  const response = await api.get("/", {
    params: {
      type: type || undefined,
      location: location || undefined,
      search: search || undefined,
    },
  });
  return response.data;
};
