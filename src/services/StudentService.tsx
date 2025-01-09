import api from "../api";

export const getStudents = async () => {
  try {
    const response = await api.get("/classes");
    const classes = response.data;
    return classes.flatMap((cls: any) => cls.students);
  } catch (error) {
    console.error("Error fetching students data:", error);
    throw error;
  }
};
