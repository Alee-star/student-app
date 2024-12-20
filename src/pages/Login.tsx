import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";
import { User } from "../types/userList";
import { AppRoutes } from "../routes/path";

const Login = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err: any) {
        console.error("Error in fetching", err.message);
        setError("Failed to fetch user data");
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (user: User) => {
    const { username, password } = user;
    const prevUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (prevUser) {
      setError("");
      navigate(AppRoutes.BANNER);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <UserForm
      onSubmit={handleLogin}
      error={error}
      heading="Login Page"
      buttonText="Login"
      linkText="Don't have an account?"
      linkUrl="/sign-in"
      signText="Sign-in"
    />
  );
};

export default Login;
