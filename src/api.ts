import api from "./axios";
import { User } from "./types/userList";

export const getClasses = async () => {
  try {
    const response = await api.get("/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (newUser: User): Promise<void> => {
  try {
    await api.post("/users", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
