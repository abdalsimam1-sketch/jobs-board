import { logout } from "../utils/logout";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = ({ role }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom">
      <div>
        {role === "seeker" ? (
          <Link to="/home">
            {" "}
            <h1>JobBoard</h1>
          </Link>
        ) : (
          <Link to="/poster-dashboard">
            {" "}
            <h1>JobBoard</h1>
          </Link>
        )}
      </div>
      {role === "seeker" && (
        <div className="d-flex gap-3 align-items-center">
          <Link to="/seeker-dashboard">Dashboard</Link>
          <button
            className="cursor-pointer btn btn-danger"
            onClick={() => logout(navigate)}
          >
            Logout
          </button>
        </div>
      )}
      {role === "poster" && (
        <div className="d-flex gap-3 align-items-center">
          <button
            className="cursor-pointer btn btn-danger"
            onClick={() => logout(navigate)}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
