export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    BLOCKED = 'BLOCKED'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHERS = 'OTHERS'
}

export interface IUserInfo {
    id: string,
    name: string,
    email: string,
    role: UserRole,
    profileImage?: string
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;

  bio?: string | null;
  profileImage?: string | null;
  currentLocation?: string | null;
  gender: Gender;

  interests: string[];
  visitedCountries: string[];

  verifiedBadge: boolean;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}
