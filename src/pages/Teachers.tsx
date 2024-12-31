import { useEffect, useState } from "react";
import api from "../api";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    api
      .get("/classes")
      .then((response) => {
        const teacherData: { [key: string]: string } = {};
        response.data.forEach(
          (classItem: { name: string; teacherName: string }) => {
            teacherData[classItem.name] = classItem.teacherName;
          }
        );
        setTeachers(teacherData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-teacher bg-cover h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white z-10 shadow-md rounded-lg p-6 w-80">
        <h1 className="text-xl font-bold mb-4">Teachers</h1>
        <ul>
          {Object.entries(teachers).map(([className, teacherName]) => (
            <li
              key={className}
              className="mb-2 text-lg flex justify-between border-b pb-2"
            >
              <span className="capitalize">{className}:</span>
              <strong>{teacherName}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeachersPage;
