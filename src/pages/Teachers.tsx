import { useEffect, useState } from "react";
import { getClasses } from "../api";
import { Class, Teacher } from "../types/userList";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const classesData = await getClasses();
        const teacherData: Teacher[] = classesData.map((classItem: Class) => ({
          name: classItem.name,
          teacherName: classItem.teacherName,
        }));
        setTeachers(teacherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="bg-teacher bg-cover h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="bg-white z-10 shadow-md rounded-lg p-6 w-80">
        <h1 className="text-xl font-bold mb-4">Teachers</h1>
        <ul>
          {teachers.map((teacher, index) => (
            <li
              key={index}
              className="mb-2 text-lg flex justify-between border-b pb-2"
            >
              <span className="capitalize">{teacher.name}:</span>
              <strong>{teacher.teacherName}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeachersPage;
