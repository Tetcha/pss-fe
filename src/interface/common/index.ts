export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export enum OrderSort {
	ASC = 'ASC',
	DESC = 'DESC',
}

export interface CommonFilterProps {
	currentPage?: number;
	pageSize?: number;
	order?: OrderSort;
	orderBy?: string;
}
