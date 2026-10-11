export interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string | null;
  createdAt?: string | number | null;
  roles: string[];
}
