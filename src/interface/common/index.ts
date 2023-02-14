import { SortOrder } from 'src/contexts/TableUtilContext';
export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export interface ResponseList<T> {
	data: T[];
	count: number;
}

export interface CommonFilterProps {
	page: number;
	pageSize: number;
	order: SortOrder;
	orderBy: string;
}
