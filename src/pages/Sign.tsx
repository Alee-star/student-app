import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";
import { User } from "../types/userList";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (user: User) => {
    const { username, password } = user;

    if (!username || !password) {
      setError("Please enter valid username and password");
      return;
    }

    try {
      // for existing users
      const response = await axios.get("http://localhost:5000/users");
      const PrevUser = response.data.find(
        (user: User) => user.username === username
      );

      if (PrevUser) {
        setError("Account already exists");
        return;
      }

      // for new users
      const newUser: User = {
        username,
        password,
      };

      await axios.post("http://localhost:5000/users", newUser);

      setError("");
      alert("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      console.error("Error creating account:", err.message);
      setError("Please try again");
    }
  };

  return (
    <UserForm
      onSubmit={handleSignIn}
      error={error}
      heading="Sign-In Page"
      buttonText="Create Account"
    />
  );
};

export default SignIn;
