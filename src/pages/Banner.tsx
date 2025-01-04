import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClassDetails from "../components/classDetails";
import { Class } from "../types/userList";
import { fetchClassNames } from "../helpers";
import { getClasses } from "../api";

const Banner = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [classData, setClassData] = useState<Class | null>(null);
  const [classNames, setClassNames] = useState<string[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
        if (activeTab) {
          const response = await getClasses();
          const selectedClass = response.find(
            (cls: Class) => cls.name.toLowerCase() === activeTab.toLowerCase()
          );
          setClassData(selectedClass || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClassData();
  }, [activeTab]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-banner bg-cover overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 flex justify-center space-x-8">
        <Link
          to="/teachers"
          className="text-lg font-semibold hover:text-blue-400"
        >
          Teachers
        </Link>
        <Link
          to="/students"
          className="text-lg font-semibold hover:text-blue-400"
        >
          Students
        </Link>
      </div>
      <div className="absolute top-20 flex space-x-4">
        {classNames.map((tab) => (
          <button
            key={tab}
            id={tab}
            className={`px-6 py-2 rounded-lg shadow-lg font-medium transition-transform duration-300 ${
              activeTab === tab
                ? "bg-blue-500 text-white scale-10"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <ClassDetails classData={classData} />
    </div>
  );
};

export default Banner;
