export interface TUser {
    userId: number | null | undefined,
    fullName: string,
    password?: string,
    email: string,
    contactPhone: string,
    address: string,
    role: string,
  }
  export interface User {
    token: string;
    user: {
      role: string;
      id: string,
      fullName: string;
    };
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }