import { useState } from "react";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-students bg-cover h-screen flex flex-col p-6">
      <div className="w-full p-6 rounded-lg flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none"
        />
        <button className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
    </div>
  );
};

export default StudentsPage;
