export enum UserRole {
  UserReviewer = 'UserReviewer',
  UserAdmin = 'UserAdmin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  active: boolean;
  created_at: string;
  updated_at: string;
}
