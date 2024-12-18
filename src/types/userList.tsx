export interface User {
  username: string;
  password: string;
}

export interface UserFormProps {
  onSubmit: (user: User) => void;
  heading: string;
  error?: string;
  buttonText: string;
  linkText?: string;
  linkUrl?: string;
  signText?: string;
}
