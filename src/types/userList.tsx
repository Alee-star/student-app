export interface User {
  username: string;
  password: string;
}

export interface Mark {
  subject: string;
  mark: number;
}

export interface Student {
  name: string;
  id: string;
  marks: Mark[];
}

export interface ClassData {
  name: string;
  teacherName: string;
  students: Student[];
}
