import { Gender } from 'src/interface/common';

export interface Doctor {
	id: string;
	birthday: string;
	phone: string;
	username: string;
	avatar: string;
	briefInfo: string;
	gender: Gender;
	balance: number;
	name: string;
	isActive: boolean;
	createAt: string;
	updateAt: string;
}
