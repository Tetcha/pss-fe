export enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC',
}

export interface PagingProps {
	page: number;
	pageSize: number;
	orderBy: string;
	order: SortOrder;
}

export const defaultPagingProps: PagingProps = {
	page: 0,
	pageSize: 10,
	orderBy: '',
	order: SortOrder.ASC,
};
