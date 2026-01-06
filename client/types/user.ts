// User object structure
export interface User {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  selectedColor: string;
  bio?:  string;
  avatar?: string;
  createdAt: string;
}

// Signup form data
export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  selectedColor: string;
}

// Login form data
export interface LoginData {
  email: string;
  password: string;
}

// Color palette option
export interface ColorOption {
  name: string;
  value: string;
  gradient: string;
}
