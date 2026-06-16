import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Auth } from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeekerApps } from "./pages/SeekerApps";

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
          path="/myApps"
          element={
            <ProtectedRoutes>
              <SeekerApps></SeekerApps>
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
