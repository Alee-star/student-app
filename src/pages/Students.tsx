import { useEffect, useState } from "react";
import { getClasses } from "../api";
import { Student } from "../types/userList";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const classesData = await getClasses();
        setClasses(classesData.map((cls: any) => cls.name));
        const allStudents = classesData.flatMap((cls: any) =>
          cls.students.map((student: any) => ({
            ...student,
            className: cls.name,
          }))
        );
        setStudents(allStudents);
        setFilteredStudents([]);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(term.toLowerCase()) &&
        (!selectedClass || student.className === selectedClass)
    );
    setFilteredStudents(filtered);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedClass(selected);
    const filtered = students.filter(
      (student) =>
        (!selected || student.className === selected) &&
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="bg-students bg-cover h-screen flex flex-col p-6 items-center">
      <div className="w-full p-6 rounded-lg flex items-center space-x-3">
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="p-3 flex justify-between border border-gray-300 rounded-lg outline-none"
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg outline-none"
        />
      </div>
      <div className="bg-white z-10 shadow-md rounded-lg p-6 w-80 text-center">
        <h1 className="text-xl font-bold">Students</h1>
        {filteredStudents.length === 0 ? (
          <p className="pt-2">No Students Found</p>
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
