import { useEffect, useState } from "react";
import { fetchClassNames } from "../helpers";
import { Class } from "../types/userList";
import api from "../api";

const Banner = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [classData, setClassData] = useState<Class | null>(null);
  const [classNames, setClassNames] = useState<string[]>([]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const getClassNames = async () => {
      try {
        const names = await fetchClassNames();
        setClassNames(names);
      } catch (error) {
        console.error("Error in fetching class names:", error);
      }
    };
    getClassNames();
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get("/classes");
        const selectedClass = response.data.find(
          (cls: Class) => cls.name.toLowerCase() === activeTab?.toLowerCase()
        );
        setClassData(selectedClass || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (activeTab) {
      fetchClassData();
    }
  }, [activeTab]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-banner bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute top-10 flex space-x-4">
        {classNames.map((tab) => (
          <button
            key={tab}
            id={tab}
            className={`px-6 py-2 rounded-lg shadow-lg font-medium transition-transform duration-300 ${
              activeTab === tab
                ? "bg-blue-500 text-white scale-110"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {classData && (
        <div className="mt-24 z-10 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg overflow-auto max-h-[70vh]">
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
      )}
    </div>
  );
};

export default Banner;
