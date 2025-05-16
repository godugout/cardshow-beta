
export interface AuthUser {
  id: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  image?: string;
  role?: string;
  permissions?: string[];
}
