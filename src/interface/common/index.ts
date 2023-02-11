export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export interface ResponseList<T> {
	data: T[];
	count: number;
}
