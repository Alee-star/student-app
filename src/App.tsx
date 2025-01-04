import { Routes, Route } from "react-router-dom";

import { Banner, Login, SignIn, StudentsPage, TeachersPage } from "./pages";

import { AppRoutes } from "./routes/path";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.LOGIN} element={<Login />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
      <Route path={AppRoutes.BANNER} element={<Banner />} />
      <Route path={AppRoutes.STUDENTS} element={<StudentsPage />} />
      <Route path={AppRoutes.TEACHERS} element={<TeachersPage />} />
    </Routes>
  );
}

export default App;
