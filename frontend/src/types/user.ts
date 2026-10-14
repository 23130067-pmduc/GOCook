export interface UserProfile {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  avatarUrl?: string | null;
  createdAt?: string | number | null;
  roles: string[];
}
