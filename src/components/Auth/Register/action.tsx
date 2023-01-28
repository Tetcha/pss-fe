import { http } from 'src/config/axios';
import { User } from 'src/models/user';

export interface AuthRegisterDto extends Pick<User, 'email' | 'password' | 'name'> {
	confirmPassword: string;
}

export const authRegister = async (input: AuthRegisterDto) => {
	const res = await http.post('/auth/register', input);

	return res.data;
};
