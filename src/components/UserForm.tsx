import React, { useState } from "react";

type UserFormProps = {
  onSubmit: (user: { username: string; password: string }) => void;
  error?: string;
  heading: string;
  buttonText: string;
  linkText?: string;
  linkUrl?: string;
  signText?: string;
};

const UserForm = ({
  onSubmit,
  error,
  heading,
  buttonText,
  linkText,
  linkUrl,
  signText,
}: UserFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      onSubmit({ username, password });
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full min-h-[400px] flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-center text-gray-700 pb-10">
          {heading}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {buttonText}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {linkText && (
            <p className="text-center">
              {linkText}
              <a href={linkUrl} className="text-blue-500 hover:underline pl-2">
                {signText}
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
