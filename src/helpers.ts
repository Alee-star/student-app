import { Class } from "./types/userList";
import { getClasses } from "./api";

export const fetchClassNames = async (): Promise<string[]> => {
  try {
    const response = await getClasses();

    const classNames = response.map((cls: Class) => cls.name);
    return classNames;
  } catch (error) {
    console.error("Error fetching class names:", error);
    throw new Error("Failed to fetch class names");
  }
};
