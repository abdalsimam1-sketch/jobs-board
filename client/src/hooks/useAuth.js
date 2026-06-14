import { useState } from "react";
import { login, register } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const AUTH_MODES = {
  LOGIN: "login",
  REGISTER: "register",
};
const ROLES = {
  SEEKER: "seeker",
  POSTER: "poster",
};
const AUTH_FORM = {
  username: "",
  email: "",
  password: "",
  role: "",
};

export const useAuth = () => {
  const [authMode, setAuthMode] = useState(AUTH_MODES.LOGIN);
  const [authForm, setAuthForm] = useState(AUTH_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ id: "", role: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (authMode === AUTH_MODES.LOGIN) {
        const response = await login(authForm);
        console.log(response);
        setUser({ id: response.user.id, role: response.user.role });
        localStorage.setItem("token", response.token);
        navigate("/home");
      } else {
        const response = await register(authForm);
        localStorage.setItem("token", response.token);
        setUser({ id: response.user.id, role: response.user.role });
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const toggleAuth = () => {
    setAuthMode((current) =>
      current === AUTH_MODES.LOGIN ? AUTH_MODES.REGISTER : AUTH_MODES.LOGIN,
    );
  };

  return {
    authMode,
    handleSubmit,
    toggleAuth,
    authForm,
    setAuthForm,
    error,
    setError,
    AUTH_FORM,
    loading,
  };
};
