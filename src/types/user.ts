export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  photo?: string;
  status: boolean;
  roleId: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  status?: boolean;
  roleId?: number;
}

export interface UserDto {
  id: number | undefined;
  name: string;
  email: string;
  photo?: string;
  status: boolean;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}
