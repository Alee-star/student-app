import { useEffect, useState } from "react";
import { Student } from "../types/userList";
import api from "../api";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/classes");
        const classes = response.data;
        const allStudents = classes.flatMap((cls: any) => cls.students);
        setStudents(allStudents);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="bg-students bg-cover h-screen flex flex-col p-6 items-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white z-10 shadow-md rounded-lg p-6 w-80 text-center">
        <h1 className="text-xl font-bold">Students</h1>
        <ul>
          {students.map((student) => (
            <li
              key={student.id}
              className="mb-2 text-lg flex justify-between border-b pb-2"
            >
              <span className="capitalize">{student.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsPage;
