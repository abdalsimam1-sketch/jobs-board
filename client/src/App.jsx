import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Auth } from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

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
      </Routes>
    </div>
  );
};

export default App;
