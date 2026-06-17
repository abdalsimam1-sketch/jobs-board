import { logout } from "../utils/logout";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = ({ role }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom">
      <div>
        <h1>JobBoard</h1>
      </div>
      {role === "seeker" && (
        <div className="d-flex gap-3 align-items-center">
          <Link to="/home">Home</Link>
          <Link to="/seeker-dashboard">My Applications</Link>
          <span
            className="cursor-pointer btn btn-danger"
            onClick={() => logout(navigate)}
          >
            Logout
          </span>
        </div>
      )}
      {role === "poster" && (
        <div className="d-flex gap-3">
          <span className="cursor-pointer">Dashboard</span>
          <span className="cursor-pointer">My Jobs</span>
          <span className="cursor-pointer">Application</span>
          <span className="cursor-pointer" onClick={() => logout(navigate)}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};
