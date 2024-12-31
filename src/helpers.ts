import { Class } from "./types/userList";
import api from "./api";

export const fetchClassNames = async (): Promise<string[]> => {
  try {
    const response = await api.get("/classes");

    const classNames = response.data.map((cls: Class) => cls.name);
    return classNames;
  } catch (error) {
    console.error("Error fetching class names:", error);
    throw new Error("Failed to fetch class names");
  }
};
