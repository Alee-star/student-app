import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Login Page
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="border-2 border-gray-300 w-full p-3 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="border-2 border-gray-300 p-3 w-full rounded-md"
          />
          <button className="bg-button-color text-white px-6 py-3 w-full rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
