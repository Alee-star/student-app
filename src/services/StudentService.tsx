import api from "../api";
import { Student, Class } from "../types/userList";

export const getStudents = async (): Promise<Student[]> => {
  try {
    const response = await api.get("/classes");
    const classes: Class[] = response.data;

    return classes.flatMap((cls) => cls.students);
  } catch (error) {
    console.error("Error fetching students data:", error);
    throw error;
  }
};
