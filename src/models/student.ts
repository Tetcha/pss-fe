import { Gender } from 'src/interface/common';

export interface Student {
	id: string;
	birthday: string;
	studentCode: string;
	phone: string;
	gender: Gender;
	balance: number;
	name: string;
	email: string;
	isActive: boolean;
	updateAt: string;
	createAt: string;
	avatar: string;
}
