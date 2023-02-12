export interface LoginPayload {
	username: string;
	password: string;
}

export interface RegisterPayload {
	email: string;
	password: string;
	confirmPassword: string;
}
