import { CommonFilterProps } from 'src/contexts/TableUtilContext';
import { Admin } from 'src/models/admin';

export interface AdminUpdateForm {
	name: string;
}

export interface AdminUpdateDTO extends AdminUpdateForm {}

export interface AdminPasswordForm {
	password: string;
	confirmPassword: string;
}

export interface AdminPasswordDTO extends AdminPasswordForm {}

export interface AdminListFilter
	extends CommonFilterProps,
		Partial<Pick<Admin, 'name' | 'username'>> {}
