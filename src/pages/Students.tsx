import { useEffect, useState } from "react";
import api from "../api";
import { Student } from "../types/userList";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/classes");
        const classes = response.data;
        const allStudents = classes.flatMap((cls: any) => cls.students);
        setStudents(allStudents);
        setFilteredStudents([]);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setHasSearched(true);
  };

  return (
    <div className="bg-students bg-cover h-screen flex flex-col p-6 items-center">
      <div className="w-full p-6 rounded-lg flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none"
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="bg-white z-10 shadow-md rounded-lg p-6 w-80 text-center">
        <h1 className="text-xl font-bold">Students</h1>
        {hasSearched && filteredStudents.length === 0 ? (
          <p>No Students Found</p>
        ) : (
          <ul>
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="mb-2 text-lg flex justify-between border-b pb-2"
              >
                <span className="capitalize">{student.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
