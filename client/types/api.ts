// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Auth response (includes token + user)
export interface AuthResponse {
  token: string;
  user:  {
    id: string;
    username: string;
    email:  string;
    selectedColor: string;
  };
}

// Form validation error
export interface ValidationError {
  field: string;
  message:  string;
}
