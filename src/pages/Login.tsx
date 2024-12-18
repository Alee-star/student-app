import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types/userList";
import UserForm from "../components/UserForm";

const Login = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

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
      alert("Login successful");
      setError("");
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
