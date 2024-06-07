export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  photo?: string;
  roleId: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  isActive?: boolean;
  roleId?: number;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  photo?: string;
  isActive: boolean;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivateUserDTO {
  token: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}
