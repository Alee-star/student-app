import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/Sign";
import { AppRoutes } from "./routes/path";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.LOGIN} element={<Login />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
    </Routes>
  );
}

export default App;
