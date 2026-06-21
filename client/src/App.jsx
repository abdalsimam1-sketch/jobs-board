import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Auth } from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeekerDashboard } from "./pages/SeekerDashboard";
import { PosterDashboard } from "./pages/PosterDashboard";
import { JobApplicants } from "./pages/JobApplicants";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth></Auth>}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home></Home>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/seeker-dashboard"
          element={
            <ProtectedRoutes>
              <SeekerDashboard></SeekerDashboard>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/poster-dashboard"
          element={
            <ProtectedRoutes>
              <PosterDashboard></PosterDashboard>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/:id/applicants"
          element={
            <ProtectedRoutes>
              <JobApplicants></JobApplicants>
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
