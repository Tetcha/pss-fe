export interface LoginPayload {
	username: string;
	password: string;
}

export interface StudentUpdateForm {
	name: string;
	studentCode: string;
	email: string;
	gender: string;
	birthday: string;
	phone: string;
}

export interface StudentUpdatetDTO extends StudentUpdateForm {}
