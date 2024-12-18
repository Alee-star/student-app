import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/Sign";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
