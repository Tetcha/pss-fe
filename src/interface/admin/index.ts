import { CommonFilterProps } from '../common';

export interface AdminUpdateForm {
	name: string;
}

export interface AdminUpdateDTO extends AdminUpdateForm {}

export interface AdminPasswordForm {
	password: string;
	confirmPassword: string;
}

export interface AdminPasswordDTO extends AdminPasswordForm {}

export interface AdminListFilter extends CommonFilterProps {
	name?: string;
	username?: string;
}
