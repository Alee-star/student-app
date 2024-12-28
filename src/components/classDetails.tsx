import React from "react";
import { Class } from "../types/userList";

interface ClassDetailsProps {
  classData: Class | null;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({ classData }) => {
  if (!classData) {
    return null;
  }

  return (
    <div className="z-10 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg relative top-16 overflow-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">{classData.name}</h2>
      <p>{classData.teacherName}</p>
      <div>
        <h3 className="text-3xl font-semibold mb-4">Students:</h3>
        <ul className="space-y-4">
          {classData.students.map((student) => (
            <li key={student.id} className="p-4 border rounded-lg">
              <p>
                <strong>{student.name}</strong> (ID: {student.id})
              </p>
              <ul className="ml-4 mt-2">
                {student.marks.map((mark, index) => (
                  <li key={index}>
                    {mark.subject}: {mark.mark}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassDetails;
