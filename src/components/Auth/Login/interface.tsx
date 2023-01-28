import { User } from 'src/models/user';

export interface AuthLoginDto extends Pick<User, 'email' | 'password'> {}
