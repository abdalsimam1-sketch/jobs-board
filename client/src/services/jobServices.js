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

export const createJob = async (payload) => {
  const response = await api.post("/", payload);
  return response.data;
};

export const getPosterJobs = async () => {
  const response = await api.get("poster-jobs");
  return response.data;
};

export const updateJob = async (id, payload) => {
  const response = await api.patch(`/${id}`, payload);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`${id}`);
  return response.data;
};

export const getJobApplicants = async (id) => {
  const response = await api.get(`/${id}/applicants`);
  return response.data;
};
