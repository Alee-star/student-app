import api from "../api";
import { Class } from "../types/userList";

export const fetchClassNames = async (): Promise<string[]> => {
  try {
    const response = await api.get("/data.json");
    const classNames = response.data.classes.map((cls: Class) => cls.name);
    return classNames;
  } catch (error) {
    console.error("Error fetching class names:", error);
    throw new Error("Failed to fetch class names");
  }
};
