import { Gender } from './../interface/common/index';
export enum UserStatus {
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export const AllRole: UserRole[] = [UserRole.ADMIN, UserRole.USER];

export interface User {
	id: string;
	birthday: string;
	studentCode: string;
	phone: string;
	gender: Gender;
	balance: number;
	status: UserStatus;
	name: string;
	email: string;
}
