import { Routes, Route } from "react-router-dom";

import { AppRoutes } from "./routes/path";

import Banner from "./pages/Banner";
import Login from "./pages/Login";
import SignIn from "./pages/Sign";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.LOGIN} element={<Login />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
      <Route path={AppRoutes.BANNER} element={<Banner />} />
    </Routes>
  );
}

export default App;
