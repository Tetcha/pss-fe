export enum UserStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export const AllRole: UserRole[] = [UserRole.ADMIN, UserRole.USER];

export interface User {
	id: string;
	name: string;
	username: string;
	password: string;
	email: string;
	googleId: string;
	createDate: string;
	updateDate: string;
	status: UserStatus;
	role: UserRole;
}
