import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Auth } from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeekerDashboard } from "./pages/SeekerDashboard";

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
      </Routes>
    </div>
  );
};

export default App;
